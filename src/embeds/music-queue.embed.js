const { BLUE } = require('../constants/colors');
const { MAX_CHARACTERS } = require('../constants/settings');

module.exports = (options, { queue, tracks }) => ({
  title: options.title,
  description: 'Queue',
  fields: [{ name: `${queue.tracks.length} tracks`, value: `${tracks.length > MAX_CHARACTERS ? `${tracks.slice(0, 1024 - 3)}...` : tracks}` }],
  color: BLUE,
});
