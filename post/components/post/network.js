const express = require("express");
const response = require("../../../network/response");
const Controller = require("./index");

const router = express.Router();

// Routes
router.get('/', list)
router.get('/:id', get);
router.post('/', upsert);
router.put('/:id', update);
router.delete('/:id', remove);

// Internal functions
async function list (req, res, next) {
  try {
    const posts = await Controller.list();
    response.success(req, res, posts, 200);
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
      return response.error(req, res, 'Post not found', 404);
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
    const user = await Controller.get(id);
    if (!user) {
      return response.error(req, res, 'Post not found', 404);
    }
    const editUser = await Controller.update(req.body, id);
    response.success(req, res, editUser, 201);
  } catch (error) {
    next(error);
  }
};

async function upsert(req, res, next) {
  try {
    const { text, user } = req.body;
    if (!text || !user) {
      return response.error(req, res, 'Request error', 400);
    }
    const userExist = await Controller.getUser('user', user);
    if (!userExist) {
      return response.error(req, res, 'User not found', 404);
    }
    console.log(userExist);
    const newPost = await Controller.upsert(req.body);
    response.success(req, res, newPost, 201);
  } catch (error) {
    next(error);
  }
};

async function remove(req, res, next) {
  try {
    const { id } = req.params;
    if (!id) {
      return response.error(req, res, 'id is required', 400);
    }
    const user = await Controller.get(id);
    if (!user) {
      return response.error(req, res, 'Post not found', 404);
    }
    await Controller.remove(id);
    response.success(req, res, user, 201);
  } catch (error) {
    next(error);
  }
};

module.exports = router;
