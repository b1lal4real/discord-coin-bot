const { loadUsers, saveUsers } = require('../utils.js');

module.exports = {
  name: 'unblacklist',
  execute(message) {
    if (message.author.id !== "YOUR_ID") return;

    const target = message.mentions.users.first();
    if (!target) return message.reply("❌ Usage: `#unblacklist @user`");

    const users = loadUsers();
    users[target.id] ??= { coins: 0, lastDaily: 0, blacklist: false };
    users[target.id].blacklist = false;
    saveUsers(users);

    message.reply(`✅ <@${target.id}> has been unblacklisted.`);
  }
};
