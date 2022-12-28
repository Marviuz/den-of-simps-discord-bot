const { SlashCommandBuilder, BaseInteraction } = require('discord.js');
const { parse } = require('path');
const math = require('mathjs');
const { INFO, RED } = require('../constants/colors');

const NAME = parse(__filename).name;

module.exports = {
  legacy: NAME,
  data: new SlashCommandBuilder()
    .setName(NAME)
    .setDescription('Solve Math')
    .addStringOption((option) => option.setName('equation').setDescription('Equation to solve').setRequired(true)),
  async execute(interaction, args) {
    const equation = interaction instanceof BaseInteraction ? interaction.options.getString('equation') : args.join(' ');

    try {
      if (equation) return await interaction.reply({ embeds: [{ title: 'Answer', color: INFO, description: math.evaluate(equation).toString() }] });
      return await interaction.reply({ embeds: [{ title: 'Please add an input!', color: RED }] });
    } catch (err) {
      return await interaction.reply({ embeds: [{ title: err.message, color: RED }] });
    }
  },
};
