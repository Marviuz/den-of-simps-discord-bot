// https://waifu.pics/

import { WaifuCategoryNSFW, WaifuCategorySFW } from '@/types/WaifuPics';
import log from '@/utils/logger';
import axios from 'axios';

export const waifuPics = async <T>(
  category: T extends true ? WaifuCategoryNSFW : WaifuCategorySFW,
  nsfw?: T
) => {
  try {
    const { data } = await axios.get(
      `https://api.waifu.pics/${nsfw ? 'nsfw' : 'sfw'}/${category}`
    );

    return data as { url: string };
  } catch (error) {
    log.error(error);

    throw error;
  }
};
