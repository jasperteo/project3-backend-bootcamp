"use strict";
const BaseController = require("./baseController");

class UsersController extends BaseController {
  constructor(model, watchesModel) {
    super(model);
    this.watchesModel = watchesModel;
  }

  /** if a method in this extended class AND the base class has the same name, the one in the extended class will run over the base method */

  async getOne(req, res) {
    const { userEmail } = req.params;
    try {
      const [user] = await this.model.findOrCreate({
        where: { email: userEmail },
      });
      return res.json(user);
    } catch (error) {
      return res.status(400).json({ error: true, msg: error.message });
    }
  }

  async updateOne(req, res) {
    const { userId } = req.params;
    const { username } = req.body;
    try {
      const data = await this.model.findByPk(userId);
      await data.update({ username: username });
      return res.json(data);
    } catch (error) {
      return res.status(400).json({ error: true, msg: error.message });
    }
  }

  async likeWatch(req, res) {
    const { userId } = req.params;
    const { selectedWatchId } = req.body;
    try {
      const data = await this.model.findByPk(userId);
      const selectedWatches = await this.watchesModel.findAll({
        where: { id: selectedWatchId },
      });
      await data.setWatches(selectedWatches);
      return res.json(data);
    } catch (error) {
      return res.status(400).json({ error: true, msg: error.message });
    }
  }

  async getLikes(req, res) {
    const { userId } = req.params;
    try {
      const data = await this.model.findByPk(userId, {
        include: this.watchesModel,
      });
      return res.json(data);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}
module.exports = UsersController;
