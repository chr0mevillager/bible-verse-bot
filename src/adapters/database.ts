import { promises as fs } from "fs";
import {
	ServerPrefs,
} from "../exports/types";

const fileLoc = "./src/server_info.json";

let jsonFile = fs.readFile(fileLoc, "utf8")
	.then((jsonStr) => {
		return JSON.parse(jsonStr);
	});

export async function getServerPreferences(serverId: string): Promise<ServerPrefs | null> {
	let data = await jsonFile;
	return data[serverId] || null;
}

export async function registerServerPreferences(serverId: string, serverPreferences: ServerPrefs) {
	let data = await jsonFile;
	data[serverId] = serverPreferences;
	await saveDB();
}

export async function listServers() {
	let data = await jsonFile;
	return Object.keys(data);
}

async function saveDB() {
	await fs.writeFile(fileLoc, JSON.stringify(await jsonFile, null, "\t"));
}