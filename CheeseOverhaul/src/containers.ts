import { ITemplateItem } from "@spt/models/eft/common/tables/ITemplateItem";
import { LogBackgroundColor } from "@spt/models/spt/logging/LogBackgroundColor";
import { LogTextColor } from "@spt/models/spt/logging/LogTextColor";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { bagsToBuff } from "./bagsToBuff";
import { IDatabaseTables } from "@spt/models/spt/server/IDatabaseTables"

export function handleContainers(
	tables: IDatabaseTables,
	logger: ILogger
): void {
	const items = tables.templates.items;

	buffBackpacks(items);
	buffContainers(items);

	logger.logWithColor(
		"Handled Containers",
		LogTextColor.BLACK,
		LogBackgroundColor.YELLOW
	);
}

function buffBackpacks(items: Record<string, ITemplateItem>) {
	bagsToBuff.forEach((itemId) => {
		setSize(items[itemId], 6, 10);
	});
}

function buffContainers(items: Record<string, ITemplateItem>) {
	setSize(items["619cbf7d23893217ec30b689"], 4, 4); //Injector Case
	setSize(items["590c60fc86f77412b13fddcf"], 8, 4); //Documents Case
	setSize(items["5b6d9ce188a4501afc1b2b25"], 12, 12); //Thicc Weapon Case
	setSize(items["5c0a840b86f7742ffa4f2482"], 16, 16); //Thicc Item Case
	setSize(items["5d235bb686f77443f4331278"], 10, 10); //Sicc Case
	setSize(items["5c093db286f7740a1b2617e3"], 10, 10); //Holodilnick
	setSize(items["5aafbcd986f7745e590fff23"], 10, 10); //Medicine Case
	setSize(items["5aafbde786f774389d0cbc0f"], 10, 10); //Ammo Case
	setSize(items["5c127c4486f7745625356c13"], 10, 10); //Magazine Case
	setSize(items["567143bf4bdc2d1a0f8b4567"], 6, 6); //Pistol Case
	setSize(items["59fb016586f7746d0d4b423a"], 12, 12); //Money Case
	setSize(items["5c093ca986f7740a1867ab12"], 6, 3); //Kappa
}

function setSize(
	container: ITemplateItem,
	horizontalSize: number,
	verticalSize: number
) {
	container._props.Grids[0]._props["cellsH"] = horizontalSize;
	container._props.Grids[0]._props["cellsV"] = verticalSize;
}
