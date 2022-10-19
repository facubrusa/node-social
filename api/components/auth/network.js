const express = require('express');

const response = require('../../../network/response');
const Controller = require('./index');

const router = express.Router();

router.post('/login', async function (req, res) {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return response.error(req, res, 'Request error', 400);
    }
    const token = await Controller.login(username, password);
    response.success(req, res, token, 200);
  } catch (error) {
    console.log(error);
    response.error(req, res, error.message, 500);
  }
});

module.exports = router;
