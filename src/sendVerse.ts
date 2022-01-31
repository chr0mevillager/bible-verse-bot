import { client } from "./client";
import { MessageEmbed } from "discord.js";

function verseSendFactory(channelId: string) {
	(client.channels.cache.find((channel) => (channel as any).id === channelId) as any).send("test");
}

export default verseSendFactory;