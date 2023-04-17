import { Command } from '@/lib/Command';
import replyCatcher from '@/utils/replyCatcher';

export default new Command({
  name: 'shuffle',
  description: 'Shuffle the queue',
  run: async ({ interaction, client }) => {
    client.player.queues.get(interaction.guild!)?.tracks.shuffle();

    try {
      await interaction.reply('shuffled');
    } catch (error) {
      return await replyCatcher(interaction, error);
    }
  },
});
