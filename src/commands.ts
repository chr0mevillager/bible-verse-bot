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
    DMChannel,
    TextChannel,
    Guild,
    ThreadChannel,
} from 'discord.js';
import { SlashCommandBuilder }  from "@discordjs/builders";
import { ChannelType } from "discord-api-types";
dotenv.config();
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

interface CustomCommand {
    data: ApplicationCommandDataResolvable;
    execute(interaction: CommandInteraction<CacheType>): void | Promise<void>;
}

let commands: Record<string, CustomCommand> = {
        //
        help: {
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
        },
    //
    info: {
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
    },
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

            let userID = interaction.user.id;
            let guildID = interaction.guildId;
            let guildSize = interaction.guild.memberCount;
            let interactionID = interaction.id;

            let content = "Your suggestion is:\n"
            //console.log(interaction.options.get("verse", true));
            if (interaction.options.getSubcommand() === "verse") {
                content += interaction.options.get("verse", true).value! as string;
                (client.channels.cache.find((channel) => (channel as any).id === "934973278215372851") as any).send({
                    embeds: [
                        new MessageEmbed()
                            .setColor("#389af0")
                            .setTitle("Feedback:")
                            .setDescription(content)
                            .setFooter({
                                text: "Server ID: " + guildID + "\n"
                                + "User ID: " + userID + "\n"
                                + "Server Size: " + guildSize + "\n"
                                + "Message ID: " + interactionID,
                            })
                    ],
                });
            } else if (interaction.options.getSubcommand() === "bug") {
                content += interaction.options.get("bug-description", true).value! as string;
                // (client.channels.cache.get("934973318396780604") as TextChannel).send({
                //     embeds: [
                //         new MessageEmbed()
                //             .setColor("#389af0")
                //             .setTitle("Feedback:")
                //             .setDescription(content)
                //             .setFooter({
                //                 text: "Server ID: " + guildID + "\n"
                //                 + "User ID: " + userID + "\n"
                //                 + "Server Size: " + guildSize + "\n"
                //                 + "Message ID: " + interactionID,
                //             })
                //     ],
                // });
            } else if (interaction.options.getSubcommand() === "idea") {
                content += interaction.options.get("idea-description", true).value! as string;
                // (client.channels.cache.get("934973303662186496") as TextChannel).send({
                    
                //     embeds: [
                //         new MessageEmbed()
                //             .setColor("#389af0")
                //             .setTitle("Feedback:")
                //             .setDescription(content)
                //             .setFooter({
                //                 text: "Server ID: " + guildID + "\n"
                //                 + "User ID: " + userID + "\n"
                //                 + "Server Size: " + guildSize + "\n"
                //                 + "Message ID: " + interactionID,
                //             })
                //     ],
                // });
            }
            
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