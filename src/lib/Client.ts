import { ICommand } from '@/types/Command';
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
import { Player } from 'discord-player';

export class Client extends DiscordClient {
  commands: Collection<string, ICommand> = new Collection();
  player: Player = new Player(this);

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

  // private async registerCommands(
  //   commands: ApplicationCommandDataResolvable[]
  // ) {}

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
      console.log(
        `Started refreshing ${slashCommands.length} application (/) commands.`
      );

      const data = (await rest.put(
        Routes.applicationCommands(process.env.DISCORD_CLIENT_ID as string),
        { body: slashCommands }
      )) as unknown[];

      console.log(
        `Successfully reloaded ${data.length} application (/) commands.`
      );
    } catch (error) {
      console.error(error);
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
      this.player.events.on(event, run);
    });
  }
}
