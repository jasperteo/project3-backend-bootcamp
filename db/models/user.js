"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.listing, { through: "bids" });
      this.hasMany(models.listing, { as: "buyer", foreignKey: "buyer_id" });
      this.hasMany(models.listing, { as: "seller", foreignKey: "seller_id" });
      this.hasMany(models.wishlist);
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      email: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "user",
      underscored: true,
    }
  );
  return User;
};
