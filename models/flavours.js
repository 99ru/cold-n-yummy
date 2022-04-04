// Connect sequelize
const { Sequelize, Model, DataTypes } = require("sequelize");

// creates database + yummy.sqlite
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "database/yummy.sqlite",
});

// #1 Create a model for the table
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


class User extends Model {}
User.init(
  {
    user: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  { sequelize, modelName: "user" }
);

User.sync().then(() => {
  console.log("User table created");
});


Flavours.sync().then(() => {
  console.log("Flavours table created");

  Flavours.create({
    title: "Simons frestelse",
    votes: 6,
  });
  Flavours.create({
    title: "Jockes konkelbär",
    votes: 7,
  });
  Flavours.create({
    title: "Hasbik's Strawberry",
    votes: 10,
  });
  Flavours.create({
    title: "Banana Sprite",
    votes: 0,
  });
  Flavours.create({
    title: "Cookie Dough",
    votes: 0,
  });
  Flavours.create({
    title: "Ayran special",
    votes: 0,
  });
  Flavours.create({
    title: "Piravid Päron",
    votes: 0,
  });
  Flavours.create({
    title: "coco special",
    votes: 0,
  });
  Flavours.create({
    title: "Peachy puff",
    votes: 0,
  });
  Flavours.create({
    title: "Nabhans special",
    votes: 3,
  });

//  User
  User.create({
    user: "admin@live.se",
  });

});


