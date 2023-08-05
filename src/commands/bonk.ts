import { ApplicationCommandOptionType } from 'discord.js';
import { waifuPics } from '@/api/waifu';
import { Bonk } from '@/embeds/Bonk';
import { Command } from '@/lib/Command';

enum CommandOptions {
  User = 'someone',
}

export default new Command({
  name: 'bonk',
  description: 'Bonk someone!',
  options: [
    {
      name: CommandOptions.User,
      description: 'The "someone" you want to bonk',
      type: ApplicationCommandOptionType.User,
      required: true,
    },
  ],
  run: async ({ interaction, args }) => {
    if (!interaction.isChatInputCommand()) return;

    const user = args.getUser(CommandOptions.User);
    if (!user) throw new Error('User not found!');

    await interaction.deferReply();

    const { url } = await waifuPics('bonk');

    await interaction.editReply({
      content: `**Bonk ${user}!**`,
      embeds: [Bonk(url)],
    });
  },
});
