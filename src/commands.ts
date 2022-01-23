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
} from 'discord.js';
import { SlashCommandBuilder }  from "@discordjs/builders";
dotenv.config();
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

interface CustomCommand {
    data: ApplicationCommandDataResolvable;
    execute(interaction: CommandInteraction<CacheType>): void | Promise<void>;
}

let commands: Record<string, CustomCommand> = {
    //
    feedback: {
        data: {
            name: "feedback",
            description: "Send us some feedback about Bible verse recommendations, bugs, and new ideas!",
            options: [
                {
                    name: "about",
                    description: "What do you want to send feedback about?",
                    type: "SUB_COMMAND_GROUP",
                    options: [
                        {
                            name: "verse",
                            description: "Send us a bible verse that you think would be a great daily scripture!",
                            type: "SUB_COMMAND",
                            options: [
                                {
                                    name: "verse",
                                    description: "What verse do you recommend?",
                                    type: "STRING",
                                    required: true,
                                },
                            ],
                        },
                        {
                            name: "bug",
                            description: "Report a bug to us!",
                            type: "SUB_COMMAND",
                            options: [
                                {
                                    name: "bug-description",
                                    description: "What bug did you find?",
                                    type: "STRING",
                                    required: true,
                                },
                            ],
                        },
                        {
                            name: "idea",
                            description: "Recommend a new idea for the bot!",
                            type: "SUB_COMMAND",
                            options: [
                                {
                                    name: "idea-description",
                                    description: "What idea did you have?",
                                    type: "STRING",
                                    required: true,
                                },
                            ],
                        },
                    ],
                }
            ],
        },
        async execute(interaction) {
            interaction.commandName
            let content = "Your suggestion is:\n"
            //console.log(interaction.options.get("verse", true));
            if (interaction.options.getSubcommand() === "verse") {
                content += interaction.options.get("verse", true).value! as string;
            } else if (interaction.options.getSubcommand() === "bug") {
                content += interaction.options.get("bug-description", true).value! as string;
            } else if (interaction.options.getSubcommand() === "idea") {
                content += interaction.options.get("idea-description", true).value! as string;
            }

            let userID = interaction.user.id;
            let guildID = interaction.guildId;
            let guildSize = interaction.guild.memberCount;
            let interactionID = interaction.id;
            //Send embed
            await interaction.reply({
                //content: "Pong!",
                embeds: [
                    new MessageEmbed()
                        .setColor("#389af0")
                        .setTitle("Feedback has been sent!")
                        .setDescription(content)
                        .setFooter({
                            text: "Server ID: " + guildID + "\n"
                            + "User ID: " + userID + "\n"
                            + "Server Size: " + guildSize + "\n"
                            + "Message ID: " + interactionID,
                        })
                ],
                ephemeral: true,
            });
        },
    },
    //
};

export default commands;