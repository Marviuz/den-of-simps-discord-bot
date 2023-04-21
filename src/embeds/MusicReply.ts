import { Track } from 'discord-player';
import { EmbedBuilder, bold } from 'discord.js';

import { BLUE, GREEN, INFO } from '@/constants/theme';

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
    color: INFO,
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
    title: `${tracks.length} ${tracks.length > 1 ? 'tracks' : 'track'}`,
    description: tracks
      .map((track, i) => `${i + 1}. ${!i ? bold(track.title) : track.title}`)
      .join('\n'),
    color: BLUE,
  });
};

export const MusicGeneric = (title: string, color: number) => {
  return new EmbedBuilder({
    title,
    color,
  });
};
