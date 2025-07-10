import { LogBackgroundColor } from "@spt/models/spt/logging/LogBackgroundColor";
import { LogTextColor } from "@spt/models/spt/logging/LogTextColor";
import { IDatabaseTables } from "@spt/models/spt/server/IDatabaseTables";
import { ILogger } from "@spt/models/spt/utils/ILogger";

export function handleLocations(
	tables: IDatabaseTables,
	logger: ILogger
): void {
	const locations = tables.locations;

	//Enable insurance on labs
	locations.laboratory.base.Insurance = true;

	for (const location in locations) {
		if (location !== "base") {
			extendRaidTimers(location, locations[location]);
			speedUpCarExtract(locations[location], logger);
		}
	}
	logger.logWithColor(
		"Handled Locations",
		LogTextColor.BLACK,
		LogBackgroundColor.YELLOW
	);
}

function speedUpCarExtract(location: any, logger): void {
	logger.logWithColor(
		"LOCATIONS:" + location,
		LogTextColor.RED,
		LogBackgroundColor.WHITE
	);
	location.allExtracts
		.filter((extract: { PassageRequirement: string }) => {
			extract.PassageRequirement.includes("TransferItem");
		})
		.forEach((extract) => {
			extract.ExfiltrationTime = 20;
		});
}

function extendRaidTimers(map: string, location: any): void {
	if (map === "lighthouse" || map === "woods") {
		location.base.exit_access_time = 90;
		location.base.EscapeTimeLimit = 90;
	} else {
		location.base.exit_access_time += 10;
		location.base.EscapeTimeLimit += 10;
	}
}
