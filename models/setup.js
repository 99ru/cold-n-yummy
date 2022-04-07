/* const { Sequelize, DataTypes } = require("sequelize"); */
const sequelize = require("../database/db");
const Flavours = require("./flavours");
const User = require("./user");

sequelize.sync({force: true}).then(() => {

  Flavours.bulkCreate([ 
    { title: "Simons frestelse", votes: 7 },
    { title: "Jockes konkelbär", votes: 12 },
    { title: "Hasbik's Strawberry", votes: 0 },
    { title: "Banana Sprite", votes: 0 },
    { title: "Cookie Dough", votes: 0 },
    { title: "Mint", votes: 0 },
    { title: "Coffee", votes: 0 },
    { title: "Coco", votes: 0 },
    { title: "Peachy puff", votes: 0 },
    { title: "Nabhans special", votes: 0 },
  ])

  User.bulkCreate([
    { email: "admin@live.se", password: "korv", id: 1 },
  ])

});

User.hasOne(Flavours);
Flavours.belongsTo(User) ;

module.exports = sequelize


