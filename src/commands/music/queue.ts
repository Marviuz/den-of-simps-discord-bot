import { GuildResolvable } from 'discord.js';

import { MusicGeneric, MusicNowPlaying, MusicQueue } from '@/embeds/MusicReply';
import { Command } from '@/lib/Command';
import { RED } from '@/constants/theme';

export default new Command({
  name: 'queue',
  description: 'view song queues',
  run: async ({ interaction, client }) => {
    if (!interaction.isChatInputCommand()) return;

    // Guard: must be in VC
    if (!interaction.member.voice.channel)
      return await interaction.reply({
        embeds: [MusicGeneric('You are not in my voice channel!', RED)],
      });

    const queue = client.player.queues.get(
      interaction.guildId as GuildResolvable
    );

    if (!queue)
      return await interaction.reply({
        embeds: [MusicGeneric('There is no queue', RED)],
      });

    if (queue.currentTrack) {
      return await interaction.reply({
        embeds: [
          MusicNowPlaying(queue.currentTrack),
          MusicQueue(queue.tracks.toArray()),
        ],
      });
    }
  },
});
