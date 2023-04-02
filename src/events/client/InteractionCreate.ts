import { CommandInteractionOptionResolver, Events } from 'discord.js';

import { client } from '@/bot';
import { Event } from '@/lib/Event';
import { Interaction } from '@/types/Command';
import log from '@/utils/logger';
import { info } from '@/utils/logger/theme';

export default new Event(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) {
    log.error(`Command ${interaction.commandName} was found`);
    return;
  }

  const cmd = interaction.commandName;
  const user = interaction.user.tag;
  const guild = interaction.guildId;

  try {
    log.info(`Command ${info(cmd)} used by ${info(user)} from ${info(guild)}`);

    await command.run({
      client,
      interaction: interaction as Interaction,
      args: interaction.options as CommandInteractionOptionResolver,
    });
  } catch (error) {
    if (error instanceof Error) {
      log.error(
        `Command ${info(cmd)} used by ${info(user)} from ${info(guild)}`,
        error
      );

      await interaction.reply({
        content: `There was an error while executing this command! ${error.message}`,
        ephemeral: true,
      });
    }
  }
});
