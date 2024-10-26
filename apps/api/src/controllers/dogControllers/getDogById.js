const axios = require("axios");
const { Dog, Temperament } = require("../../db/db.js");
const cleanArrayAPI = require("../../helpers/cleanArrayAPI.js");
const cleanArrayDB = require("../../helpers/cleanArrayDB.js");

module.exports = async (id, source) => {
  const useAPI = async (id) => {
    const dog = (await axios.get(`https://api.thedogapi.com/v1/breeds/${id}`))
      .data;
    dog.url = (await axios.get(
      `https://api.thedogapi.com/v1/images/${dog.reference_image_id}`
    )).data.url;
    return dog;
  };

  const dog =
    source === "api"
      ? cleanArrayAPI([await useAPI(id)])
      : cleanArrayDB([
          await Dog.findByPk(id, {
            include: {
              model: Temperament,
              attributes: ["name"],
            },
          }),
        ]);

  return dog;
};
