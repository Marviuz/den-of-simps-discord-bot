import axios from 'axios';

export const AskGPT = async (question: string) => {
  try {
    const { data } = await axios.post(
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

    return data as { answer: string };
  } catch (error) {
    throw error;
  }
};
