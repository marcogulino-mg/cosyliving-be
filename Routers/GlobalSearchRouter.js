const express = require("express");
const router = express.Router();
const GlobalSearchController = require("../Controllers/GlobalSearchController");

//
router.get("/:type/:name/:sorter?", GlobalSearchController.search);

module.exports = router;
