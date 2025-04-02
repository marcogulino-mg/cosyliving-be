const express = require("express");
const router = express.Router();
const CalcPriceController = require("./../Controllers/CalcPriceController");
const { route } = require("./GlobalSearchRouter");



router.post("/", CalcPriceController.calcPrice);

router.post("/last", CalcPriceController.lastCalc)



module.exports = router;
