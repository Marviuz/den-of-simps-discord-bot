import { SlashCommandBuilder, CommandInteraction, Message } from 'discord.js';
import { parse } from 'path';
import { WHITE } from '../constants/colors';
import { WHAT_ } from '../constants/emotes';
import { waifuPics } from '../services/waifu-pics';

const NAME = parse(import.meta.url).name;

export default {
  legacy: NAME,
  data: new SlashCommandBuilder()
    .setName(NAME)
    .setDescription('Bonk!')
    .addUserOption((option) =>
      option.setName('mention').setDescription('Bonk!!!').setRequired(true)
    ),
  async execute(interaction: CommandInteraction | Message, [mention] = [null]) {
    const isSlash = interaction instanceof CommandInteraction;
    let user;
    if (isSlash) user = interaction.options.getUser('mention');
    else if (mention) user = mention;
    else {
      if (isSlash) {
        const i: CommandInteraction = interaction;
        return i.reply({
          embeds: [{ title: `Who should I bonk? ${WHAT_}`, color: WHITE }],
        });
      } else {
        return interaction.channel.send({
          embeds: [{ title: `Who should I bonk? ${WHAT_}`, color: WHITE }],
        });
      }
    }

    if (isSlash) {
      await interaction.deferReply();
      const {
        data: { url },
      } = await waifuPics();
      return await interaction.editReply({
        content: `**Bonk ${user}!**`,
        files: [url],
      });
    }

    const {
      data: { url },
    } = await waifuPics();
    return await interaction.channel.send({
      content: `**Bonk ${user}!**`,
      files: [url],
    });
  },
};
