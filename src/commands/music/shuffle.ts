import { Command } from '@/lib/Command';

export default new Command({
  name: 'shuffle',
  description: 'Shuffle the queue',
  run: async ({ interaction, client }) => {
    client.player.queues.get(interaction.guild!)?.tracks.shuffle();

    try {
      await interaction.reply('shuffled');
    } catch (err) {
      if (err instanceof Error) {
        if (interaction.deferred)
          return await interaction.editReply(err.message);

        return await interaction.reply(err.message);
      }

      throw err;
    }
  },
});
