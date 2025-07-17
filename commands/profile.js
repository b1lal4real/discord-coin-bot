const { loadUsers } = require('../utils.js');
const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'profile',
  execute(message) {
    const users = loadUsers();
    const id = message.author.id;
    users[id] ??= { coins: 0, lastDaily: 0, blacklist: false };

    const coins = users[id].coins;
    const lastDaily = new Date(users[id].lastDaily).toLocaleString();
    const blacklist = users[id].blacklist ? "🚫 Yes" : "✅ No";

    const embed = new EmbedBuilder()
      .setTitle(`${message.author.username}'s Profile`)
      .setColor(users[id].blacklist ? 0xFF0000 : 0x00FF00)
      .addFields(
        { name: "💰 Coins", value: `${coins}`, inline: true },
        { name: "📅 Last Daily", value: lastDaily, inline: true },
        { name: "🚫 Blacklisted", value: blacklist, inline: true }
      )
      .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
      .setFooter({ text: `User ID: ${id}` });

    message.reply({ embeds: [embed] });
  }
};
