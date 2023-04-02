import { Events } from 'discord.js';

import { IS_DEV } from '@/constants';
import { Event } from '@/lib/Event';
import log from '@/utils/logger';

export default new Event(Events.Debug, (message) => {
  if (IS_DEV) log.info(message);
});
