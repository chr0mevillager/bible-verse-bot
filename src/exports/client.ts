import {
	Client,
	Intents,
} from 'discord.js';

export const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
