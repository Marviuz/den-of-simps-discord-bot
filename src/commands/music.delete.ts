import { GuildResolvable, Message } from 'discord.js';
import { z } from 'zod';
import { IClient } from '../../types/client';
import { DANGER, WARNING } from '../constants/colors';
import musicEmbed from '../embeds/music.embed';

const argumentSchema = z.number().int().min(1);

export default {
  legacy: 'd',
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
    if (!queue)
      return message.channel.send({
        embeds: [{ title: 'No queue', color: DANGER }],
      });
    const removedTrack = queue.remove(_track - 1);

    if (removedTrack) {
      return message.channel.send({
        embeds: [
          musicEmbed(removedTrack, { color: WARNING, label: 'Removed' }),
        ],
      });
    }

    return message.channel.send({
      embeds: [{ title: 'No track removed', color: DANGER }],
    });
  },
};
