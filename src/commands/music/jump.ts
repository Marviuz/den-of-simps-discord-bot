import { ApplicationCommandOptionType } from 'discord.js';

import { Command } from '@/lib/Command';
import replyCatcher from '@/utils/replyCatcher';
import { MusicGeneric } from '@/embeds/MusicReply';
import { INFO, RED } from '@/constants/theme';

enum CommandOptions {
  TrackNumber = 'track_number',
}

export default new Command({
  name: 'jump',
  description: 'Jump to a song',
  options: [
    {
      name: CommandOptions.TrackNumber,
      description: 'Skips to this track number',
      type: ApplicationCommandOptionType.Number,
      required: true,
    },
  ],
  run: async ({ args, interaction, client }) => {
    const trackNumber = args.getNumber(CommandOptions.TrackNumber)!;

    const queue = client.player.queues.get(interaction.guildId!);
    const tracks = queue?.tracks;

    try {
      if (!interaction.member.voice.channel)
        return await interaction.reply({
          embeds: [MusicGeneric('You are not in my voice channel!', RED)],
        });

      const track = tracks?.toArray()[trackNumber - 1];

      if (track) {
        queue?.node.skipTo(track);

        return await interaction.reply({
          embeds: [MusicGeneric(`Jumping to ${track.title}`, INFO)],
          ephemeral: true,
        });
      }

      return await interaction.reply({
        embeds: [MusicGeneric('Invalid track number!', RED)],
        ephemeral: true,
      });
    } catch (error) {
      return await replyCatcher(interaction, error);
    }
  },
});
