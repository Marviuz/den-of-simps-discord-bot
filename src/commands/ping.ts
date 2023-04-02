import { Command } from '@/lib/Command';

export default new Command({
  name: 'ping',
  description: 'ping the server',
  run: ({ interaction, client, args }) => {
    if (!interaction.isChatInputCommand()) return;

    interaction.reply('nice');
  },
});
