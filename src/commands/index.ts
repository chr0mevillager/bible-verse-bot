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

interface CustomCommand {
    data: ApplicationCommandDataResolvable;
    execute(interaction: CommandInteraction<CacheType>): void | Promise<void>;
}

import feedback from "./feedback";
import help from "./help";
import info from "./info";

const commands: Record<string, CustomCommand> = {
    feedback,
    help,
    info,
};

export default commands;