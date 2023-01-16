import { Events } from 'discord.js';
import log from '../utils/log';

export default {
  name: Events.ShardError,
  execute(error: Error) {
    log.error('A websocket connection encountered an error:', error);
  },
};
