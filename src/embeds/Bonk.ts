import { BLUE } from '@/constants/theme';
import { EmbedBuilder, User } from 'discord.js';

export const Bonk = (image: string) =>
  new EmbedBuilder({
    color: BLUE,
    image: { url: image },
    footer: {
      text: 'Powered by WAIFU.PICS (https://waifu.pics/)',
    },
  });
