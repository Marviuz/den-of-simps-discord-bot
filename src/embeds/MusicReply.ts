import { Track } from 'discord-player';
import { EmbedBuilder } from 'discord.js';

import { BLUE } from '@/constants/theme';

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
    color: BLUE,
    thumbnail: { url: thumbnail },
    fields: [{ name: 'Queue', value: duration }],
    footer: {
      text: `Requested by: ${requestedBy}`,
      icon_url: requestedBy?.displayAvatarURL(),
    },
  });
};
