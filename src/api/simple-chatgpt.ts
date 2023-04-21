import log from '@/utils/logger';
import axios from 'axios';

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
          'X-RapidAPI-Key': process.env.RAPID_API_KEY,
          'X-RapidAPI-Host': process.env.RAPID_API_HOST,
        },
      }
    );

    const limit = parseInt(headers['x-ratelimit-requests-limit']);
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
