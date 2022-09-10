const express = require("express");

const config = require("../config");
const user = require("./components/user/network");

const app = express();
const port = config.api.port;

// ROUTER
app.get("/", (req, res) => res.send("Hello World!"));
app.use("/api/user", user);

app.listen(port, () => console.log(`Running on port ${port}`));
