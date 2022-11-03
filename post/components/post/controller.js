const { nanoid } = require('nanoid');

const TABLE = 'post';

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
    const editPost = {
      id,
      name,
    };

    return store.update(TABLE, editPost);
  }

  async function upsert(body) {
    const { text, user } = body;
    const id = nanoid();
    const data = {
      id,
      text,
      user
    };

    return store.insert(TABLE, data);
  }

  async function remove(id) {
    return await store.remove(TABLE, id);
  }

  async function getUser(table, id) {
    const result = await store.get(table, id);
    return result.length === 0 ? null : result[0];
  }

  return {
    list,
    get,
    upsert,
    update,
    remove,
    getUser
  };
};
