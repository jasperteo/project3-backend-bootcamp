"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class HistoricPrice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.watch, { as: "watch", foreignKey: "watch_id" });
    }
  }
  HistoricPrice.init(
    {
      watchId: {
        type: DataTypes.INTEGER,
        references: { model: "watches", key: "id" },
      },
      price: DataTypes.INTEGER,
      transactedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "historicPrice",
      underscored: true,
    }
  );
  return HistoricPrice;
};
