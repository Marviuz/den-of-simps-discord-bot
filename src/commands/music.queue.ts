import { GuildResolvable, Message } from 'discord.js';
import { IClient } from '../../types/client';
import { SUCCESS, DANGER } from '../constants/colors';
import musicQueueEmbed from '../embeds/music-queue.embed';
import musicEmbed from '../embeds/music.embed';

export default {
  legacy: 'q',
  async execute(message: Message) {
    const client = message.client as IClient;
    if (!client.player)
      return message.channel.send({
        embeds: [{ title: 'No active queue!', color: DANGER }],
      });
    const queue = client.player.getQueue(message.guildId as GuildResolvable);

    if (!queue) {
      return message.channel.send({
        embeds: [
          {
            title: 'No Queue',
            color: DANGER,
          },
        ],
      });
    }

    const tracks =
      queue.tracks && queue.tracks.length
        ? queue.tracks
            .map(
              (_, i) =>
                `${i + 1}. ${_.title} **Requested by: ${_.requestedBy.tag}**`
            )
            .join('\n')
        : 'No tracks left';

    return message.channel.send({
      embeds: [
        musicEmbed(queue.nowPlaying(), {
          color: SUCCESS,
          label: 'Now Playing',
        }),
        musicQueueEmbed(
          { title: message.guild?.name ?? 'title' },
          { queue, tracks }
        ),
      ],
    });
  },
};
