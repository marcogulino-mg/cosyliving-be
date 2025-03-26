const express = require("express");
const router = express.Router();
const FornitureController = require("../controllers/FornitureController");
const NewArrivalsController = require("./../Controllers/NewArrivalsController")

// index
router.get("/", FornitureController.index);

// new arrivals
router.get("/new_arrivals", NewArrivalsController.new_arrivals)

// show
router.get("/:slug", FornitureController.show);

// search
router.get("/find/:alias", FornitureController.search)



module.exports = router;
