import { Command } from '@/lib/Command';
import replyCatcher from '@/utils/replyCatcher';
import { QueueRepeatMode } from 'discord-player';
import {
  ApplicationCommandOptionChoiceData,
  ApplicationCommandOptionType,
} from 'discord.js';

enum CommandOptions {
  Mode = 'mode',
}

const choices = Object.values(QueueRepeatMode)
  .filter((val) => typeof val === 'string')
  .map((key) => ({
    name: key,
    value: QueueRepeatMode[key as keyof typeof QueueRepeatMode],
  })) as ApplicationCommandOptionChoiceData<number>[];

export default new Command({
  name: 'mode',
  description: 'set mode',
  options: [
    {
      name: CommandOptions.Mode,
      description: 'Set mode of player',
      type: ApplicationCommandOptionType.Number,
      required: true,
      choices,
    },
  ],
  run: async ({ interaction, client, args }) => {
    if (!interaction.isChatInputCommand()) return;

    const mode = args.getNumber(CommandOptions.Mode) as QueueRepeatMode;
    const queue = client.player.queues.get(interaction.guildId!);

    queue?.setRepeatMode(mode);

    try {
      await interaction.reply(`Set repeat mode to ${mode}`);
    } catch (error) {
      return await replyCatcher(interaction, error);
    }
  },
});
