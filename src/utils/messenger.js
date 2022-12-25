const CommandTypes = require('../constants/command-types');

const messenger = async (interaction, type, msg, override) => {
  if (type === CommandTypes.Legacy) return interaction.channel.send(msg);

  if (override) return override(msg);

  try {
    return interaction.reply(msg);
  } catch {
    return interaction.editReply(msg);
  }
};

module.exports = messenger;
