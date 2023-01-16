import { GuildResolvable, Message } from 'discord.js';
import { IClient } from '../../types/client';
import { BLUE, DANGER } from '../constants/colors';
import { z } from 'zod';

const argumentSchema = z.number().int().min(1);

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

    if (!queue?.skip()) {
      return message.channel.send({
        embeds: [
          {
            title: 'This is the last song!',
            color: BLUE,
          },
        ],
      });
    }
  },
};
