import {
	CommandInteraction,
	ApplicationCommandDataResolvable,
	CacheType,
} from 'discord.js';

export interface CustomCommand {
	data: ApplicationCommandDataResolvable;
	execute(interaction: CommandInteraction<CacheType>): void | Promise<void>;
}

export interface ServerPrefs {
	channelID: string,
	time: string,
	roleID: string,
	timezone: string,
}