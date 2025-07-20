import { LogBackgroundColor } from "@spt/models/spt/logging/LogBackgroundColor";
import { LogTextColor } from "@spt/models/spt/logging/LogTextColor";
import { IDatabaseTables } from "@spt/models/spt/server/IDatabaseTables";
import { ILogger } from "@spt/models/spt/utils/ILogger";

export function handleEvents(tables: IDatabaseTables, logger: ILogger): void {
	const today = new Date();

	handleDoubleExpWeekend(today, tables, logger);
}

function handleDoubleExpWeekend(
	today: Date,
	tables: IDatabaseTables,
	logger: ILogger
): void {
	if (
		today.getDay() == 6 ||
		today.getDay() == 0 ||
		(today.getDay() == 5 && today.getHours() >= 17)
	) {
		tables.globals.config.exp.match_end.survivedMult = 2.6;
		logger.logWithColor(
			"~~~~ DOUBLE EXP WEEKEND ~~~~",
			LogTextColor.RED,
			LogBackgroundColor.WHITE
		);
	}
}
