const axios = require("axios");

module.exports = async () => {
    // Traigo todas las razas y extraigo sus temperamentos
    const response = (await axios('https://api.thedogapi.com/v1/breeds')).data;
    const temperamentsRaw = response.map(dog => dog.temperament);

    // Quito todo lo que no sea un string y los uno
    const temperaments = temperamentsRaw.filter(element => typeof element === 'string')
    const arrLength = temperaments.length;
    for (let i = 1; i < arrLength; i++) {
        temperaments[0] = temperaments[0] + ',' + temperaments[i];
    }

    // Separo cada temperamento en elementos y remuevo espacios
    let arr = temperaments[0].split(',');
    temperaments = arr.map(string => string.trim());

    // Paso todo por un Set, para eliminar los repetidos
    const alltemperaments = new Set();
    temperaments.forEach(temp => {
        alltemperaments.add(temp);
    });
    
    return [...alltemperaments]
}