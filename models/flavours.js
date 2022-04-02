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
    flavour_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    flavour_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    flavour_votes: {
      type: DataTypes.INTEGER,
    }

  },
  {sequelize, modelName: "flavours",}
);


Flavours.sync().then(() => {
  console.log('Flavours table created');

  Flavours.create({
      flavour_title: 'Simons frestelse',
      flavour_votes: 6,
  });
  Flavours.create({
      flavour_title: 'Jockes konkelbär',
      flavour_votes: 7,
  });
  Flavours.create({
      flavour_title: 'Hasbulla Strawberry',
      flavour_votes: 0,
  });
  Flavours.create({
      flavour_title: 'Banana Sprite',
      flavour_votes: 0,
  });
  Flavours.create({
      flavour_title: 'Cookie Dough',
      flavour_votes: 0,
  });
  Flavours.create({
      flavour_title: 'Ayran special',
      flavour_votes: 0,
  });
  Flavours.create({
      flavour_title: 'Piravid Päron',
      flavour_votes: 0,
  });
  Flavours.create({
      flavour_title: 'coco special',
      flavour_votes: 0,
  });
  Flavours.create({
      flavour_title: 'Peachy puff',
      flavour_votes: 0,
  });
  Flavours.create({
      flavour_title: 'Nabhans special',
      flavour_votes: 3,
  });
});

module.exports = Flavours;