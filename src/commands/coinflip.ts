import { COIN_HEADS, COIN_TAILS } from '@/constants/emotes';
import { Command } from '@/lib/Command';

export default new Command({
  name: 'coinflip',
  description: 'Heads or tails?',
  run: async ({ interaction }) => {
    if (!interaction.isChatInputCommand()) return;

    if (Math.random() < 0.5) return interaction.reply(COIN_HEADS);
    return await interaction.reply(COIN_TAILS);
  },
});
