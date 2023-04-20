import { ErrorEmbed } from '@/embeds/Error';
import { PlayerEvent } from '@/lib/Event';

export default new PlayerEvent('error', async (queue, error) => {
  await queue.metadata.interaction.channel?.send({
    embeds: [ErrorEmbed(error.message)],
  });
});
