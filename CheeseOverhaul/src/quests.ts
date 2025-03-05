import { LogTextColor } from "@spt/models/spt/logging/LogTextColor";
import { IDatabaseTables } from "@spt/models/spt/server/IDatabaseTables";
import { ILogger } from "@spt/models/spt/utils/ILogger";

export function handleQuests(
	tables: IDatabaseTables,
	questsConfig: any,
	logger: ILogger
): void {
	const quests = tables.templates.quests;

	//Extend quest reward expiry to 7 days
	questsConfig.mailRedeemTimeHours["default"] = 168;

	//Remove time requirements from all quests
	for (const quest in quests) {
		const conditionsAOS = quests[quest].conditions.AvailableForStart;

		if (conditionsAOS !== undefined) {
			for (const condition in conditionsAOS) {
				if (
					conditionsAOS[condition]?.conditionType === "Quest" &&
					conditionsAOS[condition]?.availableAfter > 0
				) {
					conditionsAOS[condition].availableAfter = 0;
					logger.logWithColor(
						`${quests[quest].QuestName} Time requirement removed.`,
						LogTextColor.GREEN
					);
				}
			}
		}
	}
}
