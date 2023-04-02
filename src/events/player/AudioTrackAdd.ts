import { PlayerEvent } from '@/lib/Event';
import log from '@/utils/logger';

export default new PlayerEvent('audioTrackAdd', async (queue, track) => {
  log.info(track.title, 'added by', track.requestedBy?.tag);
});
