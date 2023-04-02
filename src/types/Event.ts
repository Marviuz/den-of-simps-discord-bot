import { GuildQueue, PlayerEvents, Track } from 'discord-player';

export type PlayerEvent = keyof PlayerEvents;
export type PlayerEventListener = (
  queue: GuildQueue<unknown>,
  track: Track
) => unknown;
