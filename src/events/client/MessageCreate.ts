import { Events } from 'discord.js';

import { Event } from '@/lib/Event';
import { AskGPT } from '@/api/simple-chatgpt';
import { WHAT_, YES_ } from '@/constants/emotes';

export default new Event(Events.MessageCreate, async (message) => {
  const self = message.client.user.toString();

  if (message.author.bot) return;
  if (!message.content.startsWith(self)) return;

  const [_, ..._content] = message.content.split(self);
  const content = _content.join(self).trim();

  try {
    await message.channel.sendTyping();
    if (content) {
      const response = await AskGPT(content);
      await message.reply(response.answer);
    } else {
      if (message.author.id !== process.env.DISCORD_BOT_CREATOR)
        await message.reply(WHAT_);
      else await message.reply(YES_);
    }
  } catch (error) {
    if (error instanceof Error) {
      await message.reply(error.message); // TODO: embed
    } else {
      throw error;
    }
  }
});
