import { ErrorEmbed } from '@/embeds/Error';
import { PlayerEvent } from '@/lib/Event';
import log from '@/utils/logger';

export default new PlayerEvent('error', async (queue, error) => {
  log.error(error);

  await queue.metadata.interaction.channel?.send({
    embeds: [ErrorEmbed(error.message)],
  });
});
