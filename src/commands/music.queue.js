const { SUCCESS, DANGER } = require('../constants/colors');
const musicQueueEmbed = require('../embeds/music-queue.embed');
const musicEmbed = require('../embeds/music.embed');

module.exports = {
  legacy: 'q',
  async execute(message) {
    if (!message.client.player) return message.channel.send({ embeds: [{ title: 'No active queue!', color: DANGER }] });
    const queue = message.client.player.getQueue(message.guildId);

    if (!queue) {
      return message.channel.send({
        embeds: [{
          title: 'No Queue',
          color: DANGER,
        }],
      });
    }

    const tracks = queue.tracks && queue.tracks.length ? queue.tracks.map((_, i) => `${i + 1}. ${_.title} **Requested by: ${_.requestedBy.tag}**`).join('\n') : 'No tracks left';

    return message.channel.send({
      embeds: [
        musicEmbed(queue.nowPlaying(), { color: SUCCESS, label: 'Now Playing' }),
        musicQueueEmbed({ title: message.guild.name }, { queue, tracks }),
      ],
    });
  },
};
