const axios = require('axios');

function createRemoteDB (host, port) {
  const requestDB = axios.create({
    baseURL: `http://${host}:${port}`,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  });

  async function request({method, url, data}) {
    const reponse = await requestDB({
      method: method,
      url: url,
      data: data
    });
    return reponse.data.body;
  }

  function list(table) {
    return request({
      method: 'GET',
      url: `/${table}`,
    });
  }

  function get(tabla, id) {
    return request({
      method: 'GET',
      url: `/${tabla}/${id}`,
    });
  }

  function query(tabla, query, join = '') {
    return request({
      method: 'GET',
      url: `/query/${tabla}`,
      data: {
        "query": query,
        "join": join
      }
    });
  }

  function insert(table, data) {
    return request({
      method: 'POST',
      url: `/${table}`,
      data
    });
  }

  function update(table, id, data) {
    return request({
      method: 'PUT',
      url: `/${table}/${id}`,
      data
    });
  }

  async function upsert(tabla, data) {
    return request({
      method: 'PUT',
      url: `upsert/${tabla}`,
      data
    });
  }

  async function remove(tabla, id) {
    const deleted = request({
      method: 'DELETE',
      url: `/${tabla}/${id}`
    });
    return deleted;
  }

  return {
    list,
    get,
    query,
    insert,
    update,
    upsert,
    remove,
  };
}

module.exports = createRemoteDB;
