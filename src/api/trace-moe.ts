// https://soruly.github.io/trace.moe-api/#/

import axios from 'axios';
import { TraceMoeResponse } from '@/types/TraceMoe';
import log from '@/utils/logger';

export const trace = async (url: string) => {
  try {
    const { data } = await axios.get('https://api.trace.moe/search', {
      params: { url },
    });

    return data as TraceMoeResponse;
  } catch (error) {
    log.error(error);

    throw error;
  }
};
