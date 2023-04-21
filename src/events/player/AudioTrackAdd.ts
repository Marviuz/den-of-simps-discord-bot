import { MusicAdd } from '@/embeds/MusicReply';
import { PlayerEvent } from '@/lib/Event';

export default new PlayerEvent('audioTrackAdd', async (queue, track) => {
  const message = queue.metadata.message;
  await message?.edit({ content: '', embeds: [MusicAdd(track)] });
});
