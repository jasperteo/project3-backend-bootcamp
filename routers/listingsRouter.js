"use strict";
const express = require("express");
const router = express.Router();

class ListingsRouter {
  constructor(controller, checkJwt) {
    this.controller = controller;
    this.checkJwt = checkJwt;
  }
  routes() {
    // we will insert routes into here later on
    router.get("/", this.controller.getAll.bind(this.controller));
    router.post(
      "/",
      this.checkJwt,
      this.controller.insertOne.bind(this.controller)
    );
    router.get("/:listingId", this.controller.getOne.bind(this.controller));
    router.put(
      "/:listingId",
      this.checkJwt,
      this.controller.closeOne.bind(this.controller)
    );
    router.put(
      "/:listingId/bid",
      this.controller.updateBid.bind(this.controller)
    );
    router.get("/:listingId/bid", this.controller.getBid.bind(this.controller));
    return router;
  }
}

module.exports = ListingsRouter;
