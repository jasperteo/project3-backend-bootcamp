"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Wishlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.user, { as: "user", foreignKey: "user_id" });
    }
  }
  Wishlist.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        references: { model: "users", key: "id" },
      },
      favBrand: DataTypes.STRING,
      favModel: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "wishlist",
      underscored: true,
    }
  );
  return Wishlist;
};
