import { GuildResolvable, Message } from 'discord.js';
import { IClient } from '../../types/client';
import { BLUE, DANGER } from '../constants/colors';
import { z } from 'zod';

const argumentSchema = z.nan().or(z.number().int().min(1));

export default {
  legacy: 'skip',
  async execute(message: Message, [track]: [string]) {
    const _track = parseInt(track);
    const args = argumentSchema.safeParse(_track);

    if (!args.success)
      return message.channel.send({
        embeds: [{ title: args.error.message, color: DANGER }],
      });

    const queue = (message.client as IClient).player?.getQueue(
      message.guildId as GuildResolvable
    );

    if (!isNaN(args.data)) {
      if ((queue?.tracks.length || 0) < args.data)
        return message.channel.send({
          embeds: [{ title: 'Track number not found!', color: DANGER }],
        });
      if (track) return queue?.jump(args.data - 1);
    }

    if (queue?.skip() && !queue?.tracks.length)
      return message.channel.send({
        embeds: [
          {
            title: 'This is the last song!',
            color: BLUE,
          },
        ],
      });
  },
};
