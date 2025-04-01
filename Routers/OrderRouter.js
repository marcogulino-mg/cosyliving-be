const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/OrderController");

// POST
router.post("/", OrderController.store);

// SHOW
router.get("/order-details/:id_order", OrderController.show);

module.exports = router;
