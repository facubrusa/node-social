const express = require("express");

const response = require("../../../network/response");
const Controller = require("./index");

const router = express.Router();

router.get("/", async function (req, res) {
  try {
    const userList = await Controller.list();
    response.success(req, res, userList, 200);
  } catch (error) {
    response.error(req, res, error.message, 500);
  }
});

router.get("/:id", async function (req, res) {
  try {
    const { id } = req.params;
    if (!id) {
      response.error(req, res, 'id is required', 400);
      return;
    }
    const user = await Controller.get(id);
    if (!user) {
      response.error(req, res, 'User not found', 404);
      return;
    }
    response.success(req, res, user, 200);
  } catch (error) {
    response.error(req, res, error.message, 500);
  }
});

router.post("/", async function (req, res) {
  try {
    console.log(req);
    const { name } = req.body;
    if (!name) {
      response.error(req, res, 'name is required', 400);
      return;
    }
    const newUser = await Controller.insert(name);
    response.success(req, res, newUser, 200);
  } catch (error) {
    response.error(req, res, error.message, 500);
  }
});

router.delete("/:id", async function (req, res) {
  try {
    const { id } = req.params;
    if (!id) {
      response.error(req, res, 'id is required', 400);
      return;
    }
    const user = await Controller.get(id);
    if (!user) {
      response.error(req, res, 'User not found', 404);
      return;
    }
    await Controller.delete(id);
    response.success(req, res, user, 200);
  } catch (error) {
    response.error(req, res, error.message, 500);
  }
});

module.exports = router;
