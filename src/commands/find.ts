import { ApplicationCommandOptionType } from 'discord.js';
import { trace } from '@/api/trace-moe';
import { FindResult } from '@/embeds/Find';
import { Command } from '@/lib/Command';

enum CommandOptions {
  Image = 'image',
}

export default new Command({
  name: 'find',
  description: "You don't know what anime is it from?",
  options: [
    {
      name: CommandOptions.Image,
      description: 'Upload the image you want to search!',
      type: ApplicationCommandOptionType.Attachment,
      required: true,
    },
  ],
  run: async ({ args, interaction }) => {
    if (!interaction.isChatInputCommand()) return;

    const { url } = args.getAttachment(CommandOptions.Image) || {};
    if (!url) throw new Error('URL not available!');

    await interaction.deferReply();

    const { result } = await trace(url);
    const embeds = result.map((res) => FindResult(res));

    await interaction.editReply({ embeds });
  },
});
