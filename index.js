"use strict";
const express = require("express");
const cors = require("cors");
const { auth } = require("express-oauth2-jwt-bearer");

require("dotenv").config();

const PORT = process.env.PORT;
const app = express();
// const server = require("http").createServer(app);
// const io = require("socket.io")(server);

// importing Routers
const UsersRouter = require("./routers/usersRouter");
const WatchesRouter = require("./routers/watchesRouter");
const ListingsRouter = require("./routers/listingsRouter");

// importing Controllers
const UsersController = require("./controllers/usersController");
const WatchesController = require("./controllers/watchesController");
const ListingsController = require("./controllers/listingsController");

// importing DB
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
const listingsController = new ListingsController(listings, bids);

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

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});

// server.listen(PORT, () => {
//   console.log(`Express app listening on port ${PORT}!`);
// });
