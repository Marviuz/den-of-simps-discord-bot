import { RED } from '@/constants/theme';
import { EmbedBuilder } from 'discord.js';

export const ErrorEmbed = (title: string) => {
  return new EmbedBuilder({
    title,
    color: RED,
  });
};
