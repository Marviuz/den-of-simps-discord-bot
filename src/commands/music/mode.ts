import { QueueRepeatMode } from 'discord-player';
import {
  ApplicationCommandOptionChoiceData,
  ApplicationCommandOptionType,
} from 'discord.js';
import { INFO, RED } from '@/constants/theme';
import { MusicGeneric } from '@/embeds/MusicReply';
import { Command } from '@/lib/Command';

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

    // Guard: must be in VC
    if (!interaction.member.voice.channel)
      return await interaction.reply({
        embeds: [MusicGeneric('You are not in my voice channel!', RED)],
      });

    const mode = args.getNumber(CommandOptions.Mode) as QueueRepeatMode;
    if (!interaction.guildId) throw new Error('Guild ID not available!');
    const queue = client.player.queues.get(interaction.guildId);

    queue?.setRepeatMode(mode);

    await interaction.reply({
      embeds: [
        MusicGeneric(
          `Set repeat mode to ${choices.find(({ value }) => value === mode)
            ?.name}`,
          INFO,
        ),
      ],
    });

    queue?.setMetadata({ interaction, message: null });
  },
});
