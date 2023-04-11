import {
  ApplicationCommandOptionType,
  GuildResolvable,
  GuildVoiceChannelResolvable,
} from 'discord.js';

import { MusicAdd } from '@/embeds/MusicReply';
import { Command } from '@/lib/Command';
import { QueueRepeatMode } from 'discord-player';

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

    try {
      if (!interaction.member.voice.channel)
        return await interaction.reply('you are not in a voice channel'); // TODO: embed message

      await interaction.deferReply();

      const queue = client.player.queues.create(guild, {
        repeatMode: QueueRepeatMode.AUTOPLAY,
        metadata: { channel },
      });

      const searchResults = await client.player.search(q);

      if (!searchResults.hasTracks())
        await interaction.followUp('track not found'); // TODO: embed message

      const track = searchResults.tracks[0];

      await queue.player.play(channel as GuildVoiceChannelResolvable, track, {
        requestedBy: interaction.user,
      });

      await interaction.followUp({ embeds: [MusicAdd(track)] }); // TODO: embed message
    } catch (error) {
      // TODO: notify
      if (error instanceof Error) {
        if (interaction.deferred)
          return await interaction.followUp(error.message);

        return await interaction.reply(error.message);
      }

      throw error;
    }
  },
});
