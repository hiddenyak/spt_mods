import { LogBackgroundColor } from "@spt/models/spt/logging/LogBackgroundColor";
import { LogTextColor } from "@spt/models/spt/logging/LogTextColor";
import { IDatabaseTables } from "@spt/models/spt/server/IDatabaseTables";
import { ILogger } from "@spt/models/spt/utils/ILogger";

export function handleItems(
	tables: IDatabaseTables,
	ragfairConfig: any,
	itemConfig: any,
	logger: ILogger
): void {
	const items = tables.templates.items;
	const locales = tables.locales.global["en"];

	for (const id in items) {
		removeDiscardLimit(items[id]);
		removeFilterOnSecureContainer(items[id]);
		buffAmmoStackSize(items[id], locales);
		removeGearDebuffs(items[id]);
		decreaseWeight(items[id]);
		handleRepairKit(items[id]);
		blacklistFlareItems(items[id], itemConfig);
		ragfairConfig.dynamic.blacklist.custom.push(id);
	}

	logger.logWithColor(
		"Handled Items",
		LogTextColor.BLACK,
		LogBackgroundColor.YELLOW
	);
}

function blacklistFlareItems(item: any, itemConfig: any): void {
	if (
		Array.isArray(item._props.FlareTypes) &&
		item._props.FlareTypes.length > 0 &&
		item._name != "Ammo"
	) {
		itemConfig.blacklist.push(item._id);
	}
}

function removeDiscardLimit(item: any): void {
	if (item._type == "Item" && item._props.DiscardLimit !== undefined) {
		item._props["DiscardLimit"] = -1;
	}
}

function removeFilterOnSecureContainer(item: any): void {
	if (
		item._parent == "5448bf274bdc2dfc2f8b456a" ||
		item._parent == "5448e53e4bdc2d60728b4567"
	) {
		if (item._props.Grids[0]._props.filters !== undefined) {
			item._props.Grids[0]._props.filters = [];
		}
	}
}

function buffAmmoStackSize(item: any, locales: any): void {
	// Skip if not ammo or has flare types
	if (
		item._parent !== "5485a8684bdc2da71d8b4567" ||
		(Array.isArray(item._props.FlareTypes) && item._props.FlareTypes.length > 0)
	) {
		return;
	}

	item._props["StackMaxSize"] = 100;

	let damageMult = 1;
	if (item._props.ammoType === "buckshot") {
		damageMult = item._props.buckshotBullets;
	}

	const stringToAppend =
		" (" +
		item._props.Damage * damageMult +
		"/" +
		item._props.PenetrationPower +
		")";

	//Append damage and penetration to the name
	locales[`${item._id} Name`] = locales[`${item._id} Name`] + stringToAppend;
}

function removeGearDebuffs(item: any): void {
	if (item._props.mousePenalty) {
		item._props["mousePenalty"] = 0;
	}

	if (item._props.weaponErgonomicPenalty) {
		item._props["weaponErgonomicPenalty"] = 0;
	}

	// if (item._props.speedPenaltyPercent) {
	// 	item._props["speedPenaltyPercent"] = 0;
	// }
}

function decreaseWeight(item: any): void {
	if (
		item._type !== "Node" &&
		item._type !== undefined &&
		item._parent !== "557596e64bdc2dc2118b4571" &&
		item._parent !== "55d720f24bdc2d88028b456d"
	) {
		item._props["Weight"] = Math.round(0.5 * item._props.Weight * 100) / 100;
	}
}

function handleRepairKit(item: any): void {
	if (item._props.MaxRepairKitDegradation !== undefined) {
		item._props.MinRepairKitDegradation = 0;
		item._props.MaxRepairKitDegradation = 0;
	}
}
