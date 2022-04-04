// Connect sequelize
const { Sequelize, Model, DataTypes } = require("sequelize");

// creates database + yummy.sqlite
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "database/yummy.sqlite",
});


const Flavours = require("./flavours")(sequelize, DataTypes);

Flavours.sync({force: true}).then(() => {
 
  Flavours.bulkCreate([ 
    { title: "Simons frestelse", votes: 0 },
    { title: "Jockes konkelbär", votes: 0 },
    { title: "Hasbik's Strawberry", votes: 0 },
    { title: "Banana Sprite", votes: 0 },
    { title: "Cookie Dough", votes: 0 },
    { title: "Ayran special", votes: 0 },
    { title: "Piravid Päron", votes: 0 },
    { title: "coco special", votes: 0 },
    { title: "Peachy puff", votes: 0 },
    { title: "Nabhans special", votes: 0 },
  ])
});

