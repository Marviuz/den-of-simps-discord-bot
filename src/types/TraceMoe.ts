export interface TraceMoeResponse {
  frameCount: number;
  error: string;
  result: Result[];
}

export interface Result {
  anilist: number; // cspell:disable-line
  filename: string;
  episode: null;
  from: number;
  to: number;
  similarity: number;
  video: string;
  image: string;
}
