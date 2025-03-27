const express = require("express");
const router = express.Router();
const FornitureController = require("../controllers/FornitureController");
const NewArrivalsController = require("./../Controllers/NewArrivalsController");
const OffersController = require("./../Controllers/OffersController")

// index
router.get("/", FornitureController.index);

// new arrivals
router.get("/new_arrivals", NewArrivalsController.new_arrivals)

// offers
router.get("/special_price", OffersController.offers)

// show
router.get("/:slug", FornitureController.show);

// search
router.get("/find/:alias", FornitureController.search)




module.exports = router;
