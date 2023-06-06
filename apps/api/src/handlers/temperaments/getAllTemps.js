const createTemps = require("../../controllers/tempControllers/createTemps.js");
const getTempsAPI = require("../../controllers/tempControllers/getTempsAPI.js");
const getTempsDB = require("../../controllers/tempControllers/getTempsDB.js");

module.exports = async (req, res) => {
    try {
        const temperamentsDB = await getTempsDB();
        if (temperamentsDB.length) {
            res.status(200).json(temperamentsDB);
            return;
        }
        else {
            const temperaments = await getTempsAPI();
            await createTemps(temperaments);
            res.status(201).json(temperaments);
        }
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
}