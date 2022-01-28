import dotenv from "dotenv";
//import message_log from "./message_log";
import {
    MessageEmbed,
} from 'discord.js';
dotenv.config();

let	feedback = {
    data: {
        name: "feedback",
        description: "Send us some feedback about Bible verse recommendations, bugs, and new ideas!",
        options: [{
            name: "about",
            description: "What do you want to send feedback about?",
            type: 2,
            options: [
                {
                    name: "verse",
                    description: "Send us a bible verse that you think would be a great daily scripture!",
                    type: "SUB_COMMAND",
                    options: [{
                        name: "verse",
                        description: "What verse do you recommend?",
                        type: "STRING",
                        required: true,
                    }],
                },
                {
                    name: "bug",
                    description: "Report a bug to us!",
                    type: "SUB_COMMAND",
                    options: [{
                        name: "bug-description",
                        description: "What bug did you find?",
                        type: "STRING",
                        required: true,
                    }],
                },
                {
                    name: "idea",
                    description: "Recommend a new idea for the bot!",
                    type: "SUB_COMMAND",
                    options: [{
                        name: "idea-description",
                        description: "What idea did you have?",
                        type: "STRING",
                        required: true,
                    }],
                },
            ]
        }],
    },
    async execute(interaction) {

        let userID = interaction.user.id;
        let guildID = interaction.guildId;
        let guildSize = interaction.guild.memberCount;
        let interactionID = interaction.id;
        let sub_message = "Server ID: " + guildID + "\n"
                        + "User ID: " + userID + "\n"
                        + "Server Size: " + guildSize + "\n"
                        + "Message ID: " + interactionID;

        let content = "Your suggestion is:\n"
        //console.log(interaction.options.get("verse", true));
        if (interaction.options.getSubcommand() === "verse") {
            content += interaction.options.get("verse", true).value! as string;
            //message_log("934973278215372851", "Feedback:", content, sub_message, "#389af0")
            // (client.channels.cache.find((channel) => (channel as any).id === "934973278215372851") as any).send({
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
};

export default feedback;