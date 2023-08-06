import { ActivityType } from 'discord.js';
import { MusicNowPlaying } from '@/embeds/MusicReply';
import { PlayerEvent } from '@/lib/Event';
import log from '@/utils/logger';

export default new PlayerEvent('playerStart', async (queue, track) => {
  const meta = queue.metadata;

  try {
    queue.guild.client.user.setPresence({
      status: 'online',
      activities: [
        {
          type: ActivityType.Listening,
          name: track.title,
        },
      ],
    });
  } catch (error) {
    log.error('Failed to set status!');
  }

  try {
    if (meta.message)
      return await meta.message.edit({ embeds: [MusicNowPlaying(track)] });
  } catch (error) {
    log.warn('Message metadata is probably expired.');

    const message = await meta.interaction.channel?.send({
      embeds: [MusicNowPlaying(track)],
    });

    if (message) queue.setMetadata({ interaction: meta.interaction, message });
  }
});
