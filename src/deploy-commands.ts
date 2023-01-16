import { REST, Routes } from 'discord.js';
import log from './utils/log';
import * as commands from './commands';
import { Data } from '../types/command';

const _commands = [];

for (const [, command] of Object.entries(commands)) {
  if ('data' in command) {
    _commands.push((command.data as Data).toJSON());
  }
}

const rest = new REST({ version: '10' }).setToken(
  process.env.DISCORD_BOT_TOKEN as string
);

(async () => {
  try {
    log.info(
      `Started refreshing ${_commands.length} application (/) commands.`
    );

    const data = (await rest.put(
      Routes.applicationCommands(process.env.DISCORD_CLIENT_ID as string),
      { body: _commands }
    )) as object[];

    log.info(`Successfully reloaded ${data.length} application (/) commands.`);
  } catch (error) {
    log.error(error as any);
  }
})();
