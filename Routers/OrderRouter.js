const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/OrderController");

// POST
router.post("/", OrderController.store);

module.exports = router;
