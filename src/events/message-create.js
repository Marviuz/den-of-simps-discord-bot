const { Events } = require('discord.js');
const { PREFIX } = require('../constants/settings');

module.exports = {
  name: Events.MessageCreate,
  async execute(message) {
    if (message.author.bot) return; // Do nothing when bot messages
    if (!message.content.startsWith(PREFIX)) return; // Do nothing if it's not a command

    const args = message.content.slice(1).split(' ');
    const command = args.shift().toLowerCase();

    if (!message.client.legacyCommands[command]) return; // if command is available
    message.client.legacyCommands[command](message, args);
  },
};
