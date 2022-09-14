require('dotenv').config();

module.exports = {
  api: {
    port: 3001,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  }
};
