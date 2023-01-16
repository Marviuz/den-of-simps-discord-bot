import { Player } from 'discord-player';
import { Client } from 'discord.js';
import { IClient } from '../../types/client';
import { SUCCESS, BLUE, DANGER } from '../constants/colors';
import musicEmbed from '../embeds/music.embed';
import log from '../utils/log';

interface IQueueMetadata {
  [k: string]: any;
}

export default (client: Client) => {
  const _player = new Player(client, {
    ytdlOptions: {
      filter: 'audioonly',
      quality: 'highestaudio',
      highWaterMark: 1 << 25,
    },
  });

  _player.on('trackStart', (queue, track) =>
    (queue.metadata as IQueueMetadata).channel.send({
      embeds: [musicEmbed(track, { label: 'Now Playing', color: SUCCESS })],
    })
  );
  _player.on('trackAdd', (queue, track) =>
    (queue.metadata as IQueueMetadata).channel.send({
      embeds: [musicEmbed(track, { label: 'Queued', color: BLUE })],
    })
  );
  _player.once('trackAdd', (queue) => {
    if (!queue.playing) queue.play();
  });
  _player.on('error', (queue, error) => {
    log.info(`${error.message}`, error);

    (queue.metadata as IQueueMetadata).channel.send({
      embeds: [
        {
          title: 'Something went wrong!',
          color: DANGER,
          description: error.message,
        },
      ],
    });
  });
  _player.on('connectionError', (queue, error) => {
    log.info(`${error.message}`, error);

    (queue.metadata as IQueueMetadata).channel.send({
      embeds: [
        {
          title: 'Connection error!',
          color: DANGER,
          description: error.message,
        },
      ],
    });
  });
  _player.on('botDisconnect', () => {
    log.info(`${client.user?.tag} disconnected from the VC`);
    delete (client as IClient).player;
  });

  return _player;
};
