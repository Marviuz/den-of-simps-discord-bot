const { DANGER, BLUE } = require('../constants/colors');

module.exports = {
  legacy: 'shuffle',
  async execute(message) {
    const queue = message.client.player.getQueue(message.guildId);
    if (!queue) return message.channel.send({ embeds: [{ title: 'No queue', color: DANGER }] });
    const isShuffled = queue.shuffle();
    if (isShuffled) return message.channel.send({ embeds: [{ title: 'Queue is shuffled', color: BLUE }] });
    message.channel.send({ embeds: [{ title: 'Something went wrong on shuffling', color: DANGER }] });
  },
};
