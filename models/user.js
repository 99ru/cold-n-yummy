const { DataTypes, Model } = require("sequelize");
const sequelize = require("../database/db");

class User extends Model {}
User.init(
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
  },
  { sequelize, modelName: "user" }
);

module.exports = User;
