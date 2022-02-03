import { kill } from "process";
import verseSendFactory from "./sendVerse";
import { CronJob } from "cron";

let jobs: Record<string, CronJob> = {};

export default async function startJob(serverID: string, channelID: string, timeZone: string, time: string) {

	if (jobs[serverID]) {
		jobs[serverID].stop();
	}

	jobs[serverID] = new CronJob(time, await verseSendFactory(channelID), null, true, timeZone);

	//CronJob(time, verseSendFactory(channelID), null, true, timeZone).stop();
	// let job = [
	// 	serverID
	// ]
	// for (let i = 0; i < 1; i++) {
	// 	job.push(new CronJob(time, verseSendFactory(channelID), null, true, timeZone));
	// }
	// job[1].start();

	// jobs = {
	// 	jobs,
	// 	serverID: job,
	// }
	console.log(jobs[serverID]);
}