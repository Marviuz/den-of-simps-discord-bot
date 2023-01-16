import { CommandInteraction, SlashCommandBuilder } from 'discord.js';
import { parse } from 'path';

export default {
  data: new SlashCommandBuilder()
    .setName(parse(import.meta.url).name)
    .setDescription('Replies with Pong!'),
  async execute(interaction: CommandInteraction) {
    await interaction.reply('Pong!');
  },
};
