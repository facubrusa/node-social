require('dotenv').config();

module.exports = {
  api: {
    port: process.env.API_PORT || 3001,
  },
  post: {
    port: process.env.POST_PORT || 3003,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  mysql: {
    host: '0.0.0.0',
    user: 'root',
    password: 'root',
    database: 'node_social',
  },
  mysqlService: {
    host: process.env.MYSQL_SRV_HOST || 'localhost',
    port: process.env.MYSQL_SRV_PORT || 3002,
  }
};
