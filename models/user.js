const { DataTypes, Model } = require("sequelize");
const sequelize = require("../database/db");

class User extends Model {}
User.init(
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize, modelName: "user" }
);

module.exports = User;
