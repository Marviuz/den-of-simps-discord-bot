import { Command } from '@/lib/Command';
import { ApplicationCommandOptionType, GuildResolvable } from 'discord.js';

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

    await interaction.deferReply();

    const queue = client.player.queues.create(guild, { metadata: { channel } });
    const searchResults = await client.player.search(q, {
      requestedBy: interaction.member.user,
    });
    const track = searchResults.tracks[0];

    if (!searchResults) await interaction.followUp('track not found');

    queue.addTrack(track);

    interaction.followUp(track.title);
  },
});
