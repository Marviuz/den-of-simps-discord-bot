import { BLUE } from '../constants/colors';
import { MAX_CHARACTERS } from '../constants/settings';
import { Queue } from 'discord-player';

interface IMusicQueueEmbed {
  Options: { title: string };
  QueueTracks: { queue: Queue; tracks: string };
}

export default (
  options: IMusicQueueEmbed['Options'],
  { queue, tracks }: IMusicQueueEmbed['QueueTracks']
) => ({
  title: options.title,
  description: 'Queue',
  fields: [
    {
      name: `${queue.tracks.length} tracks`,
      value: `${
        tracks.length > MAX_CHARACTERS
          ? `${tracks.slice(0, 1024 - 3)}...`
          : tracks
      }`,
    },
  ],
  color: BLUE,
});
