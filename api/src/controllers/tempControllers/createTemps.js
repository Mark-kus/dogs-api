const { Temperament } = require("../../db/db.js");

module.exports = async (temperaments) => {
    temperaments.forEach(async (temp) => {
        await Temperament.create({ name: temp });
    });
}