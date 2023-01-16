import { User } from 'discord.js';

export interface IMusicTrack {
  title: string;
  author: string;
  url: string;
  thumbnail: string;
  duration: string;
  requestedBy: User;
}

export interface IMusicOptions {
  label: string;
  color: number;
}
