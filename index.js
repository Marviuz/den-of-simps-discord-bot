const fs = require('fs');
const path = require('path');
const {
  Client,
  GatewayIntentBits,
  Collection,
} = require('discord.js');
const express = require('express');
const log = require('./src/utils/log');
const { now } = require('./src/utils/time');

require('./src/deploy-commands');

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
  presence: {
    status: 'online',
    activities: [{ name: 'with Marviuz\'s ʞɔoɔ' }],
  },
});

client.commands = new Collection();
client.legacyCommands = {};

//  _____                                           _
// /  __ \                                         | |
// | /  \/ ___  _ __ ___  _ __ ___   __ _ _ __   __| |___
// | |    / _ \| '_ ` _ \| '_ ` _ \ / _` | '_ \ / _` / __|
// | \__/\ (_) | | | | | | | | | | | (_| | | | | (_| \__ \
//  \____/\___/|_| |_| |_|_| |_| |_|\__,_|_| |_|\__,_|___/

const commandsPath = path.join(__dirname, 'src', 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);

  if ('data' in command && 'execute' in command && !command.disabled) {
    client.commands.set(command.data.name, command);
  } else {
    log.warn('[WARNING] `data` and `execute` not found. Not a slash command');
  }

  if ('legacy' in command) {
    client.legacyCommands[command.legacy] = command.execute;
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

const eventsPath = path.join(__dirname, 'src', 'events');
const eventFiles = fs.readdirSync(eventsPath).filter((file) => file.endsWith('.js'));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);

  if (event.once) client.once(event.name, (...args) => event.execute(...args));
  else client.on(event.name, (...args) => event.execute(...args));
}

client.login(process.env.DISCORD_BOT_TOKEN);

//  ________   _______  _____  ______  _____ _____
// |  ____\ \ / /  __ \|  __ \|  ____|/ ____/ ____|
// | |__   \ V /| |__) | |__) | |__  | (___| (___
// |  __|   > < |  ___/|  _  /|  __|  \___ \\___ \
// | |____ / . \| |    | | \ \| |____ ____) |___) |
// |______/_/ \_\_|    |_|  \_\______|_____/_____/

const app = express();
const port = process.env.PORT;
app.get('*', (req, res) => {
  log.info('Stamp:', now);
  res.send('Hello world');
});
app.listen(port, () => log(port));
