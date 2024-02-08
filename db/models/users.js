"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.bids, { foreignKey: "bidder_id" });
      this.hasMany(models.listings, { foreignKey: "seller_id" });
      this.hasMany(models.listings, { foreignKey: "buyer_id" });
      this.belongsToMany(models.watches, { through: "wishlist" });
    }
  }
  users.init(
    {
      username: DataTypes.STRING,
      email: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "users",
      underscored: true,
    }
  );
  return users;
};
