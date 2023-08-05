import { ApplicationCommandOptionType } from 'discord.js';
import * as mathjs from 'mathjs';
import { Command } from '@/lib/Command';

enum CommandOptions {
  Equation = 'equation',
}

export default new Command({
  name: 'calc',
  description: 'Equation to solve',
  options: [
    {
      name: CommandOptions.Equation,
      description: 'equation to solve',
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
  run: async ({ interaction, args }) => {
    if (!interaction.isChatInputCommand()) return;

    const equation = args.getString(CommandOptions.Equation);
    if (!equation) throw new Error('Equation not available!');

    await interaction.reply(`The answer is ${mathjs.evaluate(equation)}`);
  },
});
