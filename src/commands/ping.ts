import { Command } from '@/lib/Command';
import replyCatcher from '@/utils/replyCatcher';

export default new Command({
  name: 'ping',
  description: 'Replies pong',
  run: async ({ interaction, client, args }) => {
    if (!interaction.isChatInputCommand()) return;

    try {
      await interaction.reply('pong');
    } catch (error) {
      return await replyCatcher(interaction, error);
    }
  },
});
