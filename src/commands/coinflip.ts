import { COIN_HEADS, COIN_TAILS } from '@/constants/emotes';
import { Command } from '@/lib/Command';

export default new Command({
  name: 'coinflip',
  description: 'Heads or tails?',
  run: async ({ interaction }) => {
    if (!interaction.isChatInputCommand()) return;

    try {
      if (Math.random() < 0.5) return interaction.reply(COIN_HEADS);
      return await interaction.reply(COIN_TAILS);
    } catch (error) {
      if (error instanceof Error) {
        if (interaction.replied) await interaction.editReply(error.message);

        await interaction.reply(error.message);
      }

      throw error;
    }
  },
});
