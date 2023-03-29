const axios = require("axios");

const URL = 'https://api.thedogapi.com/v1/breeds';

// Traigo todos los temperamentos del endpoint
module.exports = async (req, res) => {
    try {
        // Traigo todas las razas
        const response = await axios(URL);

        // Guardo los string de temperamento de cada raza en un array
        let temps = response.data.map(breed => breed.temperament);

        // Solo quiero los strings
        temps = temps.filter(element => typeof element === 'string')

        // Uno los arrays en uno solo
        const arrLength = temps.length;
        for (let i = 1; i < arrLength; i++) {
            temps[0] = temps[0] + ',' + temps[i];
        }

        // Separo cada temperamento en elementos
        let arr = temps.map(string => string.split(','));

        res.status(200).json(arr);
    } catch (e) {
        console.log(e);
        res.status(400).json(e);
    }
}