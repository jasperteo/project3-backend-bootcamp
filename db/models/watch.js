"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Watch extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.listing, { as: "listings", foreignKey: "watch_id" });
      this.hasMany(models.historicPrice, {
        as: "historicPrices",
        foreignKey: "watch_id",
      });
    }
  }
  Watch.init(
    {
      refNum: DataTypes.STRING,
      brand: DataTypes.STRING,
      model: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "watch",
      underscored: true,
    }
  );
  return Watch;
};
