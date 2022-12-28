const { SlashCommandBuilder, BaseInteraction } = require('discord.js');
const { parse } = require('path');
const { WHITE } = require('../constants/colors');
const { WHAT_ } = require('../constants/emotes');
const { waifuPics } = require('../services/waifu-pics');

const NAME = parse(__filename).name;

module.exports = {
  legacy: NAME,
  data: new SlashCommandBuilder()
    .setName(NAME)
    .setDescription('Bonk!')
    .addUserOption((option) => option.setName('mention').setDescription('Bonk!!!').setRequired(true)),
  async execute(interaction, [mention] = [null]) {
    const isSlash = interaction instanceof BaseInteraction;
    let user;
    if (isSlash) user = interaction.options.getUser('mention');
    else if (mention) user = mention;
    else return isSlash ? interaction.reply({ embeds: [{ title: `Who should I bonk? ${WHAT_}`, color: WHITE }] }) : interaction.channel.send({ embeds: [{ title: `Who should I bonk? ${WHAT_}`, color: WHITE }] });

    if (isSlash) {
      await interaction.deferReply();
      const { data: { url } } = await waifuPics();
      return await interaction.editReply({ content: `**Bonk ${user}!**`, files: [url] });
    }

    const { data: { url } } = await waifuPics();
    return await interaction.channel.send({ content: `**Bonk ${user}!**`, files: [url] });
  },
};
