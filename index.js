"use strict";
const express = require("express");
const cors = require("cors");
const { auth } = require("express-oauth2-jwt-bearer");

require("dotenv").config();

const PORT = process.env.PORT;
const SOCKET_PORT = process.env.SOCKET_PORT;
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

// inittializing Routers
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

app.listen(PORT, () => console.log(`Express app listening on port ${PORT}!`));

//Socket IO with express and node
const server = require("node:http").createServer(app);
const io = require("socket.io")(server);

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

server.listen(SOCKET_PORT, () =>
  console.log(`Socket server listening on port 3001!`)
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
    console.log("Closed listing!");
  } catch (error) {
    console.log(error.message);
  }
};
setInterval(checkListingEnd, 30000);
