import { IMusicOptions, IMusicTrack } from '../../types/music';
import { BLUE } from '../constants/colors';

export default (track: IMusicTrack, options: IMusicOptions) => ({
  title: track.title,
  description: track.author,
  url: track.url,
  color: options.color ?? BLUE,
  thumbnail: {
    url: track.thumbnail,
  },
  fields: [{ name: options.label, value: track.duration }],
  footer: {
    text: `Requested by: ${track.requestedBy.tag}`,
    icon_url: track.requestedBy.displayAvatarURL(),
  },
});
