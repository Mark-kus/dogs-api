const validate = (inputs) => {
    const {
        name,
        maxWeight,
        minWeight,
        maxHeight,
        minHeight,
        maxLifespan,
        minLifespan,
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
        if (isNaN(Number(minWeight))) errors.minWeight = "The minimum weight must be a number";
        if (isNaN(Number(maxWeight))) errors.maxWeight = "The maximum weight must be a number";
    }
    if (minWeight && maxWeight) {
        if (Number(minWeight) > Number(maxWeight)) errors.minWeight = "The maximum Weight must be greater than the minimum";
    }


    if (minHeight || maxHeight) {
        // Poner un maximo y un negativo
        if (isNaN(Number(minHeight))) errors.minHeight = "The minimum height must be a number";
        if (isNaN(Number(maxHeight))) errors.maxHeight = "The maximum height must be a number";
    }
    if (minHeight && maxHeight) {
        if (Number(minHeight) > Number(maxHeight)) errors.minHeight = "The maximum height must be greater than the minimum";
    }


    if (minLifespan || maxLifespan) {
        // Poner un maximo y un negativo
        if (isNaN(Number(minLifespan))) errors.minLifespan = "The minimum life span must be a number";
        if (isNaN(Number(maxLifespan))) errors.maxLifespan = "The maximum life span must be a number";
    }
    if (minLifespan && maxLifespan) {
        if (Number(minLifespan) > Number(maxLifespan)) errors.minLifespan = "The maximum lifespan must be greater than the minimum";
    }

    return errors;
}

export default validate;