const { default: axios } = require('axios');

// exports.getGenshinInfo = async (uid) => {
//   const { data } = await axios.get(`https://enka.network/u/${uid}/__data.json`, { headers: { 'Accept-Encoding': 'gzip,deflate,compress' } });
//   return data;
// };

// exports.getGenshinCharacters = async (uid) => {
//   const { data } = await axios.get('https://raw.githubusercontent.com/EnkaNetwork/API-docs/master/store/characters.json', { headers: { 'Accept-Encoding': 'gzip,deflate,compress' } });
//   return uid ? data[uid] : data;
// };

class Genshin {
  constructor(uid) {
    this._genshin = axios.get(`https://enka.network/u/${uid}/__data.json`, { headers: { 'Accept-Encoding': 'gzip,deflate,compress' } });
    this._characters = axios.get('https://raw.githubusercontent.com/EnkaNetwork/API-docs/master/store/characters.json', { headers: { 'Accept-Encoding': 'gzip,deflate,compress' } });
  }

  async getPlayerInfo() {
    const { data: { playerInfo } } = await this._genshin;
    return playerInfo;
  }
}

module.exports = Genshin;
