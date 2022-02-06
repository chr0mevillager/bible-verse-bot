import { kill } from "process";
import verseSendFactory from "./sendVerse";
import { CronJob } from "cron";
import * as database from "../adapters/database";
import { ServerPrefs } from "./types";
import verses from "./verses";

let jobs: Record<string, CronJob> = {};

export default async function startJob(serverID: string) {
	if (jobs[serverID]) {
		await jobs[serverID].stop();
	}
	let serverInfo: ServerPrefs;
	await database.getServerPreferences(serverID)
		.then((serverPrefs) => {
			serverInfo = {
				channelID: serverPrefs["channelID"],
				time: serverPrefs["time"],
				roleID: serverPrefs["roleID"],
				timezone: serverPrefs["timezone"],
				hour: serverPrefs["hour"],
				minute: serverPrefs["minute"],
				verse: serverPrefs["verse"],
			};
	});
	jobs[serverID] = new CronJob(serverInfo.time, await verseSendFactory(serverInfo.verse, serverID, serverInfo.channelID), null, true, serverInfo.timezone);
	await database.registerServerPreferences(serverID, serverInfo);
}
