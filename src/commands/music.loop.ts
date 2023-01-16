import { QueueRepeatMode } from 'discord-player';
import { GuildResolvable, Message } from 'discord.js';
import { IClient } from '../../types/client';
import { DANGER, SUCCESS, INFO } from '../constants/colors';

export default {
  legacy: 'loop',
  async execute(message: Message) {
    const queue = (message.client as IClient).player?.getQueue(
      message.guildId as GuildResolvable
    );

    if (!queue)
      return message.channel.send({
        embeds: [{ title: 'No queue', color: DANGER }],
      });

    if (queue.repeatMode === QueueRepeatMode.OFF) {
      queue.setRepeatMode(QueueRepeatMode.QUEUE);
      return message.channel.send({
        embeds: [{ title: 'Repeat mode on!', color: SUCCESS }],
      });
    }

    if (queue.repeatMode === QueueRepeatMode.QUEUE) {
      queue.setRepeatMode(QueueRepeatMode.OFF);
      return message.channel.send({
        embeds: [{ title: 'Repeat mode off!', color: INFO }],
      });
    }

    return message.channel.send({
      embeds: [
        { title: 'Something went wrong setting loop option', color: DANGER },
      ],
    });
  },
};
