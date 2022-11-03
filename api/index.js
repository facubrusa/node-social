const express = require("express");

const config = require("../config");
const user = require("./components/user/network");
const auth = require("./components/auth/network");
const errors = require('../network/errors');

const app = express();
app.use(express.json());
const port = config.api.port;

// ROUTER
app.get("/", (req, res) => res.send("Hello World!"));
app.use("/api/user", user);
app.use("/api/auth", auth);

// middlewares
app.use(errors);

app.listen(port, () => console.log(`Api running on port ${port}`));
