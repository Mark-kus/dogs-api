const getDogByName = require('../../controllers/dogControllers/getDogByName');

module.exports = async (req, res) => {
    const { q } = req.query;
    try {
        const dogs = await getDogByName(q);
        if (!dogs.length) res.status(404).json({ msg: "This breed does not exists" })
        res.status(200).json(dogs);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
}