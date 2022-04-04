// Connect sequelize
const { Sequelize, DataTypes } = require("sequelize");

// creates database + yummy.sqlite
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "database/yummy.sqlite",
});


const Flavours = require("./flavours")(sequelize, DataTypes);

Flavours.sync({force: true}).then(() => {
 
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
});

