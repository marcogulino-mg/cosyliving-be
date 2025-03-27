const express = require("express");
const router = express.Router();
const FornitureController = require("../Controllers/FornitureController");
const OffersController = require("./../Controllers/OffersController")
const NewArrivalsController = require("./../Controllers/NewArrivalsController");

// index
router.get("/", FornitureController.index);

// new arrivals
router.get("/new_arrivals", NewArrivalsController.new_arrivals);

// offers
router.get("/special_price", OffersController.offers)

// show
router.get("/:slug", FornitureController.show);





module.exports = router;
