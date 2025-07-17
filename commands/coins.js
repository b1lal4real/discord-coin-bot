const { loadUsers } = require('../utils.js');

module.exports = {
  name: 'coins',
  execute(message) {
    const users = loadUsers();
    const id = message.author.id;

    users[id] ??= { coins: 0, lastDaily: 0, blacklist: false };
    if (users[id].blacklist) return message.reply("🚫 You are blacklisted from the currency system.");

    message.reply(`💰 You have **${users[id].coins}** coins.`);
  }
};
