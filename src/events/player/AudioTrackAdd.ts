import { MusicAdd } from '@/embeds/MusicReply';
import { PlayerEvent } from '@/lib/Event';

export default new PlayerEvent('audioTrackAdd', async (queue, track) => {
  const meta = queue.metadata;

  if (meta.message)
    await meta.message.edit({
      embeds: [MusicAdd(track)],
    });

  queue.setMetadata({
    interaction: queue.metadata.interaction,
    message: null,
  });
});
