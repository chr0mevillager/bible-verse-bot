import {
	CustomCommand,
} from "../exports/types";

import feedback from "./feedback";
import help from "./help";
import info from "./info";

/**A list of slash commands*/
const commands: Record<string, CustomCommand> = {
	feedback,
	help,
	info,
};

export default commands;