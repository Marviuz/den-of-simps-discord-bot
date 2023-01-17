import { Client, GatewayIntentBits, Collection } from 'discord.js';
import log from './src/utils/log';
import * as commands from './src/commands';
import * as events from './src/events';
import { IClient } from './types/client';
import { ICommand } from './types/command';
import { IEvent } from './types/event';
import EventEmitter from 'events';

import './src/deploy-commands';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
  presence: {
    status: 'online',
    activities: [{ name: "with Marviuz's ʞɔoɔ" }],
  },
}) as EventEmitter & IClient;

client.commands = new Collection();
client.legacyCommands = {};

//  _____                                           _
// /  __ \                                         | |
// | /  \/ ___  _ __ ___  _ __ ___   __ _ _ __   __| |___
// | |    / _ \| '_ ` _ \| '_ ` _ \ / _` | '_ \ / _` / __|
// | \__/\ (_) | | | | | | | | | | | (_| | | | | (_| \__ \
//  \____/\___/|_| |_| |_|_| |_| |_|\__,_|_| |_|\__,_|___/

for (const commandName in commands) {
  const _commands: { [k: string]: ICommand } = commands;
  const command: ICommand = _commands[commandName];

  if (command.data && 'execute' in command) {
    client.commands.set(command.data.name, command);
  } else {
    log.warn('[WARNING] `data` and `execute` not found. Not a slash command');
  }

  if ('legacy' in command) {
    client.legacyCommands[command.legacy as string] = command.execute;
  } else {
    log.warn('[WARNING] `legacy` not found. Not a legacy command');
  }
}

//  _____                _
// |  ___|              | |
// | |____   _____ _ __ | |_ ___
// |  __\ \ / / _ \ '_ \| __/ __|
// | |___\ V /  __/ | | | |_\__ \
// \____/ \_/ \___|_| |_|\__|___/

for (const [, event] of Object.entries(events)) {
  const _event = event as IEvent;
  if (_event.once)
    client.once(_event.name, (...args) => _event.execute(...args));
  else client.on(_event.name, (...args) => _event.execute(...args));
}

client.login(process.env.DISCORD_BOT_TOKEN);
