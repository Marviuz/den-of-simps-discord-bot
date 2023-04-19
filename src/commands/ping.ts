import { Command } from '@/lib/Command';

export default new Command({
  name: 'ping',
  description: 'Replies pong',
  run: async ({ interaction, client, args }) => {
    if (!interaction.isChatInputCommand()) return;

    await interaction.reply('pong');
  },
});
