module.exports = (req, res, next) => {
    const { name, image, height, weight, lifespan, temperament } = req.body;
    if (![name, image, height, weight, lifespan, temperament].every(Boolean)) {
        return res.status(400).json({ msg: "Faltan datos" });
    } else {
        next();
    }
}