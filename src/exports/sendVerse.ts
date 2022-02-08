import { client } from "./client";
import { MessageEmbed } from "discord.js";
import verses from "./verses";
import * as database from "../adapters/database";
import { ServerPrefs } from "./types";
import nextVerse from "./nextVerse"

async function verseSendFactory(verse: number, serverID: string, channelID: string, pingGroup: string) {
	return () => {
		nextVerse(serverID);
		let channel = client.channels.cache.find((channel) => channel.id === channelID);
		if (channel && channel.type === "GUILD_TEXT") {
			if (pingGroup != "No Role") {
				channel.send("<@&" + pingGroup + ">");
		}
			channel.send({
				embeds: [
					new MessageEmbed()
						.setColor("#389af0")
						.setTitle(verses[verse].text)
						.setFooter({text: verses[verse].title + " " + verses[verse].translation})
						.setDescription("")
				]
			});
		}
	};
}

export default verseSendFactory;
