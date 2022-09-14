const auth = require('../../../auth');

module.exports = function checkAuth(action) {
  function authMiddleware(req, res, next) {
    switch (action) {
      case 'update':
        const { id } = req.params;
        if (!id) throw new Error('Request error');
        auth.check.own(req, id);
        next();
        break;
      default:
        next();
    }
  }

  return authMiddleware;
};
