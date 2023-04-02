import { ICommand } from '@/types/Command';

export class Command {
  constructor(commandParams: ICommand) {
    Object.assign(this, commandParams);
  }
}
