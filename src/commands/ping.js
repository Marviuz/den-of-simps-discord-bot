const { SlashCommandBuilder } = require('discord.js');
const { parse } = require('path');

const NAME = parse(__filename).name;

module.exports = {
  data: new SlashCommandBuilder()
    .setName(NAME)
    .setDescription('Replies with Pong!'),
  async execute(interaction) {
    await interaction.reply('Pong!');
  },
};
