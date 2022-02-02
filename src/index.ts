import "./exports/vars";
import { client } from "./exports/client";
import commands from "./commands";
import * as database from "./adapters/database";
import verseSendFactory from "./exports/sendVerse";
import startJob from "./exports/cronJob";

client.on("interactionCreate", async (interaction) => {
	if(interaction.isCommand()) {
		const command = commands[interaction.commandName];
		try {
			await command.execute(interaction);
		} catch(err) {
			console.error(err);
			await interaction.reply({
				content: "You just found an ultra-rare bug! Please report this by using the \"/feedback\" command, or try again.",
				ephemeral: true,
			});
		}
	}
});

/**Action options include "all", "time", "channel ID", and "role ID" */
// async function getPreferences(action) {
// 	let servers = [];
// 	await database.listServers()
// 		.then((result) => {
// 			servers = result;
// 		});
// 	let serverPreferences = [];
// 	for (let i = 0; i < servers.length; i++) {
// 		database.getServerPreferences(servers[i])
// 			.then((result) => {
// 				if (action == "all") {
// 					serverPreferences.push(result);
// 					console.log(serverPreferences);
// 					return serverPreferences;
// 				} else {
// 					// return JSON.parse(result)[action];
// 					// result = JSON.parse(result);
// 					console.log(result[action]);
// 					return result[action];
// 				}
// 			});
// 	}
// 	return serverPreferences;
// }

client.once('ready', () => {
	console.log("It's alive! (Probably)");
	client.user.setActivity('/help', { type: 'LISTENING' });

	const guild = client.guilds.cache.get(process.env.SLASH_COMMAND_TESTING_GUILD);
	if(guild) {
		Object.values(commands).forEach((command) => {
			guild.commands.create(command.data);
		});
	}
});

client.login(process.env.DISCORD_AUTH);