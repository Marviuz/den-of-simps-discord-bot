const { Player } = require('discord-player');
const { SUCCESS, BLUE } = require('../constants/colors');
const musicEmbed = require('../embeds/music.embed');

module.exports = (client) => {
  const _player = new Player(client, {
    ytdlOptions: {
      filter: 'audioonly',
      quality: 'highestaudio',
      highWaterMark: 1 << 25,
    },
  });

  _player.on('trackStart', (queue, track) => queue.metadata.channel.send({
    embeds: [musicEmbed(track, { label: 'Now Playing', color: SUCCESS })],
  }));
  _player.on('trackAdd', (queue, track) => queue.metadata.channel.send({
    embeds: [musicEmbed(track, { label: 'Queued', color: BLUE })],
  }));

  return _player;
};
