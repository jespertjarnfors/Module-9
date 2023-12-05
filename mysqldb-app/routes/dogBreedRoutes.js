const express = require("express");
const router = express.Router();
const Controllers = require("../controllers");

// Dog Breed routes
router.get("/fetch", Controllers.dogBreedController.fetchAndStoreDogBreeds);
router.get("/", Controllers.dogBreedController.getDogBreeds);

module.exports = router;
