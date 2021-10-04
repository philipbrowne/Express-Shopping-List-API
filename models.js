const items = require('./fakeDb');
const fs = require('fs');

class Item {
  constructor(name, price) {
    this.name = name;
    this.price = price;
    items.push(this);
    fs.writeFile('items.json', JSON.stringify(items), 'utf-8', (err) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
    });
  }
  static findAll() {
    return items;
  }
  static find(name) {
    const foundItem = items.find((item) => item.name == name);
    return foundItem;
  }
  static update(name, newName, newPrice) {
    const foundItem = Item.find(name);
    if (!foundItem) return undefined;
    foundItem.name = newName;
    foundItem.price = newPrice;
    fs.writeFile('items.json', JSON.stringify(items), 'utf-8', (err) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
    });
    return foundItem;
  }
  static delete(name) {
    const foundItem = Item.find(name);
    if (!foundItem) return undefined;
    items.splice(foundItem, 1);
    fs.writeFile('items.json', JSON.stringify(items), 'utf-8', (err) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
    });
    return { message: 'Deleted' };
  }
}

module.exports = Item;
