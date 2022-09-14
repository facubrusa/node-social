const express = require("express");

const secure = require('./secure');
const response = require("../../../network/response");
const Controller = require("./index");

const router = express.Router();

// Routes
router.get('/', list)
router.get('/:id', get);
router.post('/', upsert);
router.put('/:id', secure('update'), update);
router.delete('/', secure('delete'), remove);

async function list (req, res) {
  try {
    const userList = await Controller.list();
    response.success(req, res, userList, 200);
  } catch (error) {
    response.error(req, res, error.message, 500);
  }
}

async function get(req, res) {
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
};

async function update(req, res) {
  try {
    const { id } = req.params;
    if (!id) {
      response.error(req, res, 'Request error', 400);
      return;
    }
    const editUser = await Controller.update(req.body, id);
    response.success(req, res, editUser, 201);
  } catch (error) {
    response.error(req, res, error.message, 500);
  }
};

async function upsert(req, res) {
  try {
    const { name, username, password } = req.body;
    if (!name || !username || !password) {
      response.error(req, res, 'Request error', 400);
      return;
    }
    const newUser = await Controller.upsert(req.body);
    response.success(req, res, newUser, 201);
  } catch (error) {
    response.error(req, res, error.message, 500);
  }
};

async function remove(req, res) {
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
    response.success(req, res, user, 201);
  } catch (error) {
    response.error(req, res, error.message, 500);
  }
};

module.exports = router;
