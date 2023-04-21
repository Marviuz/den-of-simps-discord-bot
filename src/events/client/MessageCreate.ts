import { Events } from 'discord.js';

import { Event } from '@/lib/Event';
import { AskGPT } from '@/api/simple-chatgpt';
import { WHAT_, YES_ } from '@/constants/emotes';
import { ErrorEmbed } from '@/embeds/Error';
import log from '@/utils/logger';

export default new Event(Events.MessageCreate, async (message) => {
  const self = message.client.user.toString();

  if (message.author.bot) return;
  if (!message.content.startsWith(self)) return;

  const [_, ..._content] = message.content.split(self);
  const content = _content.join(self).trim();

  try {
    await message.channel.sendTyping();
    if (content) {
      const { answer, limit, remaining } = await AskGPT(content);
      await message.reply(
        `${answer}\n\n\`You have ${remaining}/${limit} conversations this month.\``
      );
    } else {
      if (message.author.id !== process.env.DISCORD_BOT_CREATOR)
        await message.reply(WHAT_);
      else await message.reply(YES_);
    }
  } catch (error) {
    log.error(error);

    if (error instanceof Error) {
      await message.reply({ embeds: [ErrorEmbed(error.message)] });
    } else {
      throw error;
    }
  }
});
