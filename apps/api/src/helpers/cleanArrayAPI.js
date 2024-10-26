module.exports = (array) =>
    array.map(elem => {
        return {
            weight: elem.weight.metric,
            height: elem.height.metric,
            id: elem.id,
            name: elem.name,
            lifespan: elem.life_span,
            image: elem.url,
            temperament: elem.temperament,
            created: false,
        }
    });