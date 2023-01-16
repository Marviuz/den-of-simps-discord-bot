export interface Data {
  options: any[];
  name: string;
  description: string;
  toJSON: Function;
}

export interface ICommand {
  legacy?: string;
  data?: Data;
  execute: Function;
}
