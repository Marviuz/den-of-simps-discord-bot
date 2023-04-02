import { PlayerEvent } from '@/lib/Event';

export default new PlayerEvent('audioTrackAdd', async (queue, track) => {
  console.log('>>>> track add', queue, track);
});
