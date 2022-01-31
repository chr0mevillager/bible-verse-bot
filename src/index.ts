import "./vars";
import { client } from "./client";
import commands from "./commands";
import * as database from "./adapters/database";
import verseSendFactory from "./sendVerse";

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

// let jobs = {};
// let CronJob = require("cron").CronJob;
// let job = new CronJob(database.getServerPreferences("934943871010484294"), verseSendFactory(database.getServerPreferences("934943871010484294")), null, true, "America/Colorado");
// job.start();

// jobs = {
// 	jobs,
// 	"e": job,
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