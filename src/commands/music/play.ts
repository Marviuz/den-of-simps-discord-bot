import {
  ApplicationCommandOptionType,
  GuildResolvable,
  GuildVoiceChannelResolvable,
} from 'discord.js';

import { MusicAdd, MusicGeneric } from '@/embeds/MusicReply';
import { Command } from '@/lib/Command';
import { QueueRepeatMode } from 'discord-player';
import { RED } from '@/constants/theme';

enum CommandOptions {
  Search = 'search',
}

export default new Command({
  name: 'play',
  description: 'play a song',
  options: [
    {
      name: CommandOptions.Search,
      description: 'Search or Youtube URL',
      required: true,
      type: ApplicationCommandOptionType.String,
    },
  ],
  run: async ({ interaction, client }) => {
    if (!interaction.isChatInputCommand()) return;

    const q = interaction.options.getString(CommandOptions.Search) as string;
    const channel = interaction.member.voice.channel;
    const guild = interaction.guildId as GuildResolvable;

    if (!interaction.member.voice.channel)
      return await interaction.reply({
        embeds: [MusicGeneric('You are not in my voice channel!', RED)],
      });

    await interaction.deferReply();

    const queue = client.player.queues.create(guild, {
      repeatMode: QueueRepeatMode.AUTOPLAY,
      leaveOnEmpty: false,
      metadata: { channel },
    });

    const searchResults = await client.player.search(q, {
      searchEngine: 'youtube', // TODO: add options to input
    });

    if (!searchResults.hasTracks())
      return await interaction.editReply({
        embeds: [MusicGeneric(`No tracks found for ${q}`, RED)],
      });

    const track = searchResults.tracks[0];

    await queue.player.play(channel as GuildVoiceChannelResolvable, track, {
      requestedBy: interaction.user,
    });

    return await interaction.editReply({ embeds: [MusicAdd(track)] });
  },
});
