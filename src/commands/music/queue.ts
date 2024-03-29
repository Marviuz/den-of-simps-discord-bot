import { RED } from '@/constants/theme';
import { MusicGeneric, MusicQueue } from '@/embeds/MusicReply';
import { Command } from '@/lib/Command';

export default new Command({
  name: 'queue',
  description: 'view song queues',
  run: async ({ interaction, client }) => {
    if (!interaction.isChatInputCommand()) return;

    // Guard: must be in VC
    if (!interaction.member.voice.channel)
      return await interaction.reply({
        embeds: [MusicGeneric('You are not in my voice channel!', RED)],
      });

    if (!interaction.guild) throw new Error('Guild ID not available!');
    const queue = client.player.queues.get(interaction.guild);

    if (!queue)
      return await interaction.reply({
        embeds: [MusicGeneric('There is no queue', RED)],
      });

    if (queue.currentTrack) {
      return await interaction.reply({
        embeds: [MusicQueue([queue.currentTrack, ...queue.tracks.toArray()])],
      });
    }

    queue.setMetadata({ interaction, message: null });
  },
});
