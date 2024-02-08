"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Listing extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.user, { through: "bids" });
      this.belongsTo(models.user, { as: "buyer", foreignKey: "buyer_id" });
      this.belongsTo(models.user, { as: "seller", foreignKey: "seller_id" });
      this.belongsTo(models.watch, { as: "watch", foreignKey: "watch_id" });
    }
  }
  Listing.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      imageLink: DataTypes.STRING,
      sellerId: {
        type: DataTypes.INTEGER,
        references: { model: "users", key: "id" },
      },
      buyerId: {
        type: DataTypes.INTEGER,
        references: { model: "users", key: "id" },
      },
      watchId: {
        type: DataTypes.INTEGER,
        references: { model: "watches", key: "id" },
      },
      startingBid: DataTypes.INTEGER,
      buyoutPrice: DataTypes.INTEGER,
      status: DataTypes.BOOLEAN,
      endingAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "listing",
      underscored: true,
    }
  );
  return Listing;
};
