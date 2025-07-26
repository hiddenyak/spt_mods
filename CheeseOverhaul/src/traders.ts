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
	insuranceConfig.returnChancePercent[Traders.THERAPIST] = 100;

	//Remove buying restrictions from all items
	for (const assortR in traders) {
		if (assortR !== "ragfair" && assortR !== "638f541a29ffd1183d187f57") {
			removeBuyRestrictions(traders[assortR].assort.items);
		}
	}

	// Change LL3 requirements for Ref to be 0.35
	tables.traders[Traders.REF].base.loyaltyLevels[2].minStanding = 0.35;
	// Change LL4 requirements for Ref to be 0.4
	tables.traders[Traders.REF].base.loyaltyLevels[3].minStanding = 0.4;

	logger.logWithColor(
		"Handled Traders",
		LogTextColor.BLACK,
		LogBackgroundColor.YELLOW
	);
}

function removeBuyRestrictions(items: any): void {
	for (const level in items) {
		if (items[level].upd?.["BuyRestrictionMax"] !== undefined) {
			delete items[level].upd["BuyRestrictionMax"];
		}
	}
}
