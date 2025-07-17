const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

// Create a new client instance with intents
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent, 
  ],
});

// Command prefix
const prefix = '#';

// Dynamically load all command files
client.commands = new Map();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(path.join(commandsPath, file));
  
  // Add the main command
  client.commands.set(command.name, command);
  
  // Add all aliases
  if (command.aliases && Array.isArray(command.aliases)) {
    command.aliases.forEach(alias => {
      client.commands.set(alias, command);
    });
  }
}

// When the bot is ready
client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// When a message is received
client.on('messageCreate', async (message) => {
  // Ignore messages from the bot or without prefix
  if (message.author.bot || !message.content.startsWith(prefix)) return;

  // Parse the command and arguments
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  // Get the command from the map or by alias
  const command = client.commands.get(commandName);
  if (!command) return;

  try {
    // Execute the command
    await command.execute(message, args);
  } catch (error) {
    console.error(`Error executing command ${commandName}:`, error);
    
    const errorEmbed = new EmbedBuilder()
      .setColor('#FF0000')
      .setTitle('Command Error')
      .setDescription('There was an error trying to execute that command!')
      .setFooter({ text: `Command: ${commandName}` });
    
    await message.reply({ embeds: [errorEmbed] });
  }
});

// Login to Discord with your app's token
client.login('your-discord-bot-token');