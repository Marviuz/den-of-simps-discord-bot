import { Client, Events } from 'discord.js';
import log from '../utils/log';

export default {
  name: Events.ClientReady,
  once: true,
  execute(client: Client) {
    log.success(`${client.user?.tag} ready!`);
  },
};
