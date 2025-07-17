const { loadUsers, saveUsers } = require('../utils.js');

module.exports = {
  name: 'remove',
  execute(message, args) {
    if (message.author.id !== "YOUR_ID") return;

    const target = message.mentions.users.first();
    const amount = parseInt(args[1]);
    if (!target || isNaN(amount)) return message.reply("❌ Usage: `#remove @user amount`");

    const users = loadUsers();
    users[target.id] ??= { coins: 0, lastDaily: 0, blacklist: false };
    users[target.id].coins = Math.max(0, users[target.id].coins - amount);
    saveUsers(users);

    message.reply(`🗑️ Removed **${amount}** coins from <@${target.id}>.`);
  }
};
