// IMPORT .env
require("dotenv").config();
// IMPORT express
const express = require("express");
// IMPORT cors
const cors = require("cors");
// Server Base Config
const app = express();
const port = process.env.PORT;
// IMPORT Middlewares
const errorsHandler = require("./middleware/errorsHandler");
const notFound = require("./middleware/notFound");
const imagePath = require("./middleware/CreatePath")
// IMPORT Routers
const FornitureRouter = require("./Routers/FornitureRouter");
const OrderRouter = require("./Routers/OrderRouter");
const GlobalSearchRouter = require("./Routers/GlobalSearchRouter")


// Middlewares
// Static File Folder
// app.use(express.static("public/imgs"));
app.use(express.static('public'));

//Handle body-parser for "application/json"
app.use(express.json());

app.use(imagePath)
// CORS
app.use(cors({ origin: process.env.FE_APP }));

// Routers
app.use("/products", FornitureRouter);
app.use("/order", OrderRouter);
app.use("/search", GlobalSearchRouter)

// HomePage
app.get("/", (req, res) => {
  res.send("<h1>Rotta di Partenza</h1>");
});

// MIDDLEWARES
// Errors Handler
app.use(errorsHandler);
// Not Found Handler
app.use(notFound);

//Server start (port: 3000)
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
