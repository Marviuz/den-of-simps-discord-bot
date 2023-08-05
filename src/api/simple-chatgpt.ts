import axios from 'axios';
import { env } from '@/env';
import log from '@/utils/logger';

export const AskGPT = async (question: string) => {
  try {
    const { data, headers } = await axios.post(
      'https://simple-chatgpt-api.p.rapidapi.com/ask',
      {
        question,
      },
      {
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': env.RAPID_API_KEY,
          'X-RapidAPI-Host': env.RAPID_API_HOST,
        },
      },
    );

    // cspell:disable-next-line
    const limit = parseInt(headers['x-ratelimit-requests-limit']);
    // cspell:disable-next-line
    const remaining = parseInt(headers['x-ratelimit-requests-remaining']);

    return { limit, remaining, ...data } as {
      answer: string;
      limit: number;
      remaining: string;
    };
  } catch (error) {
    log.error(error);

    throw error;
  }
};
