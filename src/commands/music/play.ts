import {
  ApplicationCommandOptionType,
  GuildResolvable,
  GuildVoiceChannelResolvable,
} from 'discord.js';

import { Command } from '@/lib/Command';

export default new Command({
  name: 'play',
  description: 'play a song',
  options: [
    {
      name: 'q',
      description: 'search',
      required: true,
      type: ApplicationCommandOptionType.String,
    },
  ],
  run: async ({ interaction, client }) => {
    if (!interaction.isChatInputCommand()) return;

    const q = interaction.options.getString('q') as string;
    const channel = interaction.member.voice.channel;
    const guild = interaction.guild as GuildResolvable;

    if (!interaction.member.voice.channel)
      return interaction.reply('you are not in a voice channel'); // TODO: embed message

    await interaction.deferReply();

    const queue = client.player.queues.create(guild, { metadata: { channel } });
    const searchResults = await client.player.search(q, {
      requestedBy: interaction.member.user,
    });
    const track = searchResults.tracks[0];

    if (!searchResults) await interaction.followUp('track not found');

    // queue.addTrack(track);

    await queue.player.play(channel as GuildVoiceChannelResolvable, track);

    await interaction.followUp(track.title); // TODO: embed message
  },
});
