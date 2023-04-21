import {
  ApplicationCommandOptionType,
  GuildResolvable,
  GuildVoiceChannelResolvable,
} from 'discord.js';

import { MusicGeneric } from '@/embeds/MusicReply';
import { Command } from '@/lib/Command';
import { QueueRepeatMode } from 'discord-player';
import { BLUE, RED } from '@/constants/theme';

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
  run: async ({ interaction, client, args }) => {
    if (!interaction.isChatInputCommand()) return;

    const q = args.getString(CommandOptions.Search)!;
    const voiceChannel = interaction.member.voice.channel;
    const guild = interaction.guildId as GuildResolvable;

    // Guard: must be in VC
    if (!interaction.member.voice.channel)
      return await interaction.reply({
        embeds: [MusicGeneric('You are not in my voice channel!', RED)],
      });

    await interaction.deferReply();

    await interaction.editReply({
      embeds: [MusicGeneric('Queueing...', BLUE)],
    });

    const queue = client.player.queues.create(guild, {
      repeatMode: QueueRepeatMode.AUTOPLAY,
      leaveOnEmpty: false,
      metadata: { interaction },
    });

    const searchResults = await client.player.search(q, {
      searchEngine: 'youtube', // TODO: add options to input
    });

    if (!searchResults.hasTracks())
      return await interaction.editReply({
        embeds: [MusicGeneric(`No tracks found for ${q}`, RED)],
      });

    const track = searchResults.tracks[0];

    await interaction.editReply({
      embeds: [MusicGeneric(`Queueing ${track.title}`, BLUE)],
    });

    await queue.player.play(
      voiceChannel as GuildVoiceChannelResolvable,
      track,
      {
        requestedBy: interaction.user,
      }
    );
  },
});
