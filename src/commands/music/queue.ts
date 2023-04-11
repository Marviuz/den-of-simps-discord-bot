import { GuildResolvable } from 'discord.js';

import { MusicNowPlaying, MusicQueue } from '@/embeds/MusicReply';
import { Command } from '@/lib/Command';

export default new Command({
  name: 'queue',
  description: 'view song queues',
  run: async ({ interaction, client }) => {
    if (!interaction.isChatInputCommand()) return;

    const queue = client.player.queues.get(
      interaction.guildId as GuildResolvable
    );

    if (queue && queue.currentTrack) {
      try {
        return await interaction.reply({
          embeds: [
            MusicNowPlaying(queue.currentTrack),
            MusicQueue(queue.tracks.toArray()),
          ],
        });
      } catch (error) {
        // TODO: notify
        if (error instanceof Error) {
          if (!interaction.deferred) {
            return await interaction.reply(error.message);
          }

          return await interaction.followUp(error.message);
        }

        throw new Error('Unknown error occured');
      }
    }

    return await interaction.reply('No queue');
  },
});
