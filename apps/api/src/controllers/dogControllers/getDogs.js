const { Dog, Temperament } = require('../../db/db');
const cleanArrayAPI = require('../../helpers/cleanArrayAPI');
const axios = require('axios');
const cleanArrayDB = require('../../helpers/cleanArrayDB');

module.exports = async () => {
    // Busco los perros de la api
    const apiDogsRaw = (await axios('https://api.thedogapi.com/v1/breeds')).data;
    const apiDogs = cleanArrayAPI(apiDogsRaw);
    // Busco los perros de la db
    const dbDogs = cleanArrayDB(await Dog.findAll({
        include: [{
            model: Temperament,
            attributes: ["name"]
        }]
    }));
    // Los unifico
    return [...apiDogs, ...dbDogs];
}