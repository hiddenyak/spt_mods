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
			speedUpCarExtract(locations[location]);
		}
	}
	logger.logWithColor(
		"Handled Locations",
		LogTextColor.BLACK,
		LogBackgroundColor.YELLOW
	);
}

function speedUpCarExtract(location: any): void {
	location.base.exits
		.filter((exit: { PassageRequirement: string }) => {
			return exit.PassageRequirement?.includes("TransferItem");
		})
		.forEach(
			(exit: { ExfiltrationTime: number; ExfiltrationTimePVE: number }) => {
				exit.ExfiltrationTime = 20;
				exit.ExfiltrationTimePVE = 20;
			}
		);
}

function extendRaidTimers(map: string, location: any): void {
	if (map === "lighthouse" || map === "woods") {
		location.base.exit_access_time = 90;
		location.base.EscapeTimeLimit = 90;
	} else {
		//Add 10 minutes to each other map
		//Have to check if these properties exist, otherwise client will throw an error
		if (typeof location.base.exit_access_time === "number") {
			location.base.exit_access_time += 10;
		}

		if (typeof location.base.EscapeTimeLimit === "number") {
			location.base.EscapeTimeLimit += 10;
		}
	}
}
