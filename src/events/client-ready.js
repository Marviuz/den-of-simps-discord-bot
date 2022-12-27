const { Events } = require('discord.js');
const log = require('../utils/log');

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(client) {
    log.success(`${client.user.tag} ready!`);
  },
};
