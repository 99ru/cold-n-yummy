const { DataTypes, Model } = require("sequelize");

// #1 Create a model for the table
class Flavours extends Model {}

module.exports = (sequelize) => {
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
  return Flavours;
}






