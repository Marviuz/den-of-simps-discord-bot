import { MusicNowPlaying } from '@/embeds/MusicReply';
import { PlayerEvent } from '@/lib/Event';

export default new PlayerEvent('playerStart', async (queue, track) => {
  await queue.metadata.interaction.channel?.send({
    embeds: [MusicNowPlaying(track)],
  });
});
