import { LogBackgroundColor } from "@spt/models/spt/logging/LogBackgroundColor";
import { LogTextColor } from "@spt/models/spt/logging/LogTextColor";
import { IDatabaseTables } from "@spt/models/spt/server/IDatabaseTables"
import { ILogger } from "@spt/models/spt/utils/ILogger";

export function handleEvents(tables: IDatabaseTables, logger: ILogger): void {
	const today = new Date();
	const traders = tables.traders;

	handleDoubleExpWeekend(today, tables, logger);
	handleFireSaleFriday(today, traders, logger);
}

function handleDoubleExpWeekend(today: Date, tables: IDatabaseTables, logger: ILogger): void {
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

function handleFireSaleFriday(today: Date, traders: any, logger: ILogger): void {
	if (today.getDay() == 5) {
		for (const assortR in traders) {
			if (assortR !== "ragfair" && assortR !== "638f541a29ffd1183d187f57") {
				removeBuyRestrictions(traders[assortR].assort.items);
			}
		}
		logger.logWithColor(
			"~~~~ FIRE SALE FRIDAY ~~~~",
			LogTextColor.RED,
			LogBackgroundColor.YELLOW
		);
	}
}

function removeBuyRestrictions(items: any): void {
	for (const level in items) {
		if (items[level].upd?.["BuyRestrictionMax"] !== undefined) {
			delete items[level].upd["BuyRestrictionMax"];
		}
	}
}
