import { Player } from 'discord-player';
import { Client, Collection } from 'discord.js';

export interface IClient extends Client {
  commands: Collection<any, any>;
  legacyCommands: {
    [key: string]: Function;
  };
  player?: Player;
}
