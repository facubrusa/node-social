const { nanoid } = require('nanoid');
const auth = require('../auth');

const TABLA = 'user';

module.exports = function (injectedStore) {
  let store = injectedStore;
  if (!store) {
    store = require('../../../store/dummy');
  }

  function list() {
    return store.list(TABLA);
  }

  function get(id) {
    return store.get(TABLA, id);
  }

  async function update(body, id) {
    const { name } = body;
    // We can just edit the name
    const editUser = {
      id,
      name,
    };

    return store.update(TABLA, editUser);
  }

  async function upsert(body) {
    const { name, username, password } = body;
    const id = nanoid();
    const user = {
      id,
      name,
      username,
    };

    await auth.upsert({
      id,
      username,
      password,
    });

    return store.upsert(TABLA, user);
  }

  return {
    list,
    get,
    upsert,
    update,
  };
};
