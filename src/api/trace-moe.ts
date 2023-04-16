// https://soruly.github.io/trace.moe-api/#/

import { TraceMoeResponse } from '@/types/TraceMoe';
import axios from 'axios';

export const trace = async (url: string) => {
  try {
    const { data } = await axios.get('https://api.trace.moe/search', {
      params: { url },
    });

    return data as TraceMoeResponse;
  } catch (error) {
    throw error;
  }
};
