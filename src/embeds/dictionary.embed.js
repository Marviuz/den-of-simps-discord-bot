const { BLUE } = require('../constants/colors');
const { MAX_CHARACTERS } = require('../constants/settings');
const isAvailable = require('../utils/is-available');

module.exports = (def) => ({
  title: def.word,
  description: `**Phonetic:** ${isAvailable(def.phonetic, '?')}\n**Origin:** ${isAvailable(def.origin, '?')}`,
  fields: def.meanings.map((_) => ({ name: _.partOfSpeech, value: `${_.definitions.map((__) => `${__.definition}\ne.g.: *${isAvailable(__.example, '?')}*`).join('\n\n').slice(0, MAX_CHARACTERS - 3)}...` })),
  color: BLUE,
});
