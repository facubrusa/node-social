const bcrypt = require('bcrypt');
const auth = require('../../../auth');

const TABLE = 'auth';

module.exports = function (injectedStore) {
  let store = injectedStore;
  if (!store) {
    store = require('../../../store/dummy');
  }

  async function login(username, password) {
    const data = await store.query(TABLE, { username: username });
    if (!data) {
      throw new Error('Request error');
    }
    const isMatch = await bcrypt.compare(password, data.password);
    if (!isMatch) {
      throw new Error('Request error');
    }
    return auth.sign(data);
  }

  async function upsert(data) {
    data.password = await bcrypt.hash(data.password, 10);
    return store.insert(TABLE, data);
  }

  async function remove(id) {
    return store.remove(TABLE, id);
  }

  return { login, upsert, remove };
};
