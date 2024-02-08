"use strict";
const BaseController = require("./baseController");

class WatchesController extends BaseController {
  constructor(model, historicPricesModel) {
    super(model);
    this.historicPricesModel = historicPricesModel;
  }
  async getOne(req, res) {
    const { watchId } = req.params;
    try {
      const output = await this.model.findByPk(watchId);
      return res.json(output);
    } catch (error) {
      return res.status(400).json({ error: true, msg: error.message });
    }
  }
  async insertHistoricPrice(req, res) {
    const { price, transactedAt } = req.body;
    const { watchId } = req.params;
    try {
      // Create new listing
      const newHistoricPrice = await this.historicPricesModel.create({
        watch_id: watchId,
        price: price,
        transacted_at: new Date(transactedAt),
      });
      // Respond with new listing
      return res.json(newHistoricPrice);
    } catch (error) {
      return res.status(400).json({ error: true, msg: error.message });
    }
  }

  async getByWatchId(req, res) {
    const { watchId } = req.params;
    try {
      const output = await this.historicPricesModel.findAll({
        where: { watch_id: watchId },
      });
      return res.json(output);
    } catch (error) {
      return res.status(400).json({ error: true, msg: error.message });
    }
  }
}

module.exports = WatchesController;
