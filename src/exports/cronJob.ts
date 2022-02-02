import verseSendFactory from "./sendVerse";

let jobs = {};
let CronJob = require("cron").CronJob;

async function startJob(serverID, channelID, timeZone, time) {
	let job;
	for (let i = 0; i < 1; i++) {
		job += new CronJob(time, verseSendFactory(channelID), null, true, timeZone);
	}
	job.start();

	jobs = {
		jobs,
		serverID: job,
	}
}

export default startJob;