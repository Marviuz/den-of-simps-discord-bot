const { SlashCommandBuilder } = require('discord.js');
const { parse } = require('path');
const math = require('mathjs');
const { INFO } = require('../constants/colors');

const NAME = parse(__filename).name;

module.exports = {
  legacy: NAME,
  data: new SlashCommandBuilder()
    .setName(NAME)
    .setDescription('Replies with Pong!')
    .addStringOption((option) => option.setName('equation').setDescription('Equation to solve').setRequired(true)),
  async execute(interaction, args) {
    const equation = args && args.length ? args.join(' ') : interaction.options.getString('equation');
    await interaction.reply({ embeds: [{ title: 'Answer', color: INFO, description: math.evaluate(equation).toString() }] });
  },
};
