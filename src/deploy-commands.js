const { REST, Routes } = require('discord.js');
const fs = require('fs');
const { resolve } = require('path');
const log = require('./utils/log');

const commands = [];
const commandFiles = fs.readdirSync(resolve(__dirname, 'commands')).filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  if ('data' in command && !command.disabled) commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_BOT_TOKEN);

(async () => {
  try {
    log.info(`Started refreshing ${commands.length} application (/) commands.`);

    const data = await rest.put(
      Routes.applicationCommands(process.env.DISCORD_CLIENT_ID),
      { body: commands },
    );

    log.info(`Successfully reloaded ${data.length} application (/) commands.`);
  } catch (error) {
    log.error(error);
  }
})();
