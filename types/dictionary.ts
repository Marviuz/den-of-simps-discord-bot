import { RED } from '../src/constants/colors';

export interface IDefinition {
  definition: string;
  example: string;
}

export interface IMeaning {
  partOfSpeech: string;
  definitions: IDefinition[];
}

export interface IDictionaryEmbed {
  word: string;
  phonetic: string;
  origin?: string;
  meanings: IMeaning[];
}

export interface IDictionaryErrorEmbed {
  title: string;
  description?: string;
  color: typeof RED;
}
