module.exports = (array) =>
    array.map(elem => {
        return {
            weight: elem.weight.metric,
            height: elem.height.metric,
            id: elem.id,
            name: elem.name,
            lifespan: elem.lifespan,
            image: elem.image.url,
            created: false,
        }
    });