const { Events } = require('discord.js');
const { PREFIX } = require('../constants/settings');
const log = require('../utils/log');
const { now } = require('../utils/time');

module.exports = {
  name: Events.MessageCreate,
  async execute(message) {
    // if (message.content.startsWith('<@1051849083792396288>')) // TODO: activate command on bot mention
    if (message.author.bot) return; // Do nothing when bot messages
    if (!message.content.startsWith(PREFIX)) return; // Do nothing if it's not a command

    const args = message.content.slice(1).split(' ');
    const command = args.shift().toLowerCase();

    log.info(`> ${now} — Legacy Command **${command}** used by ${message.author.tag}`);

    if (!message.client.legacyCommands[command]) return; // if command is available
    await message.client.legacyCommands[command](message, args);
  },
};
