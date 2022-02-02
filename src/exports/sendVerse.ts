import { client } from "./client";
import { MessageEmbed } from "discord.js";

async function verseSendFactory(channelId) {
	(client.channels.cache.find((channel) => (channel as any).id === channelId) as any).send("test");
}

export default verseSendFactory;