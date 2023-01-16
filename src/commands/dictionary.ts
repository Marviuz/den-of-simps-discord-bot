import { SlashCommandBuilder, CommandInteraction, Message } from 'discord.js';
import { parse } from 'path';
import { IDictionaryEmbed } from '../../types/dictionary';
import { RED } from '../constants/colors';
import dictionaryEmbed from '../embeds/dictionary.embed';
import { searchDictionary } from '../services/dictionary';
import log from '../utils/log';

const NAME = parse(import.meta.url).name;

export default {
  legacy: NAME,
  data: new SlashCommandBuilder()
    .setName(NAME)
    .setDescription('Search for a word in the dictionary')
    .addStringOption((option) =>
      option
        .setName('word')
        .setDescription('Word to search the dictionary')
        .setRequired(true)
    ),
  async execute(interaction: CommandInteraction | Message, args: string[]) {
    const input =
      interaction instanceof CommandInteraction
        ? (interaction.options.get('word')?.value as string)
        : args.join(' ');

    if (!input)
      return interaction.reply({ embeds: [{ title: 'Please add an input' }] });

    try {
      const { data } = await searchDictionary(input);
      await interaction.reply({
        embeds: data.map((def: IDictionaryEmbed) => dictionaryEmbed(def)),
      });
    } catch (err) {
      const _err = err as any;
      log.error(_err);

      if (_err.response && _err.response.data) {
        await interaction.reply({
          embeds: [
            {
              title: _err.response.data.title,
              description: _err.response.data.message,
              color: RED,
              footer: {
                text: 'Powered by: https://dictionaryapi.dev/',
                icon_url: 'https://i.imgur.com/G46QmyG.png',
              },
            },
          ],
        });
      } else {
        await interaction.reply({
          embeds: [
            {
              title: _err.message,
              color: RED,
            },
          ],
        });
      }
    }
  },
};
