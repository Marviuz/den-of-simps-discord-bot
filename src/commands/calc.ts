import { SlashCommandBuilder, CommandInteraction, Message } from 'discord.js';
import { parse } from 'path';
import * as math from 'mathjs';
import { INFO, RED } from '../constants/colors';

const NAME = parse(import.meta.url).name;

export default {
  legacy: NAME,
  data: new SlashCommandBuilder()
    .setName(NAME)
    .setDescription('Solve Math')
    .addStringOption((option) =>
      option
        .setName('equation')
        .setDescription('Equation to solve')
        .setRequired(true)
    ),
  async execute(interaction: CommandInteraction | Message, args: string[]) {
    let equation;
    if (interaction instanceof CommandInteraction) {
      equation = interaction.options.get('equation')?.value;
    } else equation = args.join(' ');

    try {
      if (equation)
        return await interaction.reply({
          embeds: [
            {
              title: 'Answer',
              color: INFO,
              description: math.evaluate(equation as string).toString(),
            },
          ],
        });
      return await interaction.reply({
        embeds: [{ title: 'Please add an input!', color: RED }],
      });
    } catch (err) {
      const _err = err as { message: string };
      return await interaction.reply({
        embeds: [{ title: _err.message, color: RED }],
      });
    }
  },
};
