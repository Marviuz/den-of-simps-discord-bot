import { GuildResolvable } from 'discord.js';

import { Command } from '@/lib/Command';

export default new Command({
  name: 'queue',
  description: 'play a song',
  run: async ({ interaction, client }) => {
    if (!interaction.isChatInputCommand()) return;

    const queue = client.player.queues.get(
      interaction.guildId as GuildResolvable
    );

    if (queue) {
      try {
        return await interaction.reply(
          `${queue.tracks.map((track) => track).length}`
        );
      } catch (error) {
        // TODO: notify
        if (error instanceof Error) {
          if (!interaction.deferred) {
            return await interaction.reply(error.message);
          }

          return await interaction.followUp(error.message);
        }

        throw new Error('Unknown error occured');
      }
    }

    return await interaction.reply('No queue');
  },
});
