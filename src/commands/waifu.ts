import { CommandInteraction, SlashCommandBuilder } from 'discord.js';
import { parse, basename } from 'path';
import { BLUE } from '../constants/colors';
import { waifuPics } from '../services/waifu-pics';

const NAME = parse(import.meta.url).name;

const choices = {
  pog: [
    'waifu',
    'neko',
    'shinobu',
    'megumin',
    'bully',
    'cuddle',
    'cry',
    'hug',
    'awoo',
    'kiss',
    'lick',
    'pat',
    'smug',
    'bonk',
    'yeet',
    'blush',
    'smile',
    'wave',
    'highfive',
    'handhold',
    'nom',
    'bite',
    'glomp',
    'slap',
    'kill',
    'kick',
    'happy',
    'wink',
    'poke',
    'dance',
    'cringe',
  ],
  susge: ['waifu', 'neko', 'trap', 'blowjob'],
};

export default {
  data: new SlashCommandBuilder()
    .setName(NAME)
    .setDescription('Sends waifu pics')
    .addBooleanOption((option) =>
      option.setName('susge').setDescription(':Susge:')
    )
    .addStringOption((option) =>
      option.setName('category').setDescription('Kinks Kappa')
    ),
  async execute(interaction: CommandInteraction) {
    const susge = interaction.options.get('susge')?.value as boolean;
    const category = interaction.options.get('category')?.value as string;

    if (!susge && choices.pog.includes(category)) {
      await interaction.deferReply();
      const {
        data: { url },
      } = await waifuPics('sfw', category);
      const content = { files: [url] };
      return await interaction.editReply(content);
    }

    if (susge && choices.susge.includes(category)) {
      await interaction.deferReply({ ephemeral: true });
      const {
        data: { url },
      } = await waifuPics('nsfw', category);
      const content = {
        ephemeral: true,
        files: [{ attachment: url, name: `SPOILER_${basename(url)}` }],
      };
      return await interaction.editReply(content);
    }

    return await interaction.reply({
      embeds: [
        {
          title: '/waifu <True|False> <category>',
          color: BLUE,
          fields: Object.entries(choices).map(([type, categ]) => ({
            name: type === 'susge' ? 'True' : 'False',
            value: categ.map((_) => `\`${_}\``).join(' '),
          })),
        },
      ],
    });
  },
};
