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
// IMPORT Routers

// Middlewares
// Static File Folder
app.use(express.static("public"));
//Handle body-parser for "application/json"
app.use(express.json());
// CORS
app.use(cors({ origin: process.env.FE_APP }));
