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
import commands from "./commands";
dotenv.config();
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

interface CustomCommand {
    data: ApplicationCommandDataResolvable;
    execute(interaction: CommandInteraction<CacheType>): void | Promise<void>;
}

// let commands: Record<string, CustomCommand> = {
//     help: {
//         data: {
//             name: "help",
//             description: "See documentation, credits, and our help server!",
//             options: [
//                 {
//                     name: "my-arg",
//                     description: "AAAAAHHHH!!!",
//                     type: "STRING",
//                     required: true,
//                 }
//             ],
//         },
//         async execute(interaction) {
//             await interaction.reply({
//                 //content: "Pong!",
//                 embeds: [
//                     new MessageEmbed()
//                         .setAuthor({
//                             name: "A person (totally not a bot trying to conquer the world)",
//                         })
//                         .setColor(interaction.options.get("my-arg", true).value! as ColorResolvable)
//                         .setTitle('Help')
//                         .setDescription('Use a slash command its not that hard nerd')
//                 ],
//                 ephemeral: true,
//             });
//         },
//     },
// };

client.on("interactionCreate", async (interaction) => {
    if(interaction.isCommand()) {
        const command = commands[interaction.commandName];
        try {
            await command.execute(interaction);
        } catch(err) {
            console.error(err);
            await interaction.reply({
                content: "There was an error executing this command",
                ephemeral: true,
            });
        }
    }
});

client.once('ready', () => {
    console.log("It's alive! (Probably)");

    const guild = client.guilds.cache.get(process.env.SLASH_COMMAND_TESTING_GUILD);
    if(guild) {
        Object.values(commands).forEach((command) => {
            guild.commands.create(command.data);
        });
    }
});

client.login(process.env.DISCORD_AUTH);