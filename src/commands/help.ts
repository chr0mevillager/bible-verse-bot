import dotenv from "dotenv";
import {
    Client,
    Intents,
    Interaction,
    CommandInteraction,
    ApplicationCommandDataResolvable,
    CacheType,
    MessageEmbed,
    ColorResolvable,
    User,
    Message,
    MessageAttachment,
	Channel,
    TextChannel,
} from 'discord.js';
import { SlashCommandBuilder }  from "@discordjs/builders";
import { ChannelType } from "discord-api-types";
dotenv.config();
// const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

interface CustomCommand {
    data: ApplicationCommandDataResolvable;
    execute(interaction: CommandInteraction<CacheType>): void | Promise<void>;
}

let	help = {
	data: {
		name: "help",
		description: "See documentation about my commands and find my support server!",
	},
	async execute(interaction) {
		await interaction.reply({
			embeds: [
				new MessageEmbed()
					.setColor("#389af0")
					.setTitle("Command help:")
					.addFields(
						{
							name: "`/info`",
							value: "This command gives you information about me!"
						},
						{ name: '\u200B', value: '\u200B' },
						{
							name: "`/feedback` `Verse | Idea | Bug` `< Your Suggestion >`",
							value: "Use this command to send feedback to my developers! You can submit ideas for new features as well as verses and to report bugs. Use the appororiate command for your feedback (`Verse | Idea | Bug`), then type in `< Your Suggestion >`"
						},
						{ name: '\u200B', value: '\u200B' },
						{
							name: "`/setup` `< Channel >` `[ Time ]` `[ Ping Role ]`",
							value: "Use this command to set me up! Set the `< Channel >` to whatever channel you want me to post scriptures in, and optionally set the `< Time >` of day that you would like the scripture to be sent (in UTC). You can also add a role to be pinged every time a verse is posted (also optional)."
						},
					)
			],
			ephemeral: true,
		});
		await interaction.followUp({
			embeds: [
				new MessageEmbed()
					.setColor("#389af0")
					.setTitle("Other help:")
					.setDescription("If you could not find what you were looking for in the message above, you can ask a question in my [Support Server](https://google.com)!")
			],
			ephemeral: true,
		});
	},
};

export default help;