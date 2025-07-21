import { LogBackgroundColor } from "@spt/models/spt/logging/LogBackgroundColor";
import { LogTextColor } from "@spt/models/spt/logging/LogTextColor";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { IDatabaseTables } from "@spt/models/spt/server/IDatabaseTables";

export function handleBots(tables: IDatabaseTables, logger: ILogger): void {
	const chance = 500;

	for (const botType in tables.bots.types) {
		if (botType.includes("boss") && botType == "bosstest") {
			const bossPockets = tables.bots.types[botType].inventory.items.Pockets;
			const bossTotal = Object.values(bossPockets).reduce((a, b) => a + b, 0);

			let value = 0;
			let guess = 0;
			let rollChance = 0;

			guess = (chance / 100) * bossTotal;
			value = Math.round((chance / 100) * (bossTotal + guess));
			rollChance = value / (bossTotal + value);

			logger.info(
				`[BossesHaveLegaMedals] ${botType}: Chance is ${Number(
					rollChance
				).toLocaleString(undefined, {
					style: "percent",
					minimumFractionDigits: 2,
				})}`
			);
			bossPockets["6656560053eaaa7a23349c86"] = value;
		}
	}

	logger.logWithColor(
		"Handled Bots",
		LogTextColor.BLACK,
		LogBackgroundColor.YELLOW
	);
}
