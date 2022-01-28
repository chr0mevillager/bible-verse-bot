import dotenv from "dotenv";
import {
    MessageEmbed,
} from 'discord.js';
dotenv.config();

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