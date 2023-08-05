import { z } from 'zod';

const envVariables = z.object({
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

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envVariables> {}
  }
}

export {};
