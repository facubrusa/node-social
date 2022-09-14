const jwt = require('jsonwebtoken');
const config = require('../config');
const error = require('../utils/error');
const secret = config.jwt.secret;

function sign(data) {
  console.log(config.jwt);
  return jwt.sign(data, secret);
}

function verify(token) {
  return jwt.verify(token, secret);
}

const check = {
  own: function (req, userId) {
    const decoded = decodeHeader(req);
    if (decoded.id !== userId) {
      throw error('Forbidden request', 403);
    }
    req.user = decoded;
    return decoded;
  },
};

function getToken(auth) {
  if (auth.indexOf('Bearer ') === -1) {
    throw error('Invalid token format', 400);
  }
  let token = auth.replace('Bearer ', '');
  return token;
}

function decodeHeader(req) {
  const authorization = req.headers.authorization;
  if (!authorization) {
    throw error('Invalid token', 400);
  }
  const token = getToken(authorization);
  const decoded = verify(token);
  req.user = decoded;
  return decoded;
}

module.exports = { sign, check };
