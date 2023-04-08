const axios = require("axios");
const cleanArrayName = require("../../helpers/cleanArrayName.js");
const { Dog, Op } = require('../../../db/db.js');

module.exports = async (name) => {
    // Busco la raza en la base de datos
    const dbDogsRaw = await Dog.findAll({
        where: {
            name: {
                [Op.like]: `%${name}%`,
            }
        }
    })
    const dbDogs = cleanArrayName(dbDogsRaw);

    // Busco la raza en la API
    const apiDogsRaw = (await axios(`https://api.thedogapi.com/v1/breeds/search?q=${name}`)).data;
    const apiDogs = cleanArrayName(apiDogsRaw);

    return [...apiDogs, ...dbDogs];
}