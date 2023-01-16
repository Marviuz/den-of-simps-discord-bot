import { GuildChannelResolvable, GuildResolvable, Message } from 'discord.js';
import { IClient } from '../../types/client';

import { DANGER, INFO } from '../constants/colors';
import player from '../components/player';
import log from '../utils/log';

export default {
  legacy: 'p',
  async execute(message: Message, args: any) {
    const client = message.client as IClient;

    if (!args.length)
      return message.channel.send({
        embeds: [{ title: '!p <query>', color: INFO }],
      });
    if (!message.member?.voice.channelId)
      return await message.channel.send({
        embeds: [{ title: 'You are not in a voice channel!', color: DANGER }],
      });
    if (
      message.guild?.members.me?.voice.channelId &&
      message.member.voice.channelId !==
        message.guild?.members.me?.voice.channelId
    )
      await message.channel.send({
        embeds: [{ title: 'You are not in my voice channel!', color: DANGER }],
      });

    if (!client.player) client.player = player(client);
    const query = args.join(' ');
    const queue = client.player?.createQueue(message.guild as GuildResolvable, {
      metadata: { channel: message.channel },
    });

    try {
      if (!queue?.connection)
        await queue?.connect(
          message.member.voice.channel as GuildChannelResolvable
        );
    } catch {
      queue?.destroy();
      return await message.channel.send({
        embeds: [
          { title: 'Could not join your voice channel!', color: DANGER },
        ],
      });
    }

    const track = await client.player
      ?.search(query, { requestedBy: message.member.user })
      .then((x) => x.tracks[0])
      .catch(log.error);
    if (!track)
      return await message.channel.send({
        embeds: [{ title: `Track **${query}** not found!`, color: DANGER }],
      });

    queue?.addTrack(track);
  },
};
