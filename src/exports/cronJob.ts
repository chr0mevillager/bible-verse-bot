import { kill } from "process";
import verseSendFactory from "./sendVerse";
import { CronJob } from "cron";

let jobs: Record<string, CronJob> = {};

export default async function startJob(serverID: string, channelID: string, timeZone: string, time: string) {
	if (jobs[serverID]) {
		await jobs[serverID].stop();
	}

	jobs[serverID] = new CronJob(time, await verseSendFactory(channelID), null, true, timeZone);
}
