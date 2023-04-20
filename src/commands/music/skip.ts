import { GuildResolvable } from 'discord.js';

import { Command } from '@/lib/Command';
import { MusicGeneric } from '@/embeds/MusicReply';
import { RED } from '@/constants/theme';

export default new Command({
  name: 'skip',
  description: 'skips a song',
  run: async ({ interaction, client }) => {
    if (!interaction.isChatInputCommand()) return;

    // Guard: must be in VC
    if (!interaction.member.voice.channel)
      return await interaction.reply({
        embeds: [MusicGeneric('You are not in my voice channel!', RED)],
      });

    const queue = client.player.queues.get(
      interaction.guildId as GuildResolvable
    );

    queue?.node.skip();

    await interaction.reply({ content: 'skipping...', ephemeral: true });
  },
});
