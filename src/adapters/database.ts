import { promises as fs } from "fs";

let jsonFile = fs.readFile("./src/server_info.json", "utf8")
	.then((jsonStr) => {
		return JSON.parse(jsonStr);
	});

export async function getServerPreferences(serverId: string) {
	let data = await jsonFile;
	return data[serverId];
}

export async function listServers() {
	let data = await jsonFile;
	return Object.keys(data);
}