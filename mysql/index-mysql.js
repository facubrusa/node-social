const express = require("express");

const config = require("../config");
const router = require("./network");
const errors = require('../network/errors');

const app = express();
app.use(express.json());
const port = config.mysqlService.port;

// ROUTER
app.use("/", router);

// middlewares
app.use(errors);

app.listen(port, () => console.log(`MySQL microservice running on port ${port}`));
