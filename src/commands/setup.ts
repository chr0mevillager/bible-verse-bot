import {
	MessageEmbed,
	GuildBasedChannel,
	TextChannel,
	Interaction,
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
import verseSendFactory from '../exports/sendVerse';

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
								// choices: generateArray(12).map((i) => ({
								// 	name: String(i * 5),
								// 	value: String(i * 5),
								// })),
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
								type: 8,
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
		//Send message error messages
		let requestedChannel = (interaction.options.getChannel("channel") as any);
		let requestedRole = (interaction.options.getRole("group") as any);
		if (interaction.options.getSubcommand() == "channel" || interaction.options.getSubcommand() == "everything") {
			if (requestedChannel.type != "GUILD_TEXT") {
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
		} else if (interaction.options.getSubcommand() == "time" || interaction.options.getSubcommand() == "everything") {
			if (!interaction.options.getString("timezone").match(/(^[a-z]{3,4}$)|(^[A-Z]3$)/gi)) {
				await interaction.reply({
					embeds: [
						new MessageEmbed()
							.setColor("#389af0")
							.setTitle("Invalid settings!")
							.setDescription("Please set the `timezone` setting to be a valid timezone.")
					],
					ephemeral: true,
				});
				return;
			}
		}

		//Add info
		//Declare empty variables
		let channel = "No Channel";
		let time = "No Time";
		let minute = "No Minute";
		let hour = "No Hour";
		let role = "No Role";
		let timezone = "No timezone";

		//Check and replace old prefs
		await database.getServerPreferences(interaction.guildId)
			.then((serverPrefs) => {
				if (serverPrefs["channelID"] != channel) channel = serverPrefs["channelID"];
				if (serverPrefs["roleID"] != role) role = serverPrefs["roleID"];
				if (serverPrefs["timezone"] != timezone) timezone = serverPrefs["timezone"];
				if (serverPrefs["minute"] != minute) {
					time = serverPrefs["time"];
					minute = serverPrefs["minute"];
					hour = serverPrefs["hour"];
				}
			})

		//Check and replace variables we are wrighting to
		if (requestedChannel) channel = requestedChannel.id;
		if (requestedRole) role = requestedRole.id;
		if (interaction.options.getString("timezone")) timezone = interaction.options.getString("timezone");
		if (interaction.options.getString("minute")) {
			time = interaction.options.getString("minute") + " " + interaction.options.getString("hour") + " * * *";
			minute = interaction.options.getString("minute");
			hour = interaction.options.getString("hour");
		}

		//Declare and register server prefs
		let serverInfo: ServerPrefs = {
			channelID: channel,
			time: time,
			roleID: role,
			timezone: timezone,
			hour: hour,
			minute: minute,
		};

		await database.registerServerPreferences(interaction.guildId, serverInfo);

		//End/Start job
		if (channel != "No Channel" && time != "No Time" && role != "No role" && timezone != "No timezone") {
			cronJob.default(interaction.guildId, role, timezone, time);
		}

		//Send Message
		await interaction.reply({
			embeds: [
				new MessageEmbed()
					.setColor("#389af0")
					.setTitle("Your settings are updated!")
					.setDescription(
						"Channel: <#" + serverInfo["channelID"] + ">\n" +
						"Time: " + serverInfo["hour"] + ":" + serverInfo["minute"] + " (" + serverInfo["timezone"] + ")\n" +
						"Pinged group: <@&" + serverInfo["roleID"] + ">"
					)
			],
			ephemeral: true,
		});
	}
}
export default setup;