const { SlashCommandBuilder } = require('discord.js');
const { parse } = require('path');
const { COIN_HEADS, COIN_TAILS } = require('../constants/emotes');

const NAME = parse(__filename).name;

module.exports = {
  legacy: NAME,
  data: new SlashCommandBuilder()
    .setName(NAME)
    .setDescription('Flip a coin!'),
  async execute(interaction) {
    if (Math.random() < 0.5) return interaction.reply(COIN_HEADS);
    return interaction.reply(COIN_TAILS);
  },
};
