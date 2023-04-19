import { Command } from '@/lib/Command';

export default new Command({
  name: 'shuffle',
  description: 'Shuffle the queue',
  run: async ({ interaction, client }) => {
    client.player.queues.get(interaction.guild!)?.tracks.shuffle();

    await interaction.reply('shuffled');
  },
});
