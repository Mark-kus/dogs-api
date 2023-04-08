const { Temperament } = require('../../db/db');

module.exports = async () =>{
    const temperaments = await Temperament.findAll();
    return temperaments.map(temp => temp.name);
};