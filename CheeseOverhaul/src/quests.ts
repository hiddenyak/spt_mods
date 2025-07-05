import { LogBackgroundColor } from "@spt/models/spt/logging/LogBackgroundColor";
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
				}
			}
		}
	}

	fixTransitQuests(tables);

	logger.logWithColor(
		"Handled Quests",
		LogTextColor.BLACK,
		LogBackgroundColor.YELLOW
	);
}

function fixTransitQuests(tables: IDatabaseTables) {
	fixTask(tables, "66ab970848ddbe9d4a0c49a8", "66ab970848ddbe9d4a0c49ab"); // Special Comms
	fixTask(tables, "66e01ae0c391e4c94903d220", "66e2c832596e2895181e1bd4"); // Cream of the Crop
	fixTask(tables, "67040c78bf4be8a4ef041a65", "67262b4023c03479138728fa"); // Sample IV

	// Foresters Duty
	fixTask(
		tables,
		"66ab9da7eb102b9bcd08591c",
		"66ab9da7eb102b9bcd08591f",
		true,
		[
			"66ab9da7eb102b9bcd08591d",
			"66ab9da7eb102b9bcd08591f",
			"66ab9da7eb102b9bcd085922",
		]
	);

	// New Day New Paths
	fixTask(
		tables,
		"66aa58245ab22944110db6e9",
		"66aa5be8035c6a410dc570b2",
		true,
		[
			"66aa5b2cecad9c067780924b",
			"66aa5bb281dff8466b076894",
			"66aa5be8035c6a410dc570b2",
			"66aa5c88c085db7d8158db4a",
			"66aa5c8ba8c36eaef492ef92",
			"66b0e57eddc25d8d17e3e3c0",
		]
	);

	// Know your place
	fixTask(
		tables,
		"66aa61663aa37705c5024277",
		"66aa61663aa37705c502427c",
		true,
		["66aa61663aa37705c5024278", "66aa61663aa37705c502427e"]
	);

	// Secrets of Polikhim
	fixTask(
		tables,
		"66aa74571e5e199ecd094f18",
		"66aa74571e5e199ecd094f1b",
		true,
		["66aa74571e5e199ecd094f1e"]
	);

	// Beneath the streets
	fixTask(
		tables,
		"66aba85403e0ee3101042877",
		"66aba85403e0ee310104287a",
		true,
		[
			"66aba85403e0ee3101042878",
			"66aba97b1000025218c82ea8",
			"66b090f5723e7bbe8b518ca8",
			"66b0910951c5294b9d213918",
			"66b10eef0951e90ec383850b",
		]
	);
}

function fixTask(
	tables: IDatabaseTables,
	questId: string,
	transitId: string,
	oneSession = false,
	taskText = undefined
) {
	const quest = Object.values(tables.templates.quests).find(
		(q) => q._id === questId
	);
	const global = tables.locales.global;

	quest.conditions.AvailableForFinish =
		quest.conditions.AvailableForFinish.filter((c) => c.id !== transitId);
	if (oneSession) {
		quest.conditions.AvailableForFinish.forEach(
			(c: any) => (c.oneSessionOnly = false)
		);
		if (taskText) {
			for (const entry of taskText) {
				for (const language of Object.keys(global)) {
					global[language][entry] = global[language][entry].replace(
						/\([^)]*\)/g,
						""
					);
				}
			}
		}
	}
}
