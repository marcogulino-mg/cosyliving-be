const express = require("express");
const router = express.Router();
const GlobalSearchController = require("../controllers/GlobalSearchController");

// 
router.get("/:slug", GlobalSearchController.search);

module.exports = router;