const express = require("express");
const router = express.Router();
const CalcPriceController = require("./../Controllers/CalcPriceController")



router.get("/", CalcPriceController.calcPrice);



module.exports = router;
