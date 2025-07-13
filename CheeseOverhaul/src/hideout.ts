import { LogBackgroundColor } from "@spt/models/spt/logging/LogBackgroundColor";
import { LogTextColor } from "@spt/models/spt/logging/LogTextColor";
import { IDatabaseTables } from "@spt/models/spt/server/IDatabaseTables";
import { ILogger } from "@spt/models/spt/utils/ILogger";

export function handleHideout(tables: IDatabaseTables, logger: ILogger): void {
	const hideout = tables.hideout;

	boostGPUProduction(hideout);
	increaseBitcoinFarmLimit(hideout);
	modifyHideoutAreas(hideout);

	logger.logWithColor(
		"Handled Hideout",
		LogTextColor.BLACK,
		LogBackgroundColor.YELLOW
	);
}

function boostGPUProduction(hideout: IDatabaseTables["hideout"]): void {
	hideout.settings.gpuBoostRate = 2;
}

function increaseBitcoinFarmLimit(hideout: IDatabaseTables["hideout"]): void {
	for (const recipe of Object.values(hideout.production.recipes)) {
		if (recipe._id === "5d5c205bd582a50d042a3c0e") {
			recipe.productionLimitCount = 10;
		}
	}
}

function modifyHideoutAreas(hideout: IDatabaseTables["hideout"]): void {
	for (const area of Object.values(hideout.areas)) {
		for (const stage of Object.values(area.stages)) {
			speedUpConstruction(stage);
			disableFIRRequirement(stage);
		}
	}
}

function speedUpConstruction(stage: any): void {
	if (stage.constructionTime > 0) {
		stage.constructionTime *= 0.25;
	}
}

function disableFIRRequirement(stage: any): void {
	if (stage.requirements?.length > 0) {
		for (const requirement of stage.requirements) {
			if ("isSpawnedInSession" in requirement) {
				requirement.isSpawnedInSession = false;
			}
		}
	}
}
