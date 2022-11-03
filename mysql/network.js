const express = require("express");
const response = require("../network/response");
const Store = require("../store/db");

const router = express.Router();

// Routes
router.get('/:table', list)
router.get('/:table/:id', get);
router.post('/:table', upsert);
router.put('/:table/:id', update);
router.delete('/:table/:id', remove);

// Internal functions
async function list (req, res, next) {
  try {
    const { table } = req.params;
    if (!table) {
      return response.error(req, res, 'table is required', 400);
    }
    const data = await Store.list(table);
    response.success(req, res, data, 200);
  } catch (error) {
    next(error);
  }
}

async function get(req, res, next) {
  try {
    const { table, id } = req.params;
    if (!table || !id) {
      return response.error(req, res, 'table and id are required', 400);
    }
    const data = await Store.get(table, id);
    response.success(req, res, data, 200);
  } catch (error) {
    next(error);
  }
};

async function upsert(req, res, next) {
  try {
    const { table } = req.params;
    if (!table) {
      return response.error(req, res, 'table is required', 400);
    }
    const data = await Store.insert(table, req.body);
    response.success(req, res, data, 201);
  } catch (error) {
    next(error);
  }
};

async function update(req, res, next) {
  try {
    const { table, id } = req.params;
    if (!table || !id) {
      return response.error(req, res, 'table and id are required', 400);
    }
    const data = await Store.get(table, id);
    if (!data) {
      return response.error(req, res, 'No data related to that id was found', 400);
    }
    const editedData = await Store.update(table, req.body);
    response.success(req, res, editedData, 201);
  } catch (error) {
    next(error);
  }
};

async function remove(req, res, next) {
  try {
    const { table, id } = req.params;
    if (!table || !id) {
      return response.error(req, res, 'table and id are required', 400);
    }
    const data = await Store.get(table, id);
    if (!data) {
      return response.error(req, res, 'No data related to that id was found', 400);
    }
    await Store.remove(table, id);
    response.success(req, res, [], 201);
  } catch (error) {
    next(error);
  }
};

module.exports = router;
