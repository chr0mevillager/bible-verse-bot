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

client.on("interactionCreate", async (interaction) => {
    if(interaction.isCommand()) {
        const command = commands[interaction.commandName];
        try {
            await command.execute(interaction);
        } catch(err) {
            console.error(err);
            await interaction.reply({
                content: "You just found an ultra-rare bug! Please report this by using the \"/feedback\" command, or try again.",
                ephemeral: true,
            });
        }
    }
});

client.once('ready', () => {
    console.log("It's alive! (Probably)");
    client.user.setActivity('/help', { type: 'LISTENING' });

    const guild = client.guilds.cache.get(process.env.SLASH_COMMAND_TESTING_GUILD);
    if(guild) {
        Object.values(commands).forEach((command) => {
            guild.commands.create(command.data);
        });
    }
});

client.login(process.env.DISCORD_AUTH);