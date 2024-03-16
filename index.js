"use strict";
const express = require("express");
const cors = require("cors");
const { auth } = require("express-oauth2-jwt-bearer");

require("dotenv").config();

const PORT = process.env.PORT || 3000;
const app = express();

// importing Routers
const UsersRouter = require("./routers/usersRouter");
const WatchesRouter = require("./routers/watchesRouter");
const ListingsRouter = require("./routers/listingsRouter");

// importing Controllers
const UsersController = require("./controllers/usersController");
const WatchesController = require("./controllers/watchesController");
const ListingsController = require("./controllers/listingsController");

// importing DB
const { Sequelize } = require("sequelize");
const db = require("./db/models/index");
const { listings, users, watches, historic_prices, bids } = db;

//Auth0 JWT middleware
const checkJwt = auth({
  audience: process.env.JWT_AUDIENCE,
  issuerBaseURL: process.env.JWT_ISSUER_BASE_URL,
});

// initializing Controllers -> note the lowercase for the first word
const usersController = new UsersController(users, watches);
const watchesController = new WatchesController(watches, historic_prices);
const listingsController = new ListingsController(listings, bids, watches);

// initializing Routers
const usersRouter = new UsersRouter(usersController, checkJwt).routes();
const watchesRouter = new WatchesRouter(watchesController, checkJwt).routes();
const listingsRouter = new ListingsRouter(
  listingsController,
  checkJwt
).routes();

app.use(cors());
app.use(express.json());
app.use("/users", usersRouter);
app.use("/watches", watchesRouter);
app.use("/listings", listingsRouter);

//Socket IO with express and node
const server = require("node:http").createServer(app);
const io = require("socket.io")(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  console.log("user connected");
  socket.on("disconnect", () => console.log("user disconnected"));
  socket.on("joinRoom", (listingId) => {
    socket.join(listingId);
    console.log(`user join room ${listingId}`);
  });
  socket.on("submitBid", (data) =>
    io.to(data.listingId).emit("newBid", data.currentBid)
  );
});

server.listen(PORT, () =>
  console.log(`Express app listening on port ${PORT}!`)
);

//Automatically close listing when time ends
const checkListingEnd = async () => {
  try {
    const currentTime = new Date();
    const data = await listings.findAll({
      where: { ending_at: { [Sequelize.Op.lte]: currentTime }, status: true },
    });
    await Promise.all(
      data.map((endedListing) => endedListing.update({ status: false }))
    );
  } catch (error) {
    console.log(error.message);
  }
};
setInterval(checkListingEnd, 600000);

//Set Up Stripe Checkout
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const CLIENT_URL = process.env.CLIENT_URL;

app.post("/buyout", async (req, res) => {
  const { listingId, watchName } = req.body;
  const data = await listings.findByPk(listingId);
  const price = Number(data.buyout_price) * 100;
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "sgd",
          unit_amount: price,
          product_data: { name: watchName },
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${CLIENT_URL}/payment/${listingId}`,
    cancel_url: `${CLIENT_URL}/listings/${listingId}`,
  });
  return res.json({ url: session.url });
});

app.post("/closeBid", async (req, res) => {
  const { listingId, watchName } = req.body;
  const data = await bids.findOne({
    where: { listing_id: listingId },
    order: [["current_bid", "DESC"]],
  });
  const price = Number(data.current_bid) * 100;
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "sgd",
          unit_amount: price,
          product_data: { name: watchName },
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${CLIENT_URL}/payment/${listingId}`,
    cancel_url: `${CLIENT_URL}/listings/${listingId}`,
  });
  return res.json({ url: session.url });
});
