const express = require("express");
const router = express.Router();
const GlobalSearchController = require("../Controllers/GlobalSearchController");

//
router.get("/:name", GlobalSearchController.search);

module.exports = router;
