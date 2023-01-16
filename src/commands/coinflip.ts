import { CommandInteraction, SlashCommandBuilder } from 'discord.js';
import { parse } from 'path';
import { COIN_HEADS, COIN_TAILS } from '../constants/emotes';

const NAME = parse(import.meta.url).name;

export default {
  legacy: NAME,
  data: new SlashCommandBuilder().setName(NAME).setDescription('Flip a coin!'),
  async execute(interaction: CommandInteraction) {
    if (Math.random() < 0.5) return interaction.reply(COIN_HEADS);
    return interaction.reply(COIN_TAILS);
  },
};
