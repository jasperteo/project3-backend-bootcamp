"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Bid extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.user, { as: "buyer", foreignKey: "buyer_id" });
      this.belongsTo(models.listing, {
        as: "listing",
        foreignKey: "listing_id",
      });
    }
  }
  Bid.init(
    {
      listingId: {
        type: DataTypes.INTEGER,
        references: { model: "listings", key: "id" },
      },
      buyerId: {
        type: DataTypes.INTEGER,
        references: { model: "users", key: "id" },
      },
      currentBid: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "bid",
      underscored: true,
    }
  );
  return Bid;
};
