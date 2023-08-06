import { DEFAULT_PRESENCE } from '@/constants/presence';
import { PlayerEvent } from '@/lib/Event';
import log from '@/utils/logger';

export default new PlayerEvent('disconnect', (queue) => {
  try {
    queue.guild.client.user.setPresence(DEFAULT_PRESENCE);
  } catch (error) {
    log.error('Failed to set status!');
  }
});
