const createDog = require("../../controllers/dogControllers/createDog");
const getCreatedDogs = require("../../controllers/dogControllers/getCreatedDogs");
const Dog = require("../../db/models/Dog");

module.exports = async (req, res) => {
  const { name, image, height, weight, lifespan, temperament } = req.body;

  try {
    // Limite de 10 perros creados en base de datos
    const createdDogs = await getCreatedDogs();
    if (createdDogs.length >= 10)
      return res.status(400).json({ error: "No se pueden crear más de 10 perros" });
    const newDog = await createDog(
      name,
      image,
      height,
      weight,
      lifespan,
      temperament
    );
    res.status(201).json(newDog);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
