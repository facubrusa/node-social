const TABLE = 'user';

module.exports = function(injectedStore) {
    // if the recived store is null, get a common store
    const store = injectedStore ? injectedStore : require('../../../store/dummy');
    function list() {
        return store.list(TABLE);
    }

    function get(id) {
        return store.get(TABLE, id);
    }

    function insert(name) {
        return store.insert(TABLE, name);
    }

    function remove(id) {
        return store.remove(TABLE, id);
    }

    return {
        list,
        get,
        insert,
        remove,
    };
};