import dotenv from "dotenv";
import {
    CommandInteraction,
    ApplicationCommandDataResolvable,
    CacheType,
} from 'discord.js';
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