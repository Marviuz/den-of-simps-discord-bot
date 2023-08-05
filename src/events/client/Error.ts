import { Events } from 'discord.js';
import { IS_DEV } from '@/constants';
import { Event } from '@/lib/Event';
import log from '@/utils/logger';

export const error = new Event(Events.Error, (error) => {
  log.error(error);

  if (!IS_DEV) {
    // Notify
  }
});

export const shardError = new Event(Events.ShardError, (error, shardId) => {
  log.error('Shard ID:', shardId, error);

  if (!IS_DEV) {
    // Notify
  }
});
