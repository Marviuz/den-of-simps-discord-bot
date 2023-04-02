import { Events } from 'discord.js';

import { Event } from '@/lib/Event';
import log from '@/utils/logger';

export default new Event(Events.ClientReady, (client) => {
  log.success(`Logged in as ${client.user.tag}`);
});
