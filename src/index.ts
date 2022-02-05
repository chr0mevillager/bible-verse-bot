import "./exports/vars";
import { client } from "./exports/client";
import commands from "./commands";
import * as database from "./adapters/database";
import verseSendFactory from "./exports/sendVerse";
import * as cronJob from "./exports/cronJob";
import {
	ServerPrefs,
} from "./exports/types";

//Commands
client.on("interactionCreate", async (interaction) => {
	if (interaction.isCommand()) {
		const command = commands[interaction.commandName];
		try {
			await command.execute(interaction);
		} catch (err) {
			console.error(err);
			await interaction.reply({
				content: "You just found an ultra-rare bug! Please report this by using the \"/feedback\" command, or try again.",
				ephemeral: true,
			});
		}
	}
});

//Make file for each server
client.on("guildCreate", async (join) => {
	let serverInfo: ServerPrefs = {
		channelID: "No Channel",
		time: "No Time",
		roleID: "No Role",
		timezone: "No Timezone",
		hour: "No hour",
		minute: "No minute",
	};
	await database.registerServerPreferences(join.id, serverInfo);
})

//Start old jobs
async function startCronJobs() {
	let servers = await database.listServers();
	for (let i = 0; i < servers.length; i++) {
		await database.getServerPreferences(servers[i])
			.then((serverPrefs) => {
				if (serverPrefs["channelID"] != "No Channel" && serverPrefs["time"] != "No Time" && serverPrefs["roleID"] != "No Role" && serverPrefs["timezone"] != "No Timezone") {
					cronJob.default(servers[i], serverPrefs["channelID"], serverPrefs["timezone"], serverPrefs["time"]);
				}
			});
	}
}

//On login
client.once('ready', () => {
	console.log("It's alive! (Probably)");
	client.user.setActivity('/help', { type: 'LISTENING' });
	startCronJobs();
	const guild = client.guilds.cache.get(process.env.SLASH_COMMAND_TESTING_GUILD);
	if (guild) {
		Object.values(commands).forEach((command) => {
			guild.commands.create(command.data);
		});
	}
});

//Login
client.login(process.env.DISCORD_AUTH);
