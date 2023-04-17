import { waifuPics } from '@/api/waifu';
import { Bonk } from '@/embeds/Bonk';
import { Command } from '@/lib/Command';
import replyCatcher from '@/utils/replyCatcher';
import { ApplicationCommandOptionType } from 'discord.js';

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
  run: async ({ interaction, client, args }) => {
    if (!interaction.isChatInputCommand()) return;

    const user = args.getUser(CommandOptions.User)!;

    try {
      await interaction.deferReply();

      const { url } = await waifuPics('bonk');

      await interaction.editReply({
        content: `**Bonk ${user}!**`,
        embeds: [Bonk(url)],
      });
    } catch (error) {
      return await replyCatcher(interaction, error);
    }
  },
});
