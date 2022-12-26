const { Player } = require('discord-player');
const { SUCCESS, BLUE, DANGER } = require('../constants/colors');
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
  _player.once('trackAdd', (queue) => {
    if (!queue.playing) queue.play();
  });
  _player.on('error', (queue, error) => queue.metadata.channel.send({
    embeds: [{ title: 'Something went wrong!', color: DANGER, description: error.message }],
  }));
  _player.on('connectionError', (queue, error) => queue.metadata.channel.send({
    embeds: [{ title: 'Connection error!', color: DANGER, description: error.message }],
  }));
  _player.on('botDisconnect', () => {
    delete client.player;
  });

  return _player;
};
