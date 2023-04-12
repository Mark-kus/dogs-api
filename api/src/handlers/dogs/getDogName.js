const getDogByName = require('../../controllers/dogControllers/getDogByName');

module.exports = async (req, res) => {
    const { q } = req.query;
    try {
        const dogs = await getDogByName(q);
        if (!dogs.length) res.status(204).json({ msg: "This breed does not exists" });
        else res.status(200).json(dogs);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
}