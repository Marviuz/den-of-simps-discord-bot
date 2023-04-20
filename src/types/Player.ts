import { TextBasedChannel, VoiceBasedChannel } from 'discord.js';

export type QueueMeta = {
  voiceChannel: VoiceBasedChannel;
  textChannel: TextBasedChannel;
};
