"use strict";
const BaseController = require("./baseController");

class ListingsController extends BaseController {
  constructor(model, bidsModel, watchesModel) {
    super(model);
    this.bidsModel = bidsModel;
    this.watchesModel = watchesModel;
  }

  /** if a method in this extended class AND the base class has the same name, the one in the extended class will run over the base method */

  async insertOne(req, res) {
    const {
      title,
      description,
      imageLink,
      userId,
      watchId,
      startingBid,
      buyoutPrice,
      endingAt,
    } = req.body;

    try {
      // Create new listing
      const newListing = await this.model.create({
        title: title,
        description: description,
        image_link: imageLink,
        seller_id: userId,
        buyer_id: null,
        watch_id: watchId,
        starting_bid: startingBid,
        buyout_price: buyoutPrice,
        status: true,
        ending_at: new Date(endingAt),
      });

      // Respond with new listing
      return res.json(newListing);
    } catch (error) {
      return res.status(400).json({ error: true, msg: error.message });
    }
  }
  async getAll(req, res) {
    try {
      const output = await this.model.findAll({
        include: this.watchesModel,
      });
      return res.json(output);
    } catch (error) {
      return res.status(400).json({ error: true, msg: error.message });
    }
  }

  async getOne(req, res) {
    const { listingId } = req.params;
    try {
      const output = await this.model.findByPk(listingId, {
        include: this.watchesModel,
      });
      return res.json(output);
    } catch (error) {
      return res.status(400).json({ error: true, msg: error.message });
    }
  }

  async closeOne(req, res) {
    const { listingId } = req.params;
    const { buyerId } = req.body;
    try {
      const data = await this.model.findByPk(listingId);
      await data.update({ buyer_id: buyerId, status: false });
      return res.json(data);
    } catch (error) {
      return res.status(400).json({ error: true, msg: error.message });
    }
  }

  async updateBid(req, res) {
    const { listingId } = req.params;
    const { currentBid, userId } = req.body;
    try {
      const [bid] = await this.bidsModel.findOrCreate({
        where: { listing_id: listingId, bidder_id: userId },
      });
      await bid.update({ current_bid: currentBid });
      return res.json(bid);
    } catch (error) {
      return res.status(400).json({ error: true, msg: error.message });
    }
  }
}

module.exports = ListingsController;
