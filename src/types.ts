import {
	CommandInteraction,
	ApplicationCommandDataResolvable,
	CacheType,
} from 'discord.js';

export interface CustomCommand {
	data: ApplicationCommandDataResolvable;
	execute(interaction: CommandInteraction<CacheType>): void | Promise<void>;
}