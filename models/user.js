const { DataTypes, Model } = require("sequelize");
const sequelize = require("../database/db");

class User extends Model {}
  User.init(
    {
      email: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
  
      votes: {
        type: DataTypes.INTEGER,
      },
    },
    { sequelize, modelName: "user" }
  );

  module.exports = User

