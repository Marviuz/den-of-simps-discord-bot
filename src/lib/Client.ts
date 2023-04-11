import { Player } from 'discord-player';
import {
  ApplicationCommandDataResolvable,
  Client as DiscordClient,
  Collection,
  GatewayIntentBits,
  REST,
  Routes,
} from 'discord.js';

import * as clientCommands from '@/commands';
import * as clientEvents from '@/events/client';
import * as playerEvents from '@/events/player';
import { ICommand } from '@/types/Command';
import log from '@/utils/logger';

export class Client extends DiscordClient {
  commands: Collection<string, ICommand> = new Collection();
  player: Player = new Player(this, {
    autoRegisterExtractor: true,
    ytdlOptions: {
      filter: 'audioonly',
      quality: 'highestaudio',
      highWaterMark: 1 << 25,
    },
  });

  constructor() {
    super({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
      ],
    });
  }

  start() {
    this.registerSlashCommands();
    this.registerBotEvents();
    this.registerPlayerEvents();

    this.login(process.env.DISCORD_BOT_TOKEN);
  }

  /**
   * Register slash commands
   */
  private async registerSlashCommands() {
    const slashCommands: ApplicationCommandDataResolvable[] = [];
    Object.values(clientCommands).forEach((command) => {
      const $command = command as ICommand;
      this.commands.set($command.name, $command);
      slashCommands.push($command);
    });

    const rest = new REST({ version: '10' }).setToken(
      process.env.DISCORD_BOT_TOKEN as string
    );
    try {
      log.info(`Refresing ${slashCommands.length} slash (/) commands.`);

      const data = (await rest.put(
        Routes.applicationCommands(process.env.DISCORD_CLIENT_ID as string),
        { body: slashCommands }
      )) as unknown[];

      log.success(`Reloaded ${data.length} slash (/) commands.`);
    } catch (error) {
      log.error(error);
    }
  }

  /**
   * Setup client events
   */
  async registerBotEvents() {
    Object.values(clientEvents).forEach(({ event, run }) => {
      this.on(event, run);
    });
  }

  /**
   * Setup player events
   */
  async registerPlayerEvents() {
    Object.values(playerEvents).forEach(({ event, run }) => {
      this.player.events.on(event, run as never);
    });
  }
}
