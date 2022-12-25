const { QueueRepeatMode } = require('discord-player');
const { DANGER, SUCCESS, INFO } = require('../constants/colors');

module.exports = {
  legacy: 'loop',
  async execute(message) {
    const queue = message.client.player.getQueue(message.guildId);
    if (!queue) return message.channel.send({ embeds: [{ title: 'No queue', color: DANGER }] });

    if (queue.repeatMode === QueueRepeatMode.OFF) {
      queue.setRepeatMode(QueueRepeatMode.QUEUE);
      return message.channel.send({ embeds: [{ title: 'Repeat mode on!', color: SUCCESS }] });
    }

    if (queue.repeatMode === QueueRepeatMode.QUEUE) {
      queue.setRepeatMode(QueueRepeatMode.OFF);
      return message.channel.send({ embeds: [{ title: 'Repeat mode off!', color: INFO }] });
    }

    return message.channel.send({ embeds: [{ title: 'Something went wrong setting loop option', color: DANGER }] });
  },
};
