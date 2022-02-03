import {
	MessageEmbed,
	GuildBasedChannel,
	TextChannel,
} from 'discord.js';
import {
	APIInteractionDataResolvedChannel,
	ChannelType,
} from "discord-api-types";
import {
	CustomCommand,
} from "../exports/types";
import { client } from "../exports/client";
import * as database from "../adapters/database";
import {
	ServerPrefs,
} from "../exports/types";
import * as cronJob from "../exports/cronJob";

function generateArray(numElements: number) {
	const arr = [];
	for (let i = 0; i < numElements; i++) {
		arr.push(i);
	}
	return arr;
}

function getHourDisplay(hour: number) {
	if (hour > 12) {
		return String(hour % 12) + " PM";
	} else if (hour === 0) {
		return "12 AM";
	} else if (hour === 12) {
		return "12 PM";
	} else {
		return String(hour) + " AM";
	}
}

let setup: CustomCommand = {
	data: {
		name: "setup",
		description: "Setup the bot!",
		options: [
			{
				name: "the",
				description: "What do you want to set up?",
				type: 2,
				options: [
					{
						name: "channel",
						description: "What channel should I send messages in?",
						type: 1,
						options: [{
							name: "channel",
							description: "Time",
							type: 7,
							required: true,
						}],
					},
					{
						name: "time",
						description: "When should I post scriptures?",
						type: 1,
						options: [
							{
								name: "minute",
								description: "What minute it should be posted on",
								type: 3,
								required: true,
								choices: generateArray(12).map((i) => ({
									name: String(i * 5),
									value: String(i * 5),
								})),
							},
							{
								name: "hour",
								description: "Hour of the day",
								type: 3,
								required: true,
								choices: generateArray(24).map((i) => ({
									name: getHourDisplay(i),
									value: String(i),
								})),
							},
							{
								name: "timezone",
								description: "3 Letter abriviation",
								type: 3,
								required: true,
							}
						],
					},
					{
						name: "pings",
						description: "Who should I ping?",
						type: 1,
						options: [
							{
								name: "group",
								description: "A role that can be mentioned",
								type: "ROLE",
								required: true,
							},
						],
					},
				],
			},
			{
				name: "everything",
				description: "Set everyhing up!",
				type: 1,
				options: [
					{
						name: "channel",
						description: "Time",
						type: 7,
						required: true,
					},
					{
						name: "minute",
						description: "What minute it should be posted on",
						type: 3,
						required: true,
						choices: generateArray(12).map((i) => ({
							name: String(i * 5),
							value: String(i * 5),
						})),
					},
					{
						name: "hour",
						description: "Hour of the day",
						type: 3,
						required: true,
						choices: generateArray(24).map((i) => ({
							name: getHourDisplay(i),
							value: String(i),
						})),
					},
					{
						name: "timezone",
						description: "3 Letter abriviation",
						type: 3,
						required: true,
					},
					{
						name: "group",
						description: "A role or user",
						type: 8,
						required: true,
					},
				],
			},
		],
	},
	async execute(interaction) {
		//Send message

		let subCommand = interaction.options.getSubcommand();

		let requestedChannel = (interaction.options.getChannel("channel") as any);
		let requestedRole = (interaction.options.getRole("group") as any);
		if (interaction.options.getSubcommand() == "channel" || interaction.options.getSubcommand() == "all") {
			if (client.channels.cache.find((channel) => (channel as any).id === requestedChannel) as any != ChannelType.GuildText) {
				await interaction.reply({
					embeds: [
						new MessageEmbed()
							.setColor("#389af0")
							.setTitle("Invalid settings!")
							.setDescription("Please set the `channel` setting to be a text channel.")
					],
					ephemeral: true,
				});
				return;
			}
		}
		await interaction.reply({
			embeds: [
				new MessageEmbed()
					.setColor("#389af0")
					.setTitle("Your settings are updated!")
					.setDescription(
						"Channel: <#" + requestedChannel.id + ">\n" +
						"Time: " + interaction.options.getString("hour") + ":" + interaction.options.getString("minute") + " (" + interaction.options.getString("timezone") + ")\n" +
						"Pinged group: <@&" + requestedRole.id + ">"
					)
			],
			ephemeral: true,
		});
		//Add info
		let serverInfo: ServerPrefs = {
			channelID: requestedChannel.id,
			time: interaction.options.getString("minute") + " " + interaction.options.getString("hour") + " * * *",
			roleID: requestedRole.id,
			timezone: interaction.options.getString("timezone"),
		};
		await database.registerServerPreferences(interaction.guildId, serverInfo);
		//End/Start job

		cronJob.default(interaction.guildId, requestedChannel.id, interaction.options.getString("timezone"), /*interaction.options.getString("minute")*/ "22" + " " + interaction.options.getString("hour") + " * * *");
	}
}
export default setup;