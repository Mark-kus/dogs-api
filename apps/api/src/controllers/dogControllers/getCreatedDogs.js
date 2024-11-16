const { Dog, Temperament } = require("../../db/db");
const cleanArrayDB = require("../../helpers/cleanArrayDB");

module.exports = async (req, res) => {
  // Busco los perros de la db
  const dbDogs = cleanArrayDB(
    await Dog.findAll({
      include: [
        {
          model: Temperament,
          attributes: ["name"],
        },
      ],
    })
  );

  return dbDogs;
};
