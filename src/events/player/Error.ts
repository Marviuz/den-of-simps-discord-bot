import { PlayerEvent } from '@/lib/Event';
import log from '@/utils/logger';

export default new PlayerEvent('error', async (queue, error) => {
  log.error(queue, error);
});
