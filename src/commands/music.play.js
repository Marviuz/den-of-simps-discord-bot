const { DANGER } = require('../constants/colors');
const player = require('../services/player');

module.exports = {
  legacy: 'p',
  async execute(message, args) {
    if (!message.client.player) message.client.player = player(message.client);
    if (!message.member.voice.channelId) return await message.channel.send({ embeds: [{ title: 'You are not in a voice channel!', color: DANGER }], ephemeral: true });
    if (message.guild.members.me.voice.channelId && message.member.voice.channelId !== message.guild.members.me.voice.channelId) await message.channel.send({ embeds: [{ title: 'You are not in my voice channel!', color: DANGER }], ephemeral: true });
    const query = args.join(' ');
    const queue = message.client.player.createQueue(message.guild, { metadata: { channel: message.channel } });

    try {
      if (!queue.connection) await queue.connect(message.member.voice.channel);
    } catch {
      queue.destroy();
      return await message.channel.send({ embeds: [{ title: 'Could not join your voice channel!', color: DANGER }], ephemeral: true });
    }

    const track = await message.client.player.search(query, { requestedBy: message.member.user })
      .then((x) => x.tracks[0])
      .catch(console.error);
    if (!track) await message.channel.send({ embeds: [{ title: `Track **${query}** not found!`, color: DANGER }] });

    queue.addTrack(track);
  },
};
