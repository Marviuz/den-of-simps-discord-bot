import { Command } from '@/lib/Command';
import { ApplicationCommandOptionType } from 'discord.js';
import * as mathjs from 'mathjs';

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

    const equation = args.getString(CommandOptions.Equation)!;

    await interaction.reply(`The answer is ${mathjs.evaluate(equation)}`);
  },
});
