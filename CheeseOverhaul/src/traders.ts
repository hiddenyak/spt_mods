import { Traders } from "@spt/models/enums/Traders";
import { LogBackgroundColor } from "@spt/models/spt/logging/LogBackgroundColor";
import { LogTextColor } from "@spt/models/spt/logging/LogTextColor";
import { IDatabaseTables } from "@spt/models/spt/server/IDatabaseTables";
import { ILogger } from "@spt/models/spt/utils/ILogger";

export function handleTraders(
	tables: IDatabaseTables,
	insuranceConfig: any,
	logger: ILogger
): void {
	const traders = tables.traders;

	traders[Traders.PRAPOR].base.insurance.min_return_hour = 6;
	traders[Traders.PRAPOR].base.insurance.max_return_hour = 24;
	traders[Traders.THERAPIST].base.insurance.min_return_hour = 6;
	traders[Traders.THERAPIST].base.insurance.max_return_hour = 12;
	traders[Traders.THERAPIST].base.loyaltyLevels[1].insurance_price_coef = 5;
	traders[Traders.THERAPIST].base.loyaltyLevels[1].insurance_price_coef = 4;
	traders[Traders.THERAPIST].base.loyaltyLevels[1].insurance_price_coef = 3;
	traders[Traders.THERAPIST].base.loyaltyLevels[1].insurance_price_coef = 2;
	insuranceConfig.returnChancePercent[Traders.THERAPIST] = 100;

	logger.logWithColor(
		"Tweaked insurance settings",
		LogTextColor.BLACK,
		LogBackgroundColor.YELLOW
	);
}
