const express = require("express");
const cors = require("cors");
const { auth } = require("express-oauth2-jwt-bearer");

require("dotenv").config();

const PORT = process.env.PORT;
const app = express();
// const server = require("http").createServer(app);
// const io = require("socket.io")(server);

// importing Routers
const ListingsRouter = require("./routers/listingsRouter");

// importing Controllers
const ListingsController = require("./controllers/listingsController");

// importing DB
const db = require("./db/models/index");
const { listing, user, watches } = db;

//Auth0 JWT middleware
const checkJwt = auth({
  audience: process.env.JWT_AUDIENCE,
  issuerBaseURL: process.env.JWT_ISSUER_BASE_URL,
});

// initializing Controllers -> note the lowercase for the first word
const listingsController = new ListingsController(listing, user, watches);

// inittializing Routers
const listingsRouter = new ListingsRouter(
  listingsController,
  checkJwt
).routes();

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use(cors());
app.use(express.json());
app.use("/listings", listingsRouter);

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});

// server.listen(PORT, () => {
//   console.log(`Express app listening on port ${PORT}!`);
// });
