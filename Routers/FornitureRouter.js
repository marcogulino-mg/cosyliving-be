const express = require("express");
const router = express.Router();
const FornitureController = require("../controllers/FornitureController");

// index
router.get("/", FornitureController.index);

module.exports = router;
