const { SUCCESS, BLUE, DANGER } = require('../constants/colors');
const musicEmbed = require('../embeds/music.embed');

module.exports = {
  legacy: 'q',
  async execute(message) {
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
        {
          title: message.guild.name,
          description: 'Queue',
          fields: [{ name: `${queue.tracks.length} tracks`, value: tracks }],
          color: BLUE,
        },
      ],
    });
  },
};
