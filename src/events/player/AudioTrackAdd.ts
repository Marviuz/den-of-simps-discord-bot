import { MusicAdd } from '@/embeds/MusicReply';
import { PlayerEvent } from '@/lib/Event';
import log from '@/utils/logger';

export default new PlayerEvent('audioTrackAdd', async (queue, track) => {
  const meta = queue.metadata;

  try {
    if (meta.message)
      await meta.message.edit({
        embeds: [MusicAdd(track)],
      });
  } catch (error) {
    log.error(error);

    await meta.interaction.channel?.send({
      embeds: [MusicAdd(track)],
    });
  } finally {
    queue.setMetadata({
      interaction: queue.metadata.interaction,
      message: null,
    });
  }
});
