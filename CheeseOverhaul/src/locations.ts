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

	for (const map in locations) {
		if (map !== "base") {
			extendRaidTimers(locations[map]);
			speedUpCarExtract(locations[map]);
			extendRaidTimersOnSpecificMaps(map, locations[map]);
		}
	}
	logger.logWithColor(
		"Handled Locations",
		LogTextColor.BLACK,
		LogBackgroundColor.YELLOW
	);
}

function extendRaidTimers(location: any): void {
	if (isJSONValueDefined(location.base.exit_access_time)) {
		location.base.exit_access_time += 10;
	}
	if (isJSONValueDefined(location.base.EscapeTimeLimit)) {
		location.base.EscapeTimeLimit += 10;
	}
}

function speedUpCarExtract(location: any): void {
	location.allExtracts
		.filter((extract) => {
			extract.PassageRequirement.includes("TransferItem");
		})
		.forEach((extract) => {
			extract.ExfiltrationTime = 20;
		});
}

function extendRaidTimersOnSpecificMaps(map: string, location: any): void {
	if (map === "lighthouse" || map === "woods") {
		location.base.exit_access_time = 90;
		location.base.EscapeTimeLimit = 90;
	}
}

function isJSONValueDefined(value: { isNaN: any }) {
	return value !== undefined && !value.isNaN;
}
