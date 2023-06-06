module.exports = (array) =>
array.map(elem => {
        return {
            weight: elem.weight,
            height: elem.height,
            id: elem.id,
            name: elem.name,
            lifespan: elem.lifespan,
            image: elem.image,
            temperament: elem.temperaments.map(temp => temp.name).join(', '),
            created: elem.created,
        }
    });