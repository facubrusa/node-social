const express = require("express");

const config = require("../config");
const post = require("./components/post/network");
const errors = require('../network/errors');

const app = express();
app.use(express.json());
const port = config.post.port;

// ROUTER
app.use("/api/post", post);

// middlewares
app.use(errors);

app.listen(port, () => console.log(`Post microservice running on port ${port}`));
