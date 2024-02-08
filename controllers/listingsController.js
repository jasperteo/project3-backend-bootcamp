const BaseController = require("./baseController");

class ListingsController extends BaseController {
  constructor(model, userModel, watchModel) {
    super(model);
    this.userModel = userModel;
    this.watchModel = watchModel;
  }

  /** if a method in this extended class AND the base class has the same name, the one in the extended class will run over the base method */
  // Create listing. Requires authentication.
  async insertOne(req, res) {
    const {
      title,
      description,
      imageLink,
      sellerId,
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
        imageLink: imageLink,
        sellerId: sellerId,
        buyerId: null,
        watchId: watchId,
        startingBid: startingBid,
        buyoutPrice: buyoutPrice,
        status: true,
        endingAt: new Date(endingAt),
      });

      // Respond with new listing
      return res.json(newListing);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // Retrieve specific listing. No authentication required.
  async getOne(req, res) {
    const { listingId } = req.params;
    try {
      const output = await this.model.findByPk(listingId);
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = ListingsController;
