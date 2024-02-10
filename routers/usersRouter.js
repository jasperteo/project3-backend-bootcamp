"use strict";
const express = require("express");
const router = express.Router();

class UsersRouter {
  constructor(controller, checkJwt) {
    this.controller = controller;
    this.checkJwt = checkJwt;
  }
  routes() {
    // we will insert routes into here later on
    router.get("/", this.controller.getAll.bind(this.controller));
    router.get("/:userEmail", this.controller.getOne.bind(this.controller));
    router.put("/:userId", this.controller.updateOne.bind(this.controller));
    router.get(
      "/:userId/wishlist",
      this.controller.getLikes.bind(this.controller)
    );
    router.put(
      "/:userId/wishlist",
      this.controller.likeWatch.bind(this.controller)
    );
    return router;
  }
}

module.exports = UsersRouter;
