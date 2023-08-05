import { z } from 'zod';
import log from './utils/logger';

const createEnv = () => {
  const _env = z.object({
    DISCORD_APPLICATION_ID: z.string(),
    DISCORD_PUBLIC_KEY: z.string(),
    DISCORD_BOT_TOKEN: z.string(),
    DISCORD_CLIENT_ID: z.string(),
    DISCORD_CLIENT_SECRET: z.string(),

    DISCORD_BOT_CREATOR: z.string(),

    GENIUS_CLIENT_ID: z.string(),
    GENIUS_CLIENT_SECRET: z.string(),
    GENIUS_ACCESS_TOKEN: z.string(),

    NODE_ENV: z.string(),
    APP_TZ: z.string(),

    RAPID_API_KEY: z.string(),
    RAPID_API_HOST: z.string(),

    PORT: z.string(),
  });

  const parsed = _env.safeParse(process.env);

  if (parsed.success) return parsed.data;

  log.error('ENV error!', parsed.error.flatten().fieldErrors);
  throw new Error('ENV error!');
};

export const env = createEnv();
