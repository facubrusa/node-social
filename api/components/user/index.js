const store = require('../../../store/db');
const controller = require('./controller');

module.exports = controller(store);
