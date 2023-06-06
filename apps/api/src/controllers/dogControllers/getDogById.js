const axios = require('axios');
const { Dog, Temperament } = require('../../db/db.js');
const cleanArrayAPI = require('../../helpers/cleanArrayAPI.js');
const cleanArrayDB = require('../../helpers/cleanArrayDB.js');

module.exports = async (id, source) => {
    const dog =
        source === "api" ?

            cleanArrayAPI((await axios('https://api.thedogapi.com/v1/breeds')).data)

            : cleanArrayDB([await Dog.findByPk(id, {
                include: {
                    model: Temperament,
                    attributes: ["name"],
                }
            })]); 

    if (source === 'api') {
        return dog.filter(dog => dog.id === Number(id));
    }

    return dog;
}