import { default as axios } from 'axios';

export const searchDictionary = (_word: string) =>
  axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${_word}`, {
    headers: {
      'Accept-Encoding': 'gzip,deflate,compress',
      'Content-Type': 'application/json',
    },
  });
