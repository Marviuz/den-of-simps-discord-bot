import { ApplicationCommandOptionType } from 'discord.js';
import { RED, WARNING } from '@/constants/theme';
import { MusicGeneric } from '@/embeds/MusicReply';
import { Command } from '@/lib/Command';

enum CommandOptions {
  TrackNumber = 'track_number',
}

export default new Command({
  name: 'remove',
  description: 'Remove a song from the queue',
  options: [
    {
      name: CommandOptions.TrackNumber,
      description: 'Track number to delete',
      type: ApplicationCommandOptionType.Number,
      required: true,
    },
  ],
  run: async ({ args, client, interaction }) => {
    // Guard: must be in VC
    if (!interaction.member.voice.channel)
      return await interaction.reply({
        embeds: [MusicGeneric('You are not in my voice channel!', RED)],
      });

    const trackNumber = args.getNumber(CommandOptions.TrackNumber);
    if (!trackNumber) throw new Error('Track number not available!');

    if (!interaction.guildId) throw new Error('Guild ID not available!');
    const queue = client.player.queues.get(interaction.guildId);

    if (!queue)
      return await interaction.reply({
        embeds: [MusicGeneric('There is no queue', RED)],
      });

    const trackToDelete = queue?.tracks.toArray()[trackNumber - 1];

    if (!trackToDelete) {
      return await interaction.reply({
        embeds: [MusicGeneric('Track not found!', RED)],
      });
    }

    queue.removeTrack(trackToDelete);

    await interaction.reply({
      embeds: [MusicGeneric(`Removed ${trackToDelete.title}`, WARNING)],
    });

    queue.setMetadata({ interaction, message: null });
  },
});
