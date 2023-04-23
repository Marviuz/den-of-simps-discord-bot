import { MusicNowPlaying } from '@/embeds/MusicReply';
import { PlayerEvent } from '@/lib/Event';
import log from '@/utils/logger';

export default new PlayerEvent('playerStart', async (queue, track) => {
  const meta = queue.metadata;

  try {
    if (meta.message)
      return await meta.message.edit({ embeds: [MusicNowPlaying(track)] });
  } catch (error) {
    log.error(error);

    return await meta.interaction.channel?.send({
      embeds: [MusicNowPlaying(track)],
    });
  }

  const message = await meta.interaction.channel?.send({
    embeds: [MusicNowPlaying(track)],
  });

  queue.setMetadata({ interaction: meta.interaction, message: message! });
});
