const path = require('path');

const paths = {
  supplies: path.join(__dirname, '../data/supplies.json'),
  menu: path.join(__dirname, '../data/menu.json'),
  recipes: path.join(__dirname, '../data/recipes.json'),
  dailySales: path.join(__dirname, '../data/dailySales.json'),
  clients: path.join(__dirname, '../data/clients.json'),
  sales: path.join(__dirname, '../data/sales.json'),
};
module.exports = { paths, CHANNEL: 'handleLists' };
