const fs = require('fs');
const path = 'items.json';

const getItems = async () => {
  if (!fs.existsSync(path)) {
    await fs.writeFile(path, '{ "items": [] }', 'utf-8', (err) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
    });
  }
  await fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      console.error(err.message);
      process.exit(1);
    } else {
      const items = JSON.parse(data).items;
      return items;
    }
  });
};

global.items = Array.from(getItems());

module.exports = items;
