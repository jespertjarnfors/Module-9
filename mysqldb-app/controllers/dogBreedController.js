const axios = require("axios");
const Models = require("../models");

const fetchAndStoreDogBreeds = async (req, res) => {
  try {
     // fetch the Dog Breeds from the Api
    const response = await axios.get("https://api.thedogapi.com/v1/breeds");
    const dogBreeds = response.data;

    // Populate the database according to dogBreed.js model
    await Models.DogBreed.bulkCreate(dogBreeds, {
      fields: ["breedId", "name", "origin", "temperament"],
      updateOnDuplicate: ["name", "origin", "temperament"],
    });

    res.send({ status: 200, message: "Dog breeds fetched and stored successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).send({ status: 500, error: err.message });
  }
};

const getDogBreeds = async (req, res) => {
  try {
    const dogBreeds = await Models.DogBreed.findAll();
    res.send({ status: 200, data: dogBreeds });
  } catch (err) {
    console.error(err);
    res.status(500).send({ status: 500, error: err.message });
  }
};

module.exports = {
  fetchAndStoreDogBreeds,
  getDogBreeds,
};
