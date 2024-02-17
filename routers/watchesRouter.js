"use strict";
const express = require("express");
const router = express.Router();

class WatchesRouter {
  constructor(controller, checkJwt) {
    this.controller = controller;
    this.checkJwt = checkJwt;
  }
  routes() {
    // we will insert routes into here later on
    router.get("/", this.controller.getAll.bind(this.controller));
    router.get("/:watchId", this.controller.getOne.bind(this.controller));
    router.get(
      "/:watchId/historicPrices",
      this.controller.getByWatchId.bind(this.controller)
    );
    router.post(
      "/:watchId/historicPrices",
      this.checkJwt,
      this.controller.insertHistoricPrice.bind(this.controller)
    );

    return router;
  }
}

module.exports = WatchesRouter;
