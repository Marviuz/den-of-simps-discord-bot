import { ApplicationCommandOptionType } from 'discord.js';

import { Command } from '@/lib/Command';

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
    },
  ],
  run: async ({ args, interaction, client }) => {
    const trackNumber = args.getNumber(CommandOptions.TrackNumber)!;

    const queue = client.player.queues.get(interaction.guildId!);
    const tracks = queue?.tracks;

    try {
      const track = tracks?.toArray()[trackNumber - 1];

      if (track) {
        queue?.node.skipTo(track);
        return await interaction.reply({
          content: `Jumping to ${track.title}`,
          ephemeral: true,
        });
      }

      return await interaction.reply({
        content: 'Invalid track number',
        ephemeral: true,
      });
    } catch (error) {
      if (error instanceof Error) {
        if (interaction.deferred)
          return await interaction.editReply(error.message);

        return await interaction.reply(error.message);
      }

      throw error;
    }
  },
});
