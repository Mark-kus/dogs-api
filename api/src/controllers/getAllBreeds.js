const axios = require('axios');

const URL = 'https://api.thedogapi.com/v1/breeds';

// Traigo todas las razas del endpoint
module.exports = async (req, res) => {
    try {
        const response = await axios(URL);
        res.status(200).json(response.data);
    } catch (e) {
        console.log(e);
        res.status(400).json({ msg: "Ocurrió un error inesperado" });
    }
}