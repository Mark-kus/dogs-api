const { Temperament } = require("../../db/db.js");

module.exports = async (temperaments) => {
    temperaments.forEach(async (temp) => {
        await Temperament.Create({ name: temp })
    });
}