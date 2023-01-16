import {
  IDictionaryEmbed,
  IDictionaryErrorEmbed,
} from '../../types/dictionary';
import { BLUE, RED } from '../constants/colors';
import { MAX_CHARACTERS } from '../constants/settings';
import isAvailable from '../utils/is-available';

const dictionaryEmbed = (def: IDictionaryEmbed) => ({
  title: def.word,
  description: `**Phonetic:** ${isAvailable(
    def.phonetic,
    '?'
  )}\n**Origin:** ${isAvailable(def.origin, '?')}`,
  fields: def.meanings.map((_) => ({
    name: _.partOfSpeech,
    value: `${_.definitions
      .map((__) => `${__.definition}\ne.g.: *${isAvailable(__.example, '?')}*`)
      .join('\n\n')
      .slice(0, MAX_CHARACTERS - 3)}...`,
  })),
  color: BLUE,
  footer: {
    text: 'Powered by: https://dictionaryapi.dev/',
    icon_url: 'https://i.imgur.com/G46QmyG.png',
  },
});

dictionaryEmbed.error = (content: IDictionaryErrorEmbed) => {
  const embed: IDictionaryErrorEmbed = { title: content.title, color: RED };
  if (content.description) embed.description = content.description;

  return embed;
};

export default dictionaryEmbed;
