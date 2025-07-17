module.exports = {
    name: 'help',
    execute(message) {
      const isOwner = message.author.id === "YOUR_ID"; // Replace with your ID
  
      let reply = `📖 **Currency Bot Commands**\n\n🧍 **User Commands**:\n`;
      reply += [
        `#daily — Get your daily 100 coins`,
        `#coins — Check your coin balance`,
        `#transfer @user amount — Send coins to another user`,
        `#profile — View your coin stats and status`
      ].join('\n');
  
      if (isOwner) {
        reply += `\n\n🔐 **Admin Commands**:\n`;
        reply += [
          `#add @user amount — Add coins to a user`,
          `#remove @user amount — Remove coins from a user`,
          `#blacklist @user — Prevent a user from using currency commands`,
          `#unblacklist @user — Allow a user to use currency commands again`
        ].join('\n');
      }
  
      message.reply(reply);
    }
  };
  