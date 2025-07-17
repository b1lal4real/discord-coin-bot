const { loadUsers, saveUsers } = require('../utils.js');

module.exports = {
  name: 'transfer',
  execute(message, args) {
    const sender = message.author;
    const target = message.mentions.users.first();
    const amount = parseInt(args[1]);

    if (!target || isNaN(amount) || amount <= 0)
      return message.reply("❌ Usage: `#transfer @user amount`");
    if (target.id === sender.id) return message.reply("❌ You can't transfer coins to yourself.");

    const users = loadUsers();
    users[sender.id] ??= { coins: 0, lastDaily: 0, blacklist: false };
    users[target.id] ??= { coins: 0, lastDaily: 0, blacklist: false };

    if (users[sender.id].blacklist || users[target.id].blacklist)
      return message.reply("🚫 One of the users is blacklisted. Transfer not allowed.");

    if (users[sender.id].coins < amount)
      return message.reply("💸 You don't have enough coins.");

    users[sender.id].coins -= amount;
    users[target.id].coins += amount;
    saveUsers(users);

    message.reply(`✅ You transferred **${amount}** coins to <@${target.id}>.`);
  }
};
