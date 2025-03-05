import { DependencyContainer } from "tsyringe";

import { IPostDBLoadMod } from "@spt/models/external/IPostDBLoadMod";
import { DatabaseServer } from "@spt/servers/DatabaseServer";
import { IDatabaseTables } from "@spt/models/spt/server/IDatabaseTables";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { LogTextColor } from "@spt/models/spt/logging/LogTextColor";
import { LogBackgroundColor } from "@spt/models/spt/logging/LogBackgroundColor";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { ConfigTypes } from "@spt/models/enums/ConfigTypes";
import { art } from "./art";
import { handleSkills } from "./skills";
import { handleProfiles } from "./profiles";
import { handleItems } from "./items";
import { handleQuests } from "./quests";
import { handleContainers } from "./containers";
import { handleEvents } from "./events";
import { handleTraders } from "./traders";
import { handleHideout } from "./hideout";
import { handleMiscellaneous } from "./miscellaneous";

class Mod implements IPostDBLoadMod {
	postDBLoad(container: DependencyContainer): void {
		const logger = container.resolve<ILogger>("WinstonLogger");
		const tables: IDatabaseTables = container
			.resolve<DatabaseServer>("DatabaseServer")
			.getTables();

		const configServer = container.resolve<ConfigServer>("ConfigServer");
		const repairConfig = configServer.getConfig(ConfigTypes.REPAIR);
		const insuranceConfig = configServer.getConfig(ConfigTypes.INSURANCE);
		const questConfig = configServer.getConfig(ConfigTypes.QUEST);
		const ragfairConfig = configServer.getConfig(ConfigTypes.RAGFAIR);

		handleSkills(tables, logger);
		handleProfiles(tables, logger);
		handleContainers(tables, logger);
		handleEvents(tables, logger);
		handleHideout(tables, logger);

		handleItems(tables, ragfairConfig, logger);
		handleQuests(tables, questConfig, logger);
		handleTraders(tables, insuranceConfig, logger);
		handleMiscellaneous(tables, repairConfig, logger);

		//Enable all quests DEV ONLY
		const quests = tables.templates.quests;
		for (const id in quests) {
			const questData = quests[id];
			questData.conditions.AvailableForStart = [];
		}

		//Increase stash level at each level
		// items["566abbc34bdc2d92178b4576"]._props.Grids[0]._props.cellsV = 80;
		// items["5811ce572459770cba1a34ea"]._props.Grids[0]._props.cellsV = 80;
		// items["5811ce662459770f6f490f32"]._props.Grids[0]._props.cellsV = 80;
		// items["5811ce772459770e9e5f9532"]._props.Grids[0]._props.cellsV = 80;
		logger.logWithColor(art, LogTextColor.YELLOW, LogBackgroundColor.BLACK);
	}
}

module.exports = { mod: new Mod() };

export const mod = new Mod();
