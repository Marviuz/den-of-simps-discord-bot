const { Events } = require('discord.js');
const { WHAT_: WHAT, YES_ } = require('../constants/emotes');
const { PREFIX } = require('../constants/settings');
const log = require('../utils/log');

module.exports = {
  name: Events.MessageCreate,
  async execute(message) {
    const self = message.client.user.toString();

    if (message.author.bot) return; // Do nothing when bot messages
    if (!(message.content.startsWith(PREFIX) || message.content.startsWith(self))) return; // Do nothing if it's not a command

    const args = message.content.split(' ');
    const command = message.content.startsWith(PREFIX) ? args.shift().toLowerCase().slice(1) : args.splice(0, 2).pop();

    if (command === self && message.author !== await message.client.users.fetch(process.env.DISCORD_BOT_CREATOR)) return message.reply(WHAT);
    if (command === self) return message.reply(YES_);

    if (!message.client.legacyCommands[command]) return; // if command is available
    log.info(`Legacy Command **${command}** used by ${message.author.tag}`);
    message.client.legacyCommands[command](message, args);
  },
};
