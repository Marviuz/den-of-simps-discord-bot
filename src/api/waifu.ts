// https:// api.waifu.pics/sfw/bonk

import { WaifuCategory } from '@/types/WaifuPics';
import axios from 'axios';

export const waifuPics = async (category: WaifuCategory, type = 'sfw') => {
  try {
    const { data } = await axios.get(
      `https://api.waifu.pics/${type}/${category}`
    );

    return data as { url: string };
  } catch (error) {
    throw error;
  }
};
