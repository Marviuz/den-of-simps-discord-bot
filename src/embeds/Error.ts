import { EmbedBuilder } from 'discord.js';
import { RED } from '@/constants/theme';

export const ErrorEmbed = (title: string) => {
  return new EmbedBuilder({
    title,
    color: RED,
  });
};
