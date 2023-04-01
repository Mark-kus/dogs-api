const validate = (inputs) => {
    const errors = {};

    const regExName = /d/;
    const regExNumeralInputs = /d/;

    if (inputs.name) {
        const {name} = inputs;
        if (!regExName.test(name)) return;
    }

    if (inputs.minHeight) {
        const {minHeight} = inputs;
        if (!regExNumeralInputs.test(minHeight)) return;
    }

    return errors;
}

export default validate;