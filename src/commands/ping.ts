import { Command } from '@/lib/Command';

export default new Command({
  name: 'ping',
  description: 'Replies pong',
  run: async ({ interaction, client, args }) => {
    if (!interaction.isChatInputCommand()) return;

    try {
      await interaction.reply('pong');
    } catch (error) {
      if (error instanceof Error) {
        if (interaction.replied) await interaction.editReply(error.message);

        await interaction.reply(error.message);
      }

      throw error;
    }
  },
});
