import { LogBackgroundColor } from "@spt/models/spt/logging/LogBackgroundColor";
import { LogTextColor } from "@spt/models/spt/logging/LogTextColor";
import { IDatabaseTables } from "@spt/models/spt/server/IDatabaseTables";
import { ILogger } from "@spt/models/spt/utils/ILogger";

export function handleHideout(tables: IDatabaseTables, logger: ILogger): void {
	const hideout = tables.hideout;

	//Boost effect of adding GPU
	hideout.settings.gpuBoostRate = 2;

	for (const data in hideout.production.recipes) {
		const productionData = hideout.production.recipes[data];
		//Bitcoin Farm Output Capacity Increase
		if (productionData._id == "5d5c205bd582a50d042a3c0e") {
			productionData.productionLimitCount = 10;
		}
	}

	//Speed up hideout construction
	for (const data in hideout.areas) {
		const areaData = hideout.areas[data];
		for (const i in areaData.stages) {
			if (areaData.stages[i].constructionTime > 0) {
				areaData.stages[i].constructionTime =
					areaData.stages[i].constructionTime * 0.25;
			}
		}
	}

	logger.logWithColor(
		"Handled Hideout",
		LogTextColor.BLACK,
		LogBackgroundColor.YELLOW
	);
}
