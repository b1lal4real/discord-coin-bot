const { loadUsers, saveUsers } = require('../utils.js');

module.exports = {
  name: 'daily',
  execute(message) {
    const users = loadUsers();
    const id = message.author.id;

    users[id] ??= { coins: 0, lastDaily: 0, blacklist: false };
    if (users[id].blacklist) return message.reply("🚫 You are blacklisted from the currency system.");

    const now = Date.now();
    if (now - users[id].lastDaily < 86400000)
      return message.reply("⏳ You've already claimed your daily coins today.");

    users[id].coins += 100;
    users[id].lastDaily = now;
    saveUsers(users);

    message.reply("✅ You received **100** daily coins!");
  }
};
