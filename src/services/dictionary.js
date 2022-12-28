const { default: axios } = require('axios');

exports.searchDictionary = (_word) => axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${_word}`, {
  headers: {
    'Accept-Encoding': 'gzip,deflate,compress',
    'Content-Type': 'application/json',
  },
});
