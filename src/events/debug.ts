import { Events } from 'discord.js';
import log from '../utils/log';

export default {
  name: Events.Debug,
  execute(info: string) {
    log(info);
  },
};
