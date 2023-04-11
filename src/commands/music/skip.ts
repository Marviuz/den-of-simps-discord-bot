import { GuildResolvable } from 'discord.js';

import { Command } from '@/lib/Command';

export default new Command({
  name: 'skip',
  description: 'skips a song',
  run: async ({ interaction, client }) => {
    if (!interaction.isChatInputCommand()) return;

    const queue = client.player.queues.get(
      interaction.guildId as GuildResolvable
    );

    queue?.node.skip();

    await interaction.reply({ content: 'skipping...', ephemeral: true });
  },
});
