import { Events, Interaction } from 'discord.js';
import { IClient } from '../../types/client';
import log from '../utils/log';

export default {
  name: Events.InteractionCreate,
  async execute(interaction: Interaction & { client: IClient }) {
    if (!interaction.isChatInputCommand()) return;

    const command = await interaction.client.commands.get(
      interaction.commandName
    );

    if (!command) {
      log.error(`No command matching ${interaction.commandName} was found.`);
      return;
    }

    try {
      log.info(
        `Command **${interaction.commandName}** used by ${interaction.user.tag}`
      );
      await command.execute(interaction);
    } catch (error) {
      const _err = error as { message: string };
      log.error(
        `Command **${interaction.commandName}** used by ${interaction.user.tag}`,
        _err
      );
      await interaction.reply({
        content: `There was an error while executing this command! ${_err.message}`,
        ephemeral: true,
      });
    }
  },
};
