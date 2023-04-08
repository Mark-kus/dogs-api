module.exports = (array) =>
    array.map(elem => {
        return {
            id: elem.id,
            name: elem.name,
        }
    });