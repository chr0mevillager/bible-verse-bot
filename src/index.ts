const Discord = require('discord.js');
import {
	//Discord,
	Message,
	MessageEmbed,
	MessageAttachment,
	Channel,
	TextChannel,
} from 'discord.js';
import path from "path";
const client = new Discord.Client();

// Embed List https://discordjs.guide/popular-topics/embeds.html#embed-preview

client.once('ready', () => {
	console.log("The message was sent! (Probably)");
});

client.login('');