const { Events } = require('discord.js');
const log = require('../utils/log');

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    if (!interaction.isChatInputCommand()) return;

    const command = await interaction.client.commands.get(interaction.commandName);

    if (!command) {
      log.error(`No command matching ${interaction.commandName} was found.`);
      return;
    }

    try {
      log.info(`Command **${interaction.commandName}** used by ${interaction.user.tag}`);
      await command.execute(interaction);
    } catch (error) {
      log.error(`Command **${interaction.commandName}** used by ${interaction.user.tag}`, error);
      await interaction.reply({ content: `There was an error while executing this command! ${error.message}`, ephemeral: true });
    }
  },
};
