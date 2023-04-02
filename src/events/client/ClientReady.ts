import { Event } from '@/lib/Event';

import { Events } from 'discord.js';

export default new Event(Events.ClientReady, (client) => {
  console.log(`Logged in as ${client.user.tag}`);
});
