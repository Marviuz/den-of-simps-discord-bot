import { GuildQueueEvents } from 'discord-player';
import { Awaitable, ClientEvents } from 'discord.js';

import { QueueMeta } from '@/types/Player';

export class Event<E extends keyof ClientEvents> {
  constructor(
    public event: E | string,
    public run: (...args: ClientEvents[E]) => Awaitable<void>
  ) {}
}

export class PlayerEvent<T extends keyof GuildQueueEvents> {
  constructor(
    public event: T,
    public run: GuildQueueEvents<QueueMeta>[T],
    public once?: boolean
  ) {}
}
