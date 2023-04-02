import { Event } from '@/lib/Event';

import { client } from '@/bot';

import { CommandInteractionOptionResolver, Events } from 'discord.js';
import { Interaction } from '@/types/Command';

export default new Event(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) {
    console.error(`Command ${interaction.commandName} was found`);
    return;
  }

  try {
    console.log(
      `Command **${interaction.commandName}** used by ${interaction.user.tag}`
    );

    await command.run({
      client,
      interaction: interaction as Interaction,
      args: interaction.options as CommandInteractionOptionResolver,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error(
        `Command **${interaction.commandName}** used by ${interaction.user.tag}`,
        error
      );
      await interaction.reply({
        content: `There was an error while executing this command! ${error.message}`,
        ephemeral: true,
      });
    }
  }
});
