// Tiene que incluir los datos de los temperamentos asociadas a esta raza.
const axios = require('axios');
const { Dog } = require('../../db/db.js')

const URL = 'https://api.thedogapi.com/v1/breeds';

module.exports = async (req, res) => {
    const { id } = req.params;
    try {
        // Traigo todas las razas
        let response = await axios(URL);

        // Extraigo la que piden
        let requested = response.data.find(raza => raza.id === Number(id));

        // Si no está en la API, busca en la database
        if (!requested) {
            response = await Dog.findOne({ where: { id: id } });
        }
        res.status(200).json(requested);
    } catch (e) {
        console.log(e);
        res.status(400).json({ msg: "El id ingresado no existe" });
    }
}