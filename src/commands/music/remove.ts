import { Command } from '@/lib/Command';
import { ApplicationCommandOptionType } from 'discord.js';

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
    const trackNumber = args.getNumber(CommandOptions.TrackNumber)!;
    const queue = client.player.queues.get(interaction.guildId!);

    const trackToDelete = queue?.tracks.toArray()[trackNumber - 1];

    try {
      if (trackToDelete) {
        queue.removeTrack(trackToDelete);
        return await interaction.reply(`Deleted ${trackToDelete.title}`);
      }

      return await interaction.reply('Track not found');
    } catch (error) {
      // TODO: notify
      if (error instanceof Error) {
        if (interaction.deferred)
          return await interaction.followUp(error.message);

        return await interaction.reply(error.message);
      }

      throw error;
    }
  },
});
