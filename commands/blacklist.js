const { loadUsers, saveUsers } = require('../utils.js');

module.exports = {
  name: 'blacklist',
  execute(message) {
    if (message.author.id !== "YOUR_ID") return;

    const target = message.mentions.users.first();
    if (!target) return message.reply("❌ Usage: `#blacklist @user`");

    const users = loadUsers();
    users[target.id] ??= { coins: 0, lastDaily: 0, blacklist: false };
    users[target.id].blacklist = true;
    saveUsers(users);

    message.reply(`🚫 <@${target.id}> has been blacklisted.`);
  }
};
