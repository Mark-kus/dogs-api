const { Dog } = require('../../db/db');

module.exports = async (id) => {
    await Dog.destroy({ where: { id } });
}