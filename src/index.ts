import dotenv from "dotenv";
import {
    Client,
    Intents,
    Interaction,
    CommandInteraction,
    ApplicationCommandDataResolvable,
    CacheType,
} from 'discord.js';
import { SlashCommandBuilder }  from "@discordjs/builders";
dotenv.config();
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

interface CustomCommand {
    data: ApplicationCommandDataResolvable;
    execute(interaction: CommandInteraction<CacheType>): void | Promise<void>;
}

let commands: Record<string, CustomCommand> = {
    ping: {
        data: {
            name: "ping",
            description: "Does a thing.",
        },
        async execute(interaction) {
            await interaction.reply({
                content: "Pong!",
                ephemeral: true,
            });
        },
    },
};

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