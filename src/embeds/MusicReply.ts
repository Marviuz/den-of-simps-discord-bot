import { Track } from 'discord-player';
import { EmbedBuilder } from 'discord.js';

import { ZERO_WIDTH_SPACE } from '@/constants/characters';
import { BLUE, GREEN, SUCCESS } from '@/constants/theme';

export const MusicAdd = ({
  title,
  author,
  url,
  thumbnail,
  duration,
  requestedBy,
}: Track) => {
  return new EmbedBuilder({
    title,
    description: author,
    url,
    color: SUCCESS,
    thumbnail: { url: thumbnail },
    fields: [{ name: 'Added', value: duration }],
    footer: {
      text: `Requested by: ${requestedBy?.tag}`,
      icon_url: requestedBy?.displayAvatarURL(),
    },
  });
};

export const MusicQueueing = ({
  title,
  author,
  url,
  thumbnail,
  duration,
  requestedBy,
}: Track) => {
  return new EmbedBuilder({
    title,
    description: author,
    url,
    color: BLUE,
    thumbnail: { url: thumbnail },
    fields: [{ name: 'Queue', value: duration }],
    footer: {
      text: `Requested by: ${requestedBy?.tag}`,
      icon_url: requestedBy?.displayAvatarURL(),
    },
  });
};

export const MusicNowPlaying = ({
  title,
  author,
  url,
  thumbnail,
  duration,
  requestedBy,
}: Track) => {
  return new EmbedBuilder({
    title,
    description: author,
    url,
    color: GREEN,
    thumbnail: { url: thumbnail },
    fields: [{ name: 'Playing', value: duration }],
    footer: {
      text: `Requested by: ${requestedBy?.tag}`,
      icon_url: requestedBy?.displayAvatarURL(),
    },
  });
};

export const MusicQueue = (tracks: Track[]) => {
  return new EmbedBuilder({
    title: 'Queue',
    color: BLUE,
    fields: [
      {
        name: `${tracks.length} songs`,
        value: tracks.map((track, i) => `${i + 1}. ${track.title}`).join('\n'),
      },
    ],
  });
};

export const MusicGeneric = (title: string, color: number) => {
  return new EmbedBuilder({
    title,
    color,
  });
};
