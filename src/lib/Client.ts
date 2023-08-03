import { Player } from 'discord-player';
import schedule from 'node-schedule';
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
import { today } from '@/utils/time';
import { Elysia, Ganyu } from '@/constants/fictionals';
import { YouTubeExtractor } from '@discord-player/extractor';

export class Client extends DiscordClient {
  commands: Collection<string, ICommand> = new Collection();
  player: Player = new Player(this, {
    lockVoiceStateHandler: true,
  });

  constructor() {
    super({
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
    });
  }

  start() {
    this.registerSlashCommands();
    this.registerBotEvents();
    this.registerPlayerEvents();
    this.createFictional();

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
      log.info(`Refreshing ${slashCommands.length} slash (/) commands.`);

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
    this.player.extractors.register(YouTubeExtractor, {});

    Object.values(playerEvents).forEach(({ event, run }) => {
      this.player.events.on(event, run as never);
    });
  }

  /**
   * Setup character switch
   */
  createFictional = () => {
    log.info('Creating schedule for fictional character...');

    const rule = new schedule.RecurrenceRule();

    rule.hour = 0;
    rule.minute = 0;
    rule.tz = process.env.APP_TZ!;

    schedule.scheduleJob(rule, () => {
      try {
        if (parseInt(today().format('D')) % 2) {
          log.info('Deploying Ganyu');
          this.user?.setUsername(Ganyu.Name);
          this.user?.setAvatar(Ganyu.Image);
        } else {
          log.info('Deploying Elysia');
          this.user?.setUsername(Elysia.Name);
          this.user?.setAvatar(Elysia.Image);
        }
      } catch (error) {
        // TODO: notify
        log.error(error);

        throw error;
      } finally {
        log.info('Schedule finished');
      }
    });

    log.info('Schedule end');
  };
}
