import * as database from "../adapters/database";
import { ServerPrefs } from "./types";
import verses from "./verses";

async function nextVerse(serverID) {
	let serverInfo: ServerPrefs;
	await database.getServerPreferences(serverID)
		.then((serverPrefs) => {
			if (verses.length > serverPrefs["verse"] + 1) {
				serverInfo = {
					channelID: serverPrefs["channelID"],
					time: serverPrefs["time"],
					roleID: serverPrefs["roleID"],
					timezone: serverPrefs["timezone"],
					hour: serverPrefs["hour"],
					minute: serverPrefs["minute"],
					verse: serverPrefs["verse"] + 1,
				};
			} else {
				serverInfo = {
					channelID: serverPrefs["channelID"],
					time: serverPrefs["time"],
					roleID: serverPrefs["roleID"],
					timezone: serverPrefs["timezone"],
					hour: serverPrefs["hour"],
					minute: serverPrefs["minute"],
					verse: 0,
				};
			}
	});

	await database.registerServerPreferences(serverID, serverInfo);
}

export default nextVerse;
