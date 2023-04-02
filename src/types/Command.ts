import { Client } from '@/lib/Client';
import {
  ChatInputApplicationCommandData,
  CommandInteraction,
  CommandInteractionOptionResolver,
  GuildMember,
  PermissionResolvable,
} from 'discord.js';

export interface Interaction extends CommandInteraction {
  member: GuildMember;
}

interface IRunCommandParams {
  client: Client;
  interaction: Interaction & { member: GuildMember };
  args: CommandInteractionOptionResolver;
}

type RunCommandType = (options: IRunCommandParams) => unknown;

export interface ICommand extends ChatInputApplicationCommandData {
  userPermissions?: PermissionResolvable[];
  cooldown?: number;
  run: RunCommandType;
}
