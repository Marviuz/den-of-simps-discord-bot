const { DANGER, WARNING } = require('../constants/colors');
const musicEmbed = require('../embeds/music.embed');

module.exports = {
  legacy: 'd',
  async execute(message, [track]) {
    track = Number(track);

    if (!track) return message.channel.send({ embeds: [{ title: 'No track removed', color: DANGER }] });
    if (track < 0) return message.channel.send({ embeds: [{ title: 'No track removed', color: DANGER }] });

    const queue = message.client.player.getQueue(message.guildId);
    if (!queue) return message.channel.send({ embeds: [{ title: 'No queue', color: DANGER }] });
    const removedTrack = queue.remove(track - 1);

    if (removedTrack) {
      return message.channel.send({
        embeds: [musicEmbed(removedTrack, { color: WARNING, label: 'Removed' })],
      });
    }

    return message.channel.send({ embeds: [{ title: 'No track removed', color: DANGER }] });
  },
};
