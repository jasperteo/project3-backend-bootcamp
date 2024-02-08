"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class watches extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.historic_prices, { foreignKey: "watch_id" });
      this.belongsToMany(models.users, { through: "wishlist" });
    }
  }
  watches.init(
    {
      ref_num: DataTypes.STRING,
      brand: DataTypes.STRING,
      model: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "watches",
      underscored: true,
    }
  );
  return watches;
};
