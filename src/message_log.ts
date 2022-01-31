import {
	MessageEmbed,
} from 'discord.js';
import {
	client,
} from "./client";

/**Sends a message with a title, body, footer, and a side color. */
let messageLog = function(channel, title, message, subMessage, color) {
	(client.channels.cache.find((channel) => (channel as any).id === channel) as any).send({
		embeds: [
			new MessageEmbed()
				.setColor(color)
				.setTitle(title)
				.setDescription(message)
				.setFooter({
					text: subMessage
				}),
		],
	});
}
export default messageLog;