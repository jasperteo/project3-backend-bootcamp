"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class historic_prices extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.watches, { foreignKey: "watch_id" });
    }
  }
  historic_prices.init(
    {
      watch_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "watches",
          key: "id",
        },
      },
      price: DataTypes.INTEGER,
      transacted_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "historic_prices",
      underscored: true,
    }
  );
  return historic_prices;
};
