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
} from 'discord.js';
import { SlashCommandBuilder }  from "@discordjs/builders";
dotenv.config();
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

interface CustomCommand {
    data: ApplicationCommandDataResolvable;
    execute(interaction: CommandInteraction<CacheType>): void | Promise<void>;
}

let commands: Record<string, CustomCommand> = {
    help: {
        data: {
            name: "help",
            description: "See documentation, credits, and our help server!",
            options: [
                {
                    name: "my-arg",
                    description: "AAAAAHHHH!!!",
                    type: "STRING",
                    required: true,
                }
            ],
        },
        async execute(interaction) {
            await interaction.reply({
                //content: "Pong!",
                embeds: [
                    new MessageEmbed()
                        .setAuthor({
                            name: "A person (totally not a bot trying to conquer the world)",
                        })
                        .setColor(interaction.options.get("my-arg", true).value! as ColorResolvable)
                        .setTitle('Help')
                        .setDescription('Use a slash command its not that hard nerd')
                ],
                ephemeral: true,
            });
        },
    },
};

export default commands;