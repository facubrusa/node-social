const express = require("express");
const secure = require('./secure');
const response = require("../../../network/response");
const Controller = require("./index");

const router = express.Router();

// Routes
router.get('/', list)
router.get('/:id', get);
router.post('/', upsert);
router.post('/follow/:id', secure('follow'), follow);
router.put('/:id', secure('update'), update);
router.delete('/:id', secure('delete'), remove);

// Internal functions
async function list (req, res, next) {
  try {
    const userList = await Controller.list();
    response.success(req, res, userList, 200);
  } catch (error) {
    next(error);
  }
}

async function get(req, res, next) {
  try {
    const { id } = req.params;
    if (!id) {
      return response.error(req, res, 'id is required', 400);
    }
    const user = await Controller.get(id);
    if (!user) {
      return response.error(req, res, 'User not found', 404);
    }
    response.success(req, res, user, 200);
  } catch (error) {
    next(error);
  }
};

async function update(req, res, next) {
  try {
    const { id } = req.params;
    if (!id) {
      return response.error(req, res, 'Request error', 400);
    }
    const editUser = await Controller.update(req.body, id);
    response.success(req, res, editUser, 201);
  } catch (error) {
    next(error);
  }
};

async function upsert(req, res, next) {
  try {
    const { name, username, password } = req.body;
    if (!name || !username || !password) {
      return response.error(req, res, 'Request error', 400);
    }
    const newUser = await Controller.upsert(req.body);
    response.success(req, res, newUser, 201);
  } catch (error) {
    next(error);
  }
};

async function follow(req, res, next) {
  try {
    const { id } = req.params;
    if (!id) {
      return response.error(req, res, 'Request error', 400);
    }
    if (req.user.id === id) {
      return response.error(req, res, 'User cannot follow himself', 400);
    }

    const userTo = await Controller.get(id);
    if (!userTo) {
      return response.error(req, res, 'User not found', 404);
    }

    const newFollow = await Controller.follow(req.user.id, id);
    response.success(req, res, newFollow, 201);
  } catch (error) {
    next(error);
  }
}

async function remove(req, res, next) {
  try {
    const { id } = req.params;
    if (!id) {
      return response.error(req, res, 'id is required', 400);
    }
    const user = await Controller.get(id);
    if (!user) {
      return response.error(req, res, 'User not found', 404);
    }
    await Controller.remove(id);
    response.success(req, res, user, 201);
  } catch (error) {
    next(error);
  }
};

module.exports = router;
