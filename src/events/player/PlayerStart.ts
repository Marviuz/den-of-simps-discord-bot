import { MusicNowPlaying } from '@/embeds/MusicReply';
import { PlayerEvent } from '@/lib/Event';

export default new PlayerEvent('playerStart', async (queue, track) => {
  const message = await queue.metadata.message?.edit({
    embeds: [MusicNowPlaying(track)],
  });
  queue.setMetadata({ message, interaction: queue.metadata.interaction });
});
