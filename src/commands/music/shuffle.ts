import { GREEN, RED } from '@/constants/theme';
import { MusicGeneric } from '@/embeds/MusicReply';
import { Command } from '@/lib/Command';

export default new Command({
  name: 'shuffle',
  description: 'Shuffle the queue',
  run: async ({ interaction, client }) => {
    // Guard: must be in VC
    if (!interaction.member.voice.channel)
      return await interaction.reply({
        embeds: [MusicGeneric('You are not in my voice channel!', RED)],
      });

    const queue = client.player.queues.get(interaction.guild!);

    if (!queue)
      return await interaction.reply({
        embeds: [MusicGeneric('There is no queue', RED)],
      });

    queue.tracks.shuffle();

    await interaction.reply({
      embeds: [MusicGeneric('Shuffled', GREEN)],
    });
  },
});
