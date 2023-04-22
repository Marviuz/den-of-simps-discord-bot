declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DISCORD_APPLICATION_ID: string;
      DISCORD_PUBLIC_KEY: string;
      DISCORD_BOT_TOKEN: string;
      DISCORD_CLIENT_ID: string;
      DISCORD_CLIENT_SECRET: string;
      NODE_ENV: string;
      APP_TZ: string;
      RAPID_API_KEY: string;
      RAPID_API_HOST: string;
      PORT: number;
    }
  }
}

export {};
