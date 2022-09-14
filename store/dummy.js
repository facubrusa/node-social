const db = {
  user: [{ id: '1', name: 'El pana Carlos', username: 'carlos' }],
};

async function list(tabla) {
  return db[tabla] || [];
}

async function get(tabla, id) {
  let col = await list(tabla);
  return col.filter((item) => item.id === id)[0] || null;
}

function upsert(tabla, data) {
  if (!db[tabla]) db[tabla] = [];
  db[tabla].push(data);
  return data;
}

async function update(tabla, data) {
  const { id } = data;
  if (!id) {
    throw new Error('Error getting id');
  }
  const col = await get(tabla, id);
  if (!col) {
    throw new Error('Error getting information');
  }

  const colKeys = Object.keys(col);
  const dataKeys = Object.keys(data);

  if (dataKeys.length > 0) {
    dataKeys.forEach(key => {
      // Validate if the key exist before update object
      if (colKeys.includes(key)) col[key] = data[key];
    })
  }
}

function remove(tabla, id) {
  return true;
}

async function query(tabla, q) {
  let col = await list(tabla);
  let keys = Object.keys(q);
  let key = keys[0];

  return col.filter(item => item[key] === q[key])[0] || null;
}


module.exports = {
  list,
  get,
  upsert,
  update,
  remove,
  query
};
