const createTemps = require("../../controllers/tempControllers/createTemps.js");
const getTemps = require("../../controllers/tempControllers/getTemps.js");

module.exports = async (req, res) => {
    try {
        const temperaments = await getTemps();
        await createTemps(temperaments);
        res.status(200).json(temperaments);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
}