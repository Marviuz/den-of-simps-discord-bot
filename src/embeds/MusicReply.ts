import { Track } from 'discord-player';
import { EmbedBuilder } from 'discord.js';

import { ZERO_WIDTH_SPACE } from '@/constants/characters';
import { BLUE, GREEN } from '@/constants/theme';

export const MusicAdd = ({
  title,
  author,
  url,
  thumbnail,
  duration,
  requestedBy,
}: Track) =>
  new EmbedBuilder({
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

export const MusicNowPlaying = ({
  title,
  author,
  url,
  thumbnail,
  duration,
  requestedBy,
}: Track) =>
  new EmbedBuilder({
    title,
    description: author,
    url,
    color: GREEN,
    thumbnail: { url: thumbnail },
    fields: [{ name: 'Playing', value: duration }],
    footer: {
      text: `Requested by: ${requestedBy}`,
      icon_url: requestedBy?.displayAvatarURL(),
    },
  });

export const MusicQueue = (tracks: Track[]) => {
  return new EmbedBuilder({
    title: 'Queue',
    description: `${tracks.length} songs`,
    color: BLUE,
    fields: [
      {
        name: ZERO_WIDTH_SPACE,
        value: tracks.map((track, i) => `${i + 1}. ${track.title}`).join('\n'),
      },
    ],
  });
};
