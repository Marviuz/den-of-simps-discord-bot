import { EmbedBuilder } from 'discord.js';
import { BLUE } from '@/constants/theme';
import { Result } from '@/types/TraceMoe';

// cspell:disable-next-line
export const FindResult = ({ filename, image, anilist, similarity }: Result) =>
  new EmbedBuilder({
    title: filename,
    description: `About ${(similarity * 100).toPrecision(4)}% similarity`,
    url: `https://anilist.co/anime/${anilist}/`,
    color: BLUE,
    image: { url: image },
    footer: {
      text: 'Powered by Trace.moe (https://soruly.github.io/trace.moe-api)',
    },
  });
