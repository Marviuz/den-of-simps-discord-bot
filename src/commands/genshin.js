const { SlashCommandBuilder } = require('discord.js');
const { parse } = require('path');
const Genshin = require('../services/genshin-api');

const NAME = parse(__filename).name;

module.exports = {
  disabled: true,
  data: new SlashCommandBuilder()
    .setName(NAME)
    .setDescription('Replies with Pong!')
    .addIntegerOption((option) => option.setName('uid').setDescription('Your uid! Duh!!!').setRequired(true)),
  async execute(interaction) {
    const uid = interaction.options.getInteger('uid');
    const user = new Genshin(uid);
    console.log(await user.getCharacter());

    await interaction.reply('Pong!');
  },
};
