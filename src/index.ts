import dotenv from "dotenv";
import {
	Client,
	Collection,
	Intents,
	Message,
	MessageEmbed,
	MessageAttachment,
	Channel,
	TextChannel,
} from 'discord.js';
import { SlashCommandBuilder }  from "@discordjs/builders";
import path from "path";
dotenv.config();
const client = new Client(/*{ intents: [Intents.FLAGS.GUILDS] }*/);

client.commands = new Collection();

let pingCommand = new SlashCommandBuilder()
	.setName("ping")
	.setDescription("Does a thing.");

client.commands.set(pingCommand.name, pingCommand);

client.once('ready', () => {
	console.log("It's alive! (Probably)");
});

client.login(process.env.DISCORD_AUTH);