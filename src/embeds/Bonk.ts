import { EmbedBuilder } from 'discord.js';
import { BLUE } from '@/constants/theme';

export const Bonk = (image: string) =>
  new EmbedBuilder({
    color: BLUE,
    image: { url: image },
    footer: {
      text: 'Powered by WAIFU.PICS (https://waifu.pics/)',
    },
  });
