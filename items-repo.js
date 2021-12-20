const fs = require("fs");

// items in JSON file for simplicity, store in a db for production applications
let items = require("./data/items.json");

export const itemsRepo = {
    getAll: () => items,
    getById: (id) => items.find((x) => x.id === id),
    find: (x) => items.find(x),
    create,
    update,
    delete: _delete,
};

function create(item) {
    // generate new item id
    item.id = Math.random().toString().replace(".", "");

    // set date created and updated
    // item.dateCreated = new Date().toISOString();
    // item.dateUpdated = new Date().toISOString();

    // add and save item
    items.push(item);
    saveData();
    return item;
}

function update(id, params) {
    const item = items.find((x) => x.id.toString() === id.toString());

    // set date updated
    item.dateUpdated = new Date().toISOString();

    // update and save
    Object.assign(item, params);
    saveData();
}

// prefixed with underscore '_' because 'delete' is a reserved word in javascript
function _delete(id) {
    // filter out deleted item and save
    items = items.filter((x) => x.id.toString() !== id.toString());
    saveData();
}

// private helper functions

function saveData() {
    fs.writeFileSync("data/items.json", JSON.stringify(items, null, 4));
}
