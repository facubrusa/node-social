const { nanoid } = require('nanoid');
const auth = require('../auth');

const TABLE = 'user';

module.exports = function (injectedStore) {
  let store = injectedStore;
  if (!store) {
    store = require('../../../store/dummy');
  }

  async function list() {
    return await store.list(TABLE);
  }

  async function get(id) {
    const result = await store.get(TABLE, id);
    return result.length === 0 ? null : result[0];
  }

  async function update(body, id) {
    const { name } = body;
    // We can just edit the name
    const editUser = {
      id,
      name,
    };

    return store.update(TABLE, editUser);
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

    return store.insert(TABLE, user);
  }

  async function remove(id) {
    await auth.remove(id);

    return await store.remove(TABLE, id);
  }

  async function follow(from, to) {
    const data = {
      user_from: from,
      user_to: to
    };
    console.log(data);
    return await store.insert(TABLE + '_follow', data);
  }

  return {
    list,
    get,
    upsert,
    update,
    remove,
    follow
  };
};
