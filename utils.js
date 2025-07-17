const fs = require('fs');
const file = './data/users.json';

function loadUsers() {
  if (!fs.existsSync(file)) fs.writeFileSync(file, '{}');
  return JSON.parse(fs.readFileSync(file));
}

function saveUsers(data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

module.exports = { loadUsers, saveUsers };
