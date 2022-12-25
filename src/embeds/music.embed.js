const { BLUE } = require('../constants/colors');

module.exports = (track, options = { color: BLUE }) => ({
  title: track.title,
  description: track.author,
  url: track.url,
  color: options.color,
  thumbnail: {
    url: track.thumbnail,
  },
  fields: [
    { name: options.label, value: track.duration },
  ],
  footer: {
    text: `Requested by: ${track.requestedBy.tag}`,
    icon_url: track.requestedBy.displayAvatarURL(),
  },
});
