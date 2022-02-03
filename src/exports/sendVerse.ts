import { client } from "./client";
import { MessageEmbed } from "discord.js";

async function verseSendFactory(channelId: string) {
	return () => {
		let channel = client.channels.cache.find((channel) => channel.id === channelId);
		if (channel && channel.type === "GUILD_TEXT") {
			channel.send("test");
		}
	};
}

export default verseSendFactory;