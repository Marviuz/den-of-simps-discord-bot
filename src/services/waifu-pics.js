// https:// api.waifu.pics/sfw/bonk

const { default: axios } = require('axios');

exports.waifuPics = (type = 'sfw', category = 'bonk') => axios.get(`https://api.waifu.pics/${type}/${category}`, {
  headers: {
    'Accept-Encoding': 'gzip,deflate,compress',
    'Content-Type': 'application/json',
  },
});
