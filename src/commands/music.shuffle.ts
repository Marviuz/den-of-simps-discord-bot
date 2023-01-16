import { GuildResolvable, Message } from 'discord.js';
import { IClient } from '../../types/client';
import { DANGER, BLUE } from '../constants/colors';

export default {
  legacy: 'shuffle',
  async execute(message: Message) {
    const queue = (message.client as IClient).player?.getQueue(
      message.guildId as GuildResolvable
    );
    if (!queue)
      return message.channel.send({
        embeds: [{ title: 'No queue', color: DANGER }],
      });
    const isShuffled = queue.shuffle();
    if (isShuffled)
      return message.channel.send({
        embeds: [{ title: 'Queue is shuffled', color: BLUE }],
      });
    message.channel.send({
      embeds: [{ title: 'Something went wrong on shuffling', color: DANGER }],
    });
  },
};
