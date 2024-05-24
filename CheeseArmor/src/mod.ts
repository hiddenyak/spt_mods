import { DependencyContainer } from "tsyringe";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { LogTextColor } from "@spt-aki/models/spt/logging/LogTextColor";
import { LogBackgroundColor } from "@spt-aki/models/spt/logging/LogBackgroundColor";
import { IPostDBLoadMod } from "@spt-aki/models/external/IPostDBLoadMod";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";
import { IDatabaseTables } from "@spt-aki/models/spt/server/IDatabaseTables";
import { Traders } from "@spt-aki/models/enums/Traders";
import {
	ITemplateItem,
	Props,
} from "@spt-aki/models/eft/common/tables/ITemplateItem";

class Mod implements IPostDBLoadMod {
	postDBLoad(container: DependencyContainer): void {
		const logger = container.resolve<ILogger>("WinstonLogger");
		const databaseServer = container.resolve<DatabaseServer>("DatabaseServer");

		const tables: IDatabaseTables = databaseServer.getTables();
		const items = tables.templates.items;
		const traders = tables.traders;
		const locales = tables.locales.global["en"];

		allowAnyPlatesInAnyArmor();

		function allowAnyPlatesInAnyArmor() {
			const armorChest = [];
			const armorBack = [];
			const armorSide = [];

			const armorChestColliders = [];
			const armorBackColliders = [];
			const armorSideColliders = [];

			for (const item in items) {
				if (
					items[item]._parent === "644120aa86ffbe10ee032b6f" &&
					items[item]._props?.Weight > 0
				) {
					if (
						items[item]._props?.armorPlateColliders.some((str) =>
							str.toLowerCase().endsWith("chest")
						)
					) {
						armorChest.push(items[item]._id);

						for (const collider in items[item]._props.armorPlateColliders) {
							if (
								!armorChestColliders.some((str) =>
									str.includes(items[item]._props.armorPlateColliders[collider])
								) &&
								!items[item]._props.armorPlateColliders[collider]
									.toLowerCase()
									.endsWith("back")
							) {
								armorChestColliders.push(
									items[item]._props.armorPlateColliders[collider]
								);
							}
						}
					}
					if (
						items[item]._props?.armorPlateColliders.some((str) =>
							str.toLowerCase().endsWith("back")
						)
					) {
						armorBack.push(items[item]._id);

						for (const collider in items[item]._props.armorPlateColliders) {
							if (
								!armorBackColliders.some((str) =>
									str.includes(items[item]._props.armorPlateColliders[collider])
								) &&
								!items[item]._props.armorPlateColliders[collider]
									.toLowerCase()
									.endsWith("chest")
							) {
								armorBackColliders.push(
									items[item]._props.armorPlateColliders[collider]
								);
							}
						}
					}
					if (
						items[item]._props?.armorPlateColliders.some((str) =>
							str.toLowerCase().endsWith("left_high")
						)
					) {
						armorSide.push(items[item]._id);

						for (const collider in items[item]._props.armorPlateColliders) {
							if (
								!armorSideColliders.some((str) =>
									str.includes(items[item]._props.armorPlateColliders[collider])
								)
							) {
								armorSideColliders.push(
									items[item]._props.armorPlateColliders[collider]
								);
							}
						}
					}
				}
			}

			for (const item in items) {
				if (
					items[item]._parent === "5448e5284bdc2dcb718b4567" ||
					items[item]._parent === "5448e54d4bdc2dcc718b4568"
				) {
					for (const slot in items[item]._props.Slots) {
						// Hard armor mods
						if (
							items[item]._props.Slots[slot]._name.toLowerCase() ==
							"front_plate"
						) {
							for (const armorChestID of armorChest) {
								if (
									!items[item]._props.Slots[slot]._props.filters[0].Filter.some(
										(str) => str.includes(armorChestID)
									)
								) {
									items[item]._props.Slots[slot]._props.filters[0].Filter.push(
										armorChestID
									);
								}
							}
							items[item]._props.Slots[
								slot
							]._props.filters[0].armorPlateColliders = armorChestColliders;
						}
						if (
							items[item]._props.Slots[slot]._name.toLowerCase() == "back_plate"
						) {
							for (const armorBackID of armorBack) {
								if (
									!items[item]._props.Slots[slot]._props.filters[0].Filter.some(
										(str) => str.includes(armorBackID)
									)
								) {
									items[item]._props.Slots[slot]._props.filters[0].Filter.push(
										armorBackID
									);
								}
							}
							items[item]._props.Slots[
								slot
							]._props.filters[0].armorPlateColliders = armorBackColliders;
						}
						if (
							items[item]._props.Slots[slot]._name.toLowerCase() ==
								"left_side_plate" ||
							items[item]._props.Slots[slot]._name.toLowerCase() ==
								"right_side_plate"
						) {
							for (const armorSideID of armorSide) {
								if (
									!items[item]._props.Slots[slot]._props.filters[0].Filter.some(
										(str) => str.includes(armorSideID)
									)
								) {
									items[item]._props.Slots[slot]._props.filters[0].Filter.push(
										armorSideID
									);
								}
							}
							items[item]._props.Slots[
								slot
							]._props.filters[0].armorPlateColliders = armorSideColliders;
						}
					}
				}
			}
		}

		// Object.values(items).forEach((item) => {
		// 	if (
		// 		item._id === "656fa61e94b480b8a500c0e8" ||
		// 		item._id === "6038b4ca92ec1c3103795a0d"
		// 	) {
		// 		console.log(item._name);
		// 	}
		// });

		// const cheesePlate = items["656fa61e94b480b8a500c0e8"];
		// cheesePlate._id = "cheese_plate";
		// cheesePlate._name = "cheese_plate";
		// cheesePlate._props.Name = "Cheese Plate";
		// cheesePlate._props.ShortName = "CHEEZ";
		// cheesePlate._props.Description =
		// 	"A plate with defense level of epic proportions";
		// cheesePlate._props.BackgroundColor = "yellow";
		// cheesePlate._props.Weight = 4;
		// cheesePlate._props.Durability = 100;
		// cheesePlate._props.armorPlateColliders = [
		// 	"Plate_Granit_SAPI_chest",
		// 	"Plate_Granit_SAPI_back",
		// 	"Plate_Korund_chest",
		// ];

		// items.cheese_plate = cheesePlate;

		// locales["cheese_plate Name"] = cheesePlate._props.Name;
		// locales["cheese_plate ShortName"] = cheesePlate._props.ShortName;
		// locales["cheese_plate Description"] = cheesePlate._props.Description;

		// const cheeseSlick = items["6038b4ca92ec1c3103795a0d"];
		// cheeseSlick._id = "cheese_slick";
		// cheeseSlick._name = "cheese_slick";
		// cheeseSlick._props.Name = "Cheese Slick";
		// cheeseSlick._props.ShortName = "CHEEZ";
		// cheeseSlick._props.Description =
		// 	"An armor with defense level of epic proportions";
		// cheeseSlick._props.BackgroundColor = "yellow";
		// cheeseSlick._props.Weight = 10;
		// cheeseSlick._props.Durability = 100;
		// cheeseSlick._props.MaxDurability = 100;
		// cheeseSlick._props.armorClass = 6;
		// cheeseSlick._props.Slots = [];
		// cheeseSlick._props.BluntThroughput = 0.15;

		//Object reference not set error
		// const cheeseSlick = <ITemplateItem>{
		// 	_id: "cheese_slick",
		// 	_name: "cheese_slick",
		// 	_type: "Item",
		// 	_parent: "5448e54d4bdc2dcc718b4568",
		// 	_props: <Props>{
		// 		Name: "Slick CHEESE",
		// 		ShortName: "CHEEZE",
		// 		Description: "A simple yet effective plate carrier.",
		// 		Weight: 10,
		// 		BackgroundColor: "yellow",
		// 		Width: 3,
		// 		Height: 3,
		// 		StackMaxSize: 1,
		// 		ItemSound: "gear_armor",
		// 		Prefab: {
		// 			path: "assets/content/items/equipment/armor_slick/ar_slick.bundle",
		// 		},
		// 		StackObjectsCount: 1,
		// 		NotShownInSlot: false,
		// 		ExaminedByDefault: false,
		// 		ExamineTime: 1,
		// 		IsUndiscardable: false,
		// 		IsUnsaleable: false,
		// 		IsUnbuyable: false,
		// 		IsUngivable: false,
		// 		IsLockedafterEquip: false,
		// 		QuestItem: false,
		// 		LootExperience: 45,
		// 		ExamineExperience: 2,
		// 		HideEntrails: false,
		// 		RepairCost: 1063,
		// 		RepairSpeed: 8,
		// 		ExtraSizeLeft: 0,
		// 		ExtraSizeRight: 0,
		// 		ExtraSizeUp: 0,
		// 		ExtraSizeDown: 0,
		// 		ExtraSizeForceAdd: false,
		// 		MergesWithChildren: false,
		// 		CanSellOnRagfair: true,
		// 		CanRequireOnRagfair: false,
		// 		ConflictingItems: [],
		// 		Unlootable: false,
		// 		UnlootableFromSlot: "FirstPrimaryWeapon",
		// 		UnlootableFromSide: [],
		// 		AnimationVariantsNumber: 0,
		// 		DiscardingBlock: false,
		// 		RagFairCommissionModifier: 1,
		// 		IsAlwaysAvailableForInsurance: false,
		// 		DiscardLimit: -1,
		// 		DropSoundType: "None",
		// 		InsuranceDisabled: false,
		// 		QuestStashMaxCount: 0,
		// 		IsSpecialSlotOnly: false,
		// 		IsUnremovable: false,
		// 		Grids: [],
		// 		Slots: [],
		// 		CanPutIntoDuringTheRaid: true,
		// 		CantRemoveFromSlotsDuringRaid: [],
		// 		BlocksEarpiece: false,
		// 		BlocksEyewear: false,
		// 		BlocksHeadwear: false,
		// 		BlocksFaceCover: false,
		// 		Durability: 0,
		// 		MaxDurability: 0,
		// 		armorClass: "0",
		// 		Indestructibility: 0.9,
		// 		FaceShieldComponent: false,
		// 		FaceShieldMask: "NoMask",
		// 		HasHinge: false,
		// 		MaterialType: "BodyArmor",
		// 		RicochetParams: {
		// 			x: 0,
		// 			y: 0,
		// 			z: 80,
		// 		},
		// 		DeafStrength: "None",
		// 		BluntThroughput: 0.2259,
		// 		ArmorMaterial: "Aramid",
		// 		BlindnessProtection: 0,
		// 		ArmorType: "Light",
		// 		armorColliders: [],
		// 		armorPlateColliders: [],
		// 		speedPenaltyPercent: 0,
		// 		mousePenalty: 0,
		// 		weaponErgonomicPenalty: 0,
		// 	},
		// 	_proto: "545cdb794bdc2d3a198b456a",
		// };

		//items.cheese_slick = cheeseSlick;

		// locales["cheese_slick Name"] = cheeseSlick._props.Name;
		// locales["cheese_slick ShortName"] = cheeseSlick._props.ShortName;
		// locales["cheese_slick Description"] = cheeseSlick._props.Description;

		// locale: {
		// 	Name: "Slick CHEESE",
		// 	ShortName: "CHEEZ",
		// 	Description: "A simple yet effective plate carrier",
		// },

		// traders[Traders.RAGMAN].assort.items.push(
		// 	{
		// 		_id: "cheese_plate_preset",
		// 		_tpl: "cheese_plate",
		// 		parentId: "hideout",
		// 		slotId: "hideout",
		// 		upd: {
		// 			StackObjectsCount: 140,
		// 			BuyRestrictionMax: 1,
		// 			BuyRestrictionCurrent: 0,
		// 		},
		// 	},
		// 	{
		// 		_id: "cheese_slick_preset",
		// 		_tpl: "cheese_slick",
		// 		parentId: "hideout",
		// 		slotId: "hideout",
		// 		upd: {
		// 			StackObjectsCount: 140,
		// 			BuyRestrictionMax: 1,
		// 			BuyRestrictionCurrent: 0,
		// 		},
		// 	}
		// );

		// traders[Traders.RAGMAN].assort.barter_scheme.cheese_plate_preset = [
		// 	[
		// 		{
		// 			count: 100000,
		// 			_tpl: "5449016a4bdc2d6f028b456f",
		// 		},
		// 	],
		// ];
		// traders[Traders.RAGMAN].assort.barter_scheme.cheese_slick_preset = [
		// 	[
		// 		{
		// 			count: 100000,
		// 			_tpl: "5449016a4bdc2d6f028b456f",
		// 		},
		// 	],
		// ];

		// traders[Traders.RAGMAN].assort.loyal_level_items.cheese_plate_preset = 4;
		// traders[Traders.RAGMAN].assort.loyal_level_items.cheese_slick_preset = 4;

		logger.logWithColor(
			"~~~~ CHEESE ARMOR LOADED ~~~~",
			LogTextColor.BLACK,
			LogBackgroundColor.RED
		);
	}
}

module.exports = { mod: new Mod() };
