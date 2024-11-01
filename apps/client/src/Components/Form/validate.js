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

    if (name) {
        if (name.length > 20) errors.name = "Name must be less than 20 characters.";
        if (name.length < 2) errors.name = "Name must be at least 2 characters.";
        if (!/^[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ\s]+$/i.test(name)) errors.name = "Name can only contain letters and spaces.";
    }

    if (minWeight) {
        if (minWeight <= 0) errors.minWeight = "Minimum weight must be greater than 0 kg.";
        if (minWeight > 100) errors.minWeight = "Minimum weight must be less than 100 kg.";
        if (isNaN(Number(minWeight))) errors.minWeight = "Minimum weight must be a number.";
    }

    if (maxWeight) {
        if (maxWeight > 100) errors.maxWeight = "Maximum weight must be less than 100 kg.";
        if (isNaN(Number(maxWeight))) errors.maxWeight = "Maximum weight must be a number.";
    }

    if (minWeight && maxWeight) {
        if (Number(minWeight) >= Number(maxWeight)) errors.minWeight = "Minimum weight must be less than maximum weight.";
    }

    if (minHeight) {
        if (minHeight <= 0) errors.minHeight = "Minimum height must be greater than 0 cm.";
        if (minHeight > 100) errors.minHeight = "Minimum height must be less than 100 cm.";
        if (isNaN(Number(minHeight))) errors.minHeight = "Minimum height must be a number.";
    }

    if (maxHeight) {
        if (maxHeight > 100) errors.maxHeight = "Maximum height must be less than 100 cm.";
        if (isNaN(Number(maxHeight))) errors.maxHeight = "Maximum height must be a number.";
    }

    if (minHeight && maxHeight) {
        if (Number(minHeight) >= Number(maxHeight)) errors.minHeight = "Minimum height must be less than maximum height.";
    }

    if (minLifespan) {
        if (minLifespan <= 1) errors.minLifespan = "Minimum lifespan must be greater than 1 year.";
        if (minLifespan >= 40) errors.minLifespan = "Minimum lifespan must be less than 40 years.";
        if (isNaN(Number(minLifespan))) errors.minLifespan = "Minimum lifespan must be a number.";
    }

    if (maxLifespan) {
        if (maxLifespan >= 40) errors.maxLifespan = "Maximum lifespan must be less than 40 years.";
        if (isNaN(Number(maxLifespan))) errors.maxLifespan = "Maximum lifespan must be a number.";
    }

    if (minLifespan && maxLifespan) {
        if (Number(minLifespan) >= Number(maxLifespan)) errors.minLifespan = "Minimum lifespan must be less than maximum lifespan.";
    }

    if (image) {
        if (!/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(image)) errors.image = "Image must be a valid URL.";
    }

    if (!temperament.length) {
        errors.temperament = "Please select at least one temperament.";
    }

    return errors;
}

export default validate;
