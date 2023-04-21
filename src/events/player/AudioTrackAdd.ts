import { MusicAdd } from '@/embeds/MusicReply';
import { PlayerEvent } from '@/lib/Event';

export default new PlayerEvent('audioTrackAdd', async (queue, track) => {
  await queue.metadata.interaction.channel?.send({
    embeds: [MusicAdd(track)],
  });
});
