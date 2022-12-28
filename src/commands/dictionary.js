const { SlashCommandBuilder, BaseInteraction } = require('discord.js');
const { parse } = require('path');
const { RED } = require('../constants/colors');
const dictionaryEmbed = require('../embeds/dictionary.embed');
const { searchDictionary } = require('../services/dictionary');
const log = require('../utils/log');

const NAME = parse(__filename).name;

module.exports = {
  legacy: 'dictionary',
  data: new SlashCommandBuilder()
    .setName(NAME)
    .setDescription('Search for a word in the dictionary')
    .addStringOption((option) => option.setName('word').setDescription('Word to search the dictionary').setRequired(true)),
  async execute(interaction, args) {
    const input = interaction instanceof BaseInteraction ? interaction.options.getString('word') : args.join(' ');

    if (!input) return interaction.reply({ embeds: [{ title: 'Please add an input' }] });

    try {
      const { data } = await searchDictionary(input);
      await interaction.reply({
        embeds: data.map((def) => dictionaryEmbed(def)),
      });
    } catch (err) {
      log.error(err);

      if (err.response && err.response.data) {
        await interaction.reply({
          embeds: [{
            title: err.response.data.title,
            description: err.response.data.message,
            color: RED,
            footer: {
              text: 'Powered by: https://dictionaryapi.dev/',
              icon_url: 'https://i.imgur.com/G46QmyG.png',
            },
          }],
        });
      } else {
        await interaction.reply({
          embeds: [{
            title: err.message,
            color: RED,
          }],
        });
      }
    }
  },
};
