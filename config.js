require('dotenv').config();

module.exports = {
  api: {
    port: 3001,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  mysql: {
    host: '0.0.0.0',
    user: 'root',
    password: '20Nexo20',
    database: 'node_social',
  }
};
