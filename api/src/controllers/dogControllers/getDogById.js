const axios = require('axios');
const { Dog, Temperament } = require('../../../db/db.js');
const cleanArrayAPI = require('../../helpers/cleanArrayAPI.js');

module.exports = async (id, source) => {
    const dog =
        source === "api" ?
            cleanArrayAPI((await axios('https://api.thedogapi.com/v1/breeds')).data)
            : await Dog.findByPk(id, {
                include: {
                    model: Temperament,
                    attributes: ["name"],
                }
            });

    return dog;
}