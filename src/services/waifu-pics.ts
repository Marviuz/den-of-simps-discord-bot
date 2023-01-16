// https:// api.waifu.pics/sfw/bonk

import { default as axios } from 'axios';

export const waifuPics = (type = 'sfw', category = 'bonk') =>
  axios.get(`https://api.waifu.pics/${type}/${category}`, {
    headers: {
      'Accept-Encoding': 'gzip,deflate,compress',
      'Content-Type': 'application/json',
    },
  });
