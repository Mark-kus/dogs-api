const axios = require("axios");
const { Temperament } = require("../../db/db.js");

const URL = 'https://api.thedogapi.com/v1/breeds';

// Traigo todos los temperamentos del endpoint
module.exports = async (req, res) => {
    try {
        // Traigo todas las razas
        const response = await axios(URL);

        // Guardo los string de temperamentos de cada raza en un array
        let temps = response.data.map(breed => breed.temperament);

        // Quito todo lo que no sea un string
        temps = temps.filter(element => typeof element === 'string')

        // Uno los strings en uno solo
        const arrLength = temps.length;
        for (let i = 1; i < arrLength; i++) {
            temps[0] = temps[0] + ',' + temps[i];
        }

        // Separo cada temperamento en elementos
        let arr = temps[0].split(',');

        // Remuevo cualquier espacio vacío
        temps = arr.map(string => string.trim());

        // Paso todo por un Set, para eliminar los repetidos
        const allTemps = new Set();
        temps.forEach(temp => {
            allTemps.add(temp);
        });
        temps = [...allTemps]

        // Creo una instancia del modelo Temperament por cada uno
        // temps.forEach(temp => {
        //     const actualTemp = Temperament.findOrCreate({
        //         where: {
        //             name: temp,
        //         },
        //         defaults: {
        //             name: temp,
        //         }
        //     })
        // });

        // Lo envío como un array
        res.status(200).json(temps);
    } catch (e) {
        console.log(e);
        res.status(400).json(e);
    }
}