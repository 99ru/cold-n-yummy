const { DataTypes, Model } = require("sequelize");
const sequelize = require("../database/db");

class Flavours extends Model {}
  Flavours.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
  
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
  
      votes: {
        type: DataTypes.INTEGER,
      },
    },
    { sequelize, modelName: "flavours" }
  );

  module.exports = Flavours





