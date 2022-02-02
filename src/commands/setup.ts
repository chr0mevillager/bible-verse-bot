import { ChannelType } from 'discord-api-types';
import {
    MessageEmbed,
} from 'discord.js';
import {
    CustomCommand,
} from "../exports/types";
import { client } from "../exports/client";

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
                                choices: [
                                    {
                                        name: "0",
                                        value: "0"
                                    },
                                    {
                                        name: "15",
                                        value: "15"
                                    },
                                    {
                                        name: "30",
                                        value: "30"
                                    },
                                    {
                                        name: "45",
                                        value: "45"
                                    }
                                ],
                            },
                            {
                                name: "hour",
                                description: "Hour of the day",
                                type: 3,
                                required: true,
                                choices: [
                                    {
                                        name: "1 AM",
                                        value: "1"
                                    },
                                    {
                                        name: "2 AM",
                                        value: "2"
                                    },
                                    {
                                        name: "3 AM",
                                        value: "3"
                                    },
                                    {
                                        name: "4 AM",
                                        value: "4"
                                    },
                                    {
                                        name: "5 AM",
                                        value: "5"
                                    },
                                    {
                                        name: "6 AM",
                                        value: "6"
                                    },
                                    {
                                        name: "7 AM",
                                        value: "7"
                                    },
                                    {
                                        name: "8 AM",
                                        value: "8"
                                    },
                                    {
                                        name: "9 AM",
                                        value: "9"
                                    },
                                    {
                                        name: "10 AM",
                                        value: "10"
                                    },
                                    {
                                        name: "11 AM",
                                        value: "11"
                                    },
                                    {
                                        name: "12 PM",
                                        value: "12"
                                    },
                                    {
                                        name: "1 PM",
                                        value: "13"
                                    },
                                    {
                                        name: "2 PM",
                                        value: "14"
                                    },
                                    {
                                        name: "3 PM",
                                        value: "15"
                                    },
                                    {
                                        name: "4 PM",
                                        value: "16"
                                    },
                                    {
                                        name: "5 PM",
                                        value: "17"
                                    },
                                    {
                                        name: "6 PM",
                                        value: "18"
                                    },
                                    {
                                        name: "7 PM",
                                        value: "19"
                                    },
                                    {
                                        name: "8 PM",
                                        value: "20"
                                    },
                                    {
                                        name: "9 PM",
                                        value: "21"
                                    },
                                    {
                                        name: "10 PM",
                                        value: "22"
                                    },
                                    {
                                        name: "11 PM",
                                        value: "23"
                                    },
                                    {
                                        name: "12 AM",
                                        value: "24"
                                    },
                                ],
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
                        choices: [
                            {
                                name: "0",
                                value: "0"
                            },
                            {
                                name: "15",
                                value: "15"
                            },
                            {
                                name: "30",
                                value: "30"
                            },
                            {
                                name: "45",
                                value: "45"
                            }
                        ],
                    },
                    {
                        name: "hour",
                        description: "Hour of the day",
                        type: 3,
                        required: true,
                        choices: [
                            {
                                name: "1 AM",
                                value: "1"
                            },
                            {
                                name: "2 AM",
                                value: "2"
                            },
                            {
                                name: "3 AM",
                                value: "3"
                            },
                            {
                                name: "4 AM",
                                value: "4"
                            },
                            {
                                name: "5 AM",
                                value: "5"
                            },
                            {
                                name: "6 AM",
                                value: "6"
                            },
                            {
                                name: "7 AM",
                                value: "7"
                            },
                            {
                                name: "8 AM",
                                value: "8"
                            },
                            {
                                name: "9 AM",
                                value: "9"
                            },
                            {
                                name: "10 AM",
                                value: "10"
                            },
                            {
                                name: "11 AM",
                                value: "11"
                            },
                            {
                                name: "12 PM",
                                value: "12"
                            },
                            {
                                name: "1 PM",
                                value: "13"
                            },
                            {
                                name: "2 PM",
                                value: "14"
                            },
                            {
                                name: "3 PM",
                                value: "15"
                            },
                            {
                                name: "4 PM",
                                value: "16"
                            },
                            {
                                name: "5 PM",
                                value: "17"
                            },
                            {
                                name: "6 PM",
                                value: "18"
                            },
                            {
                                name: "7 PM",
                                value: "19"
                            },
                            {
                                name: "8 PM",
                                value: "20"
                            },
                            {
                                name: "9 PM",
                                value: "21"
                            },
                            {
                                name: "10 PM",
                                value: "22"
                            },
                            {
                                name: "11 PM",
                                value: "23"
                            },
                            {
                                name: "12 AM",
                                value: "24"
                            },
                        ],
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
        // if (interaction.options.getSubcommand() == "channel" || interaction.options.getSubcommand() == "all") {
        //     if (client.channels.cache.find((channel) => (channel as any).id === interaction.options.getChannel("channel")) as any != ChannelType.GuildText) {
        //         await interaction.reply({
        //             embeds: [
        //                 new MessageEmbed()
        //                     .setColor("#389af0")
        //                     .setTitle("Invalid settings!")
        //                     .setDescription("Please set the `channel` setting to be a text channel.")
        //             ],
        //             ephemeral: true,
        //         });
        //         return;
        //     }
        // }
        await interaction.reply({
            embeds: [
                new MessageEmbed()
                    .setColor("#389af0")
                    .setTitle("Your settings are updated!")
                    .setDescription(
                        "Channel: <#" + interaction.options.getChannel("channel") + ">\n" +
                        "Time: " + interaction.options.getString("hour") + ":" + interaction.options.getString("minute") + " (" + interaction.options.getString("timezone") + ")\n" +
                        "Pinged group: <@&" + interaction.options.getRole("group") + ">"
                    )
            ],
            ephemeral: true,
        });
    }
};

export default setup;