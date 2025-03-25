const express = require("express");
const router = express.Router();
const FornitureController = require("../controllers/FornitureController");

// index
router.get("/", FornitureController.index);

// show
router.get("/:slug", FornitureController.show);

// search
router.get("/search/:alias", FornitureController.search)

module.exports = router;
