const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/OrderController");

// POST
router.post("/", OrderController.store);

// TOTAL PRICE
router.get("/total-price", OrderController.totalPrice);

module.exports = router;
