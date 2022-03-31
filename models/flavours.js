// Connect sequelize
const { Sequelize, Model, DataTypes } = require("sequelize");

// creates database + yummy.sqlite
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "database/yummy.sqlite",
});

class Flavours extends Model {}

// Define Flavours model
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
  },
  {sequelize, modelName: "flavours",}
);

Flavours.sync().then(() => {
  console.log('Flavours table created');
  Flavours.create({
      flavour_title: 'Simons frästelse',
      points: 0,
  });
  Flavours.create({
      flavour_title: 'Jockes konkelbär',
      points: 0,
  });
  Flavours.create({
      flavour_title: 'Hasbulla Strawberry',
      points: 0,
  });
  Flavours.create({
      flavour_title: 'Banana Sprite',
      points: 0,
  });
  Flavours.create({
      flavour_title: 'Cookie Dough',
      points: 0,
  });
  Flavours.create({
      flavour_title: 'Ayran special',
      points: 0,
  });
  Flavours.create({
      flavour_title: 'Piravid Päron',
      points: 0,
  });
  Flavours.create({
      flavour_title: 'coco special',
      points: 0,
  });
  Flavours.create({
      flavour_title: 'Peachy puff',
      points: 0,
  });
  Flavours.create({
      flavour_title: 'Nabhans special',
      points: 0,
  });
});
