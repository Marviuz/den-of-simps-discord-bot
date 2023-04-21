import { ApplicationCommandOptionType } from 'discord.js';

import { Command } from '@/lib/Command';
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
    // Guard: must be in VC
    if (!interaction.member.voice.channel)
      return await interaction.reply({
        embeds: [MusicGeneric('You are not in my voice channel!', RED)],
      });

    const trackNumber = args.getNumber(CommandOptions.TrackNumber)!;

    const queue = client.player.queues.get(interaction.guildId!);

    if (!queue)
      return await interaction.reply({
        embeds: [MusicGeneric('There is no queue', RED)],
      });

    if (!interaction.member.voice.channel)
      return await interaction.reply({
        embeds: [MusicGeneric('You are not in my voice channel!', RED)],
      });

    const track = queue.tracks.toArray()[trackNumber - 2];

    if (!track) {
      return await interaction.reply({
        embeds: [MusicGeneric('Invalid track number!', RED)],
        ephemeral: true,
      });
    }

    queue?.node.skipTo(track);

    const message = await interaction.reply({
      embeds: [MusicGeneric(`Jumping to ${track.title}`, INFO)],
    });

    queue.setMetadata({ interaction, message });
  },
});
