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
	for (const quest of Object.values(quests)) {
		const questStartingCondition = quest.conditions?.AvailableForStart;
		if (!questStartingCondition) continue;

		for (const condition of questStartingCondition) {
			if (
				condition?.conditionType === "Quest" &&
				condition?.availableAfter > 0
			) {
				condition.availableAfter = 0;
			}
		}
	}

	fixTransitQuests(tables);
	fixArenaQuests(tables);

	logger.logWithColor(
		"Handled Quests",
		LogTextColor.BLACK,
		LogBackgroundColor.YELLOW
	);
}

function fixTransitQuests(tables: IDatabaseTables) {
	const multiFixes = [
		{
			// Special Comms
			questId: "66ab970848ddbe9d4a0c49a8",
			transitId: "66ab970848ddbe9d4a0c49ab",
		},
		{
			// Cream of the Crop
			questId: "66e01ae0c391e4c94903d220",
			transitId: "66e2c832596e2895181e1bd4",
		},
		{
			// Sample IV
			questId: "67040c78bf4be8a4ef041a65",
			transitId: "67262b4023c03479138728fa",
		},
		{
			// Foresters Duty
			questId: "66ab9da7eb102b9bcd08591c",
			transitId: "66ab9da7eb102b9bcd08591f",
			oneSession: true,
			taskText: [
				"66ab9da7eb102b9bcd08591d",
				"66ab9da7eb102b9bcd08591f",
				"66ab9da7eb102b9bcd085922",
			],
		},
		{
			// New Day New Paths
			questId: "66aa58245ab22944110db6e9",
			transitId: "66aa5be8035c6a410dc570b2",
			oneSession: true,
			taskText: [
				"66aa5b2cecad9c067780924b",
				"66aa5bb281dff8466b076894",
				"66aa5be8035c6a410dc570b2",
				"66aa5c88c085db7d8158db4a",
				"66aa5c8ba8c36eaef492ef92",
				"66b0e57eddc25d8d17e3e3c0",
			],
		},
		{
			// Know your place
			questId: "66aa61663aa37705c5024277",
			transitId: "66aa61663aa37705c502427c",
			oneSession: true,
			taskText: ["66aa61663aa37705c5024278", "66aa61663aa37705c502427e"],
		},
		{
			// Secrets of Polikhim
			questId: "66aa74571e5e199ecd094f18",
			transitId: "66aa74571e5e199ecd094f1b",
			oneSession: true,
			taskText: ["66aa74571e5e199ecd094f1e"],
		},
		{
			// Beneath the streets
			questId: "66aba85403e0ee3101042877",
			transitId: "66aba85403e0ee310104287a",
			oneSession: true,
			taskText: [
				"66aba85403e0ee3101042878",
				"66aba97b1000025218c82ea8",
				"66b090f5723e7bbe8b518ca8",
				"66b0910951c5294b9d213918",
				"66b10eef0951e90ec383850b",
			],
		},
		{
			// Choose your friends wisely
			questId: "67460662d0fbbc74ca0f7229",
			transitId: "674606bac840f707bea6242f",
			oneSession: true,
		},
		{
			// Choose your friends wisely
			questId: "67460662d0fbbc74ca0f7229",
			transitId: "674606ccff406a9f6a28e26f",
			oneSession: true,
		},
		{
			// Choose your friends wisely
			questId: "67460662d0fbbc74ca0f7229",
			transitId: "674606f1c63637e54bede3a6",
			oneSession: true,
		},
		{
			// Choose your friends wisely
			questId: "67460662d0fbbc74ca0f7229",
			transitId: "6746071002dfd67c0629a379",
			oneSession: true,
		},
		{
			// Inevitable Response
			questId: "673f6027352b4da8e00322d2",
			transitId: "67499a4f03b8295863172dea",
			oneSession: true,
		},
		{
			// The Price of Independence
			questId: "6744af0969a58fceba101fed",
			transitId: "6745c8ee54d6972417ad7bad",
			oneSession: true,
		},
		{
			// The Price of Independence
			questId: "6744af0969a58fceba101fed",
			transitId: "6745c90842db81af412eae97",
			oneSession: true,
		},
		{
			// The Price of Independence
			questId: "6744af0969a58fceba101fed",
			transitId: "6745c9623d362cd373b1de93",
			oneSession: true,
		},
		{
			// Seizing the initiative
			questId: "675c1d6d59b0575973008fc7",
			transitId: "675c1d6d59b0575973008fc9",
			oneSession: true,
		},
	];

	for (const fix of multiFixes) {
		fixTask(
			tables,
			fix.questId,
			fix.transitId,
			fix.oneSession ?? false,
			fix.taskText
		);
	}
}

function fixTask(
	tables: IDatabaseTables,
	questId: string,
	transitId: string,
	oneSession = false,
	taskText?: string[]
): void {
	const quest = Object.values(tables.templates.quests).find(
		(q) => q._id === questId
	);
	if (!quest) return;

	const finishConditions = quest.conditions?.AvailableForFinish;
	if (!finishConditions) return;

	quest.conditions.AvailableForFinish = finishConditions.filter(
		(c) => c.id !== transitId
	);

	if (oneSession) {
		for (const condition of quest.conditions.AvailableForFinish) {
			condition.oneSessionOnly = false;
		}

		if (taskText?.length) {
			const locales = tables.locales.global;
			for (const lang of Object.keys(locales)) {
				for (const entry of taskText) {
					locales[lang][entry] =
						locales[lang][entry]?.replace(/\([^)]*\)/g, "") ??
						locales[lang][entry];
				}
			}
		}
	}
}

function fixArenaQuests(tables: IDatabaseTables) {
	questsThatRequireArena.forEach((questId) => {
		tables.templates.quests[questId].conditions.AvailableForFinish =
			modifiedAvailableForFinish;
	});
}

const modifiedAvailableForFinish = [
	{
		conditionType: "HandoverItem",
		dogtagLevel: 0,
		dynamicLocale: false,
		globalQuestCounterId: "",
		id: "596737cb86f77463a8115efd",
		index: 3,
		isEncoded: false,
		maxDurability: 100,
		minDurability: 0,
		onlyFoundInRaid: false,
		parentId: "",
		target: ["54491c4f4bdc2db1078b4568"],
		value: 2,
		visibilityConditions: [],
	},
];

const questsThatRequireArena: string[] = [
	"66058cc1da30b620a34e6e86", //To Great Heights - Part 1
	"66058cc208308761cf390993", //To Great Heights - Part 2
	"66058cc5bb83da7ba474aba9", //To Great Heights - Part 3
];
