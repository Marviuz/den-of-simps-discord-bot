const { BLUE, DANGER } = require('../constants/colors');

module.exports = {
  legacy: 'skip',
  async execute(message, [track]) {
    const queue = message.client.player.getQueue(message.guildId);

    if (!isNaN(track)) {
      if (queue.tracks.length < track) return message.channel.send({ embeds: [{ title: 'Track number not found!', color: DANGER }] }); // Fix this shit
      if (track) return queue.jump(Number(track) - 1);
    }

    if (!queue.skip()) {
      return message.channel.send({
        embeds: [{
          title: 'This is the last song!',
          color: BLUE,
        }],
      });
    }
  },
};
