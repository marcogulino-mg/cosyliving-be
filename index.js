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
// IMPORT Routers
const FornitureRouter = require("./Routers/FornitureRouter")

// Middlewares
// Static File Folder
app.use(express.static("public"));
//Handle body-parser for "application/json"
app.use(express.json());
// CORS
app.use(cors({ origin: process.env.FE_APP }));

// HomePage
app.get("/", (req, res) => {
  res.send("<h1>Rotta di Partenza</h1>");
});

// Test
app.get

// MIDDLEWARES
// Errors Handler
app.use(errorsHandler);
// Not Found Handler
app.use(notFound);

//Server start (port: 3000)
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
