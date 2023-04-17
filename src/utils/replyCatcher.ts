import { Interaction } from '@/types/Command';

const replyCatcher = async (interaction: Interaction, error: unknown) => {
  if (error instanceof Error) {
    const isReplyable = !interaction.deferred || !interaction.replied;

    if (isReplyable) return await interaction.reply(error.message);

    return await interaction.editReply(error.message);
  }

  throw error;
};

export default replyCatcher;
