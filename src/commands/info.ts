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
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

interface CustomCommand {
    data: ApplicationCommandDataResolvable;
    execute(interaction: CommandInteraction<CacheType>): void | Promise<void>;
}

let	info = {
    data: {
        name: "info",
        description: "See information about me!",
    },
    async execute(interaction) {
        await interaction.reply({
            embeds: [
                new MessageEmbed()
                    .setColor("#389af0")
                    .setTitle("Information:")
                    .setDescription("For information regarding updates, verse selection, and more, visit [my server](https://google.com)!")
            ],
            ephemeral: true,
        });
    },
};

export default info;