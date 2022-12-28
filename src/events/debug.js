const { Events } = require('discord.js');
const log = require('../utils/log');

module.exports = {
  name: Events.Debug,
  execute(info) {
    log(info);
  },
};
