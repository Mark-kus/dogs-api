const validate = (inputs) => {
    const {
        name,
        maxWeight,
        minWeight,
        maxHeight,
        minHeight,
        maxLifespan,
        minLifespan,
        image,
        temperament,
    } = inputs;
    const errors = {};

    // Cada input se verifica solo si existe
    if (name) {
        if (name.length > 20) errors.name = "The name's length must be less than 20 characters";
        if (name.length < 2) errors.name = "The name's length must be greater than 2 characters";
        if (!/^[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ\s]+$/i.test(name)) errors.name = "The name shouldn't contain any numbers or special characters";
    }

    // A pesar de qué el input es de tipo "Number", prefiero verificarlo una vez más
    if (minWeight || maxWeight) {
        // Poner un maximo y un negativo
        if (isNaN(Number(minWeight))) errors.minWeight = "The weight must be a number";
        if (isNaN(Number(maxWeight))) errors.maxWeight = "The weight must be a number";
    }
    if (minWeight && maxWeight) {
        if (Number(minWeight) >= Number(maxWeight)) errors.minWeight = "The maximum weight must be greater than the minimum";
        if (minWeight <= 0) errors.minWeight = "The minimum weight should be greater than 0 kg";
        if (maxWeight > 100) errors.maxWeight = "The maximum weight should be less than 100 kg";
    }


    if (minHeight || maxHeight) {
        // Poner un maximo y un negativo
        if (isNaN(Number(minHeight))) errors.minHeight = "The height must be a number";
        if (isNaN(Number(maxHeight))) errors.maxHeight = "The height must be a number";
    }
    if (minHeight && maxHeight) {
        if (Number(minHeight) >= Number(maxHeight)) errors.minHeight = "The maximum height must be greater than the minimum";
        if (minHeight <= 0) errors.minHeight = "The minimum height should be greater than 0 cm";
        if (maxHeight > 100) errors.maxHeight = "The maximum height should be less than 100 cm";
    }


    if (minLifespan || maxLifespan) {
        // Poner un maximo y un negativo
        if (isNaN(Number(minLifespan))) errors.minLifespan = "The life span must be a number";
        if (isNaN(Number(maxLifespan))) errors.maxLifespan = "The life span must be a number";
    }
    if (minLifespan && maxLifespan) {
        if (Number(minLifespan) >= Number(maxLifespan)) errors.minLifespan = "The maximum lifespan must be greater than the minimum";
        if (minLifespan <= 1) errors.minLifespan = "The minimum life span should be greater than a year";
        if (maxLifespan >= 40) errors.maxLifespan = "The maximum life span should be less than 40 years";
    }

    if (image) {
        if (!/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(image)) errors.image = "The image must be a valid URL";
    }

    if (!temperament.length) { // falta esto
        errors.temperament = "The dog should have at least one temperament";
    }

    return errors;
}

export default validate;