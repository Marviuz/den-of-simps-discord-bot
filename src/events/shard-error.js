const { Events } = require('discord.js');
const log = require('../utils/log');

module.exports = {
  name: Events.ShardError,
  execute(error) {
    log.error('A websocket connection encountered an error:', error);
  },
};
