import { DependencyContainer } from "tsyringe";

import { IPostDBLoadMod } from "@spt/models/external/IPostDBLoadMod";
import { DatabaseServer } from "@spt/servers/DatabaseServer";
import { IDatabaseTables } from "@spt/models/spt/server/IDatabaseTables";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { LogTextColor } from "@spt/models/spt/logging/LogTextColor";
import { LogBackgroundColor } from "@spt/models/spt/logging/LogBackgroundColor";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { ConfigTypes } from "@spt/models/enums/ConfigTypes";
import { ITemplateItem } from "@spt/models/eft/common/tables/ITemplateItem";
import { Traders } from "@spt/models/enums/Traders";
import { art } from "./art";

class Mod implements IPostDBLoadMod {
	postDBLoad(container: DependencyContainer): void {
		const logger = container.resolve<ILogger>("WinstonLogger");
		const databaseServer = container.resolve<DatabaseServer>("DatabaseServer");
		const tables: IDatabaseTables = databaseServer.getTables();
		const items = tables.templates.items;
		const hideout = tables.hideout;
		const globals = tables.globals;
		const locations = tables.locations;
		const suits = tables.templates.customization;
		const traders = tables.traders;
		const locales = tables.locales.global["en"];

		const configServer = container.resolve<ConfigServer>("ConfigServer");
		const repairConfig = configServer.getConfig(ConfigTypes.REPAIR);
		const insuranceConfig = configServer.getConfig(ConfigTypes.INSURANCE);
		const ragfairConfig = configServer.getConfig(ConfigTypes.RAGFAIR);
		const questsConfig = configServer.getConfig(ConfigTypes.QUEST);

		createCheeseProfile();
		tweakSkills();
		tweakItems();
		tweakContainers();
		tweakBackpacks();
		tweakHideout();
		tweakRaids();
		tweakRepair();
		//tweakInsurance();
		tweakMisc();

		const today = new Date();
		const hours = today.getHours();

		if (
			today.getDay() == 6 ||
			today.getDay() == 0 ||
			(today.getDay() == 5 && hours >= 17)
		) {
			doubleExpWeekend();
		}

		function createCheeseProfile() {
			tables.templates.profiles["CHEESE ZERO STATE"] = cloneProfile(
				tables.templates.profiles["SPT Zero to hero"]
			);
			delete tables.templates.profiles["Standard"];
			delete tables.templates.profiles["Left Behind"];
			delete tables.templates.profiles["Prepare To Escape"];
			delete tables.templates.profiles["Edge Of Darkness"];
			delete tables.templates.profiles["Unheard"];
			delete tables.templates.profiles["Tournament"];
			delete tables.templates.profiles["SPT Easy start"];
			delete tables.templates.profiles["SPT Developer"];
			delete tables.templates.profiles["SPT Zero to hero"];

			logger.logWithColor(
				"Added CHEESE ZERO STATE profile",
				LogTextColor.BLACK,
				LogBackgroundColor.YELLOW
			);
		}

		function cloneProfile(gameVersion: any): any {
			const cloneProfile = JSON.parse(JSON.stringify(gameVersion));

			const loadDataContent = (pmc: string) => {
				cloneProfile.descriptionLocaleKey =
					"Start with nothing and fight for everything";
				cloneProfile[pmc].character.Bonuses = [
					{
						id: "67c1ae3f0b66035b0e1f1a79",
						templateId: "6602bcf19cc643f44a04274b",
						type: "StashSize",
					},
				];
				cloneProfile[pmc].character.Hideout.Areas = [
					{
						active: true,
						completeTime: 0,
						constructing: false,
						lastRecipe: "",
						level: 4,
						passiveBonusesEnabled: true,
						slots: [],
						type: 3,
					},
					{
						active: true,
						completeTime: 0,
						constructing: false,
						lastRecipe: "",
						level: 0,
						passiveBonusesEnabled: true,
						slots: [],
						type: 0,
					},
					{
						active: true,
						completeTime: 0,
						constructing: false,
						lastRecipe: "",
						level: 0,
						passiveBonusesEnabled: true,
						slots: [],
						type: 1,
					},
					{
						active: true,
						completeTime: 0,
						constructing: false,
						lastRecipe: "",
						level: 0,
						passiveBonusesEnabled: true,
						slots: [],
						type: 2,
					},
					{
						active: true,
						completeTime: 0,
						constructing: false,
						lastRecipe: "",
						level: 0,
						passiveBonusesEnabled: true,
						slots: [],
						type: 4,
					},
					{
						active: true,
						completeTime: 0,
						constructing: false,
						lastRecipe: "",
						level: 0,
						passiveBonusesEnabled: true,
						slots: [],
						type: 5,
					},
					{
						active: true,
						completeTime: 0,
						constructing: false,
						lastRecipe: "",
						level: 0,
						passiveBonusesEnabled: true,
						slots: [],
						type: 6,
					},
					{
						active: true,
						completeTime: 0,
						constructing: false,
						lastRecipe: "",
						level: 0,
						passiveBonusesEnabled: true,
						slots: [],
						type: 7,
					},
					{
						active: true,
						completeTime: 0,
						constructing: false,
						lastRecipe: "",
						level: 0,
						passiveBonusesEnabled: true,
						slots: [],
						type: 8,
					},
					{
						active: true,
						completeTime: 0,
						constructing: false,
						lastRecipe: "",
						level: 0,
						passiveBonusesEnabled: true,
						slots: [],
						type: 9,
					},
					{
						active: true,
						completeTime: 0,
						constructing: false,
						lastRecipe: "",
						level: 0,
						passiveBonusesEnabled: true,
						slots: [],
						type: 10,
					},
					{
						active: true,
						completeTime: 0,
						constructing: false,
						lastRecipe: "",
						level: 0,
						passiveBonusesEnabled: true,
						slots: [],
						type: 11,
					},
					{
						active: true,
						completeTime: 0,
						constructing: false,
						lastRecipe: "",
						level: 0,
						passiveBonusesEnabled: true,
						slots: [],
						type: 12,
					},
					{
						active: true,
						completeTime: 0,
						constructing: false,
						lastRecipe: "",
						level: 0,
						passiveBonusesEnabled: true,
						slots: [],
						type: 13,
					},
					{
						active: true,
						completeTime: 0,
						constructing: false,
						lastRecipe: "",
						level: 0,
						passiveBonusesEnabled: true,
						slots: [],
						type: 14,
					},
					{
						active: true,
						completeTime: 0,
						constructing: false,
						lastRecipe: "",
						level: 0,
						passiveBonusesEnabled: true,
						slots: [],
						type: 15,
					},
					{
						active: true,
						completeTime: 0,
						constructing: false,
						lastRecipe: "",
						level: 0,
						passiveBonusesEnabled: true,
						slots: [],
						type: 16,
					},
					{
						active: true,
						completeTime: 0,
						constructing: false,
						lastRecipe: "",
						level: 0,
						passiveBonusesEnabled: false,
						slots: [],
						type: 17,
					},
					{
						active: true,
						completeTime: 0,
						constructing: false,
						lastRecipe: "",
						level: 0,
						passiveBonusesEnabled: true,
						slots: [],
						type: 18,
					},
					{
						active: true,
						completeTime: 0,
						constructing: false,
						lastRecipe: "",
						level: 0,
						passiveBonusesEnabled: true,
						slots: [],
						type: 19,
					},
					{
						active: true,
						completeTime: 0,
						constructing: false,
						lastRecipe: "",
						level: 0,
						passiveBonusesEnabled: true,
						slots: [],
						type: 20,
					},
					{
						active: true,
						completeTime: 0,
						constructing: false,
						lastRecipe: "",
						level: 0,
						passiveBonusesEnabled: true,
						slots: [],
						type: 21,
					},
					{
						active: true,
						completeTime: 0,
						constructing: false,
						lastRecipe: "",
						level: 0,
						passiveBonusesEnabled: true,
						slots: [],
						type: 22,
					},
					{
						active: true,
						completeTime: 0,
						constructing: false,
						lastRecipe: "",
						level: 0,
						passiveBonusesEnabled: true,
						slots: [],
						type: 23,
					},
					{
						active: true,
						completeTime: 0,
						constructing: false,
						lastRecipe: "",
						level: 0,
						passiveBonusesEnabled: true,
						slots: [],
						type: 24,
					},
					{
						active: true,
						completeTime: 0,
						constructing: false,
						lastRecipe: "",
						level: 0,
						passiveBonusesEnabled: true,
						slots: [],
						type: 25,
					},
					{
						active: true,
						completeTime: 0,
						constructing: false,
						lastRecipe: "",
						level: 0,
						passiveBonusesEnabled: true,
						slots: [],
						type: 26,
					},
					{
						active: true,
						completeTime: 0,
						constructing: false,
						lastRecipe: "",
						level: 0,
						passiveBonusesEnabled: true,
						slots: [],
						type: 27,
					},
				];
			};

			loadDataContent("bear");
			loadDataContent("usec");

			return cloneProfile;
		}

		if (today.getDay() == 5) {
			for (const assortR in traders) {
				if (assortR !== "ragfair" && assortR !== "638f541a29ffd1183d187f57") {
					for (const level in traders[assortR].assort.items) {
						if (
							traders[assortR].assort.items[level].upd !== undefined &&
							traders[assortR].assort.items[level].upd["BuyRestrictionMax"] !==
								undefined
						) {
							delete traders[assortR].assort.items[level].upd[
								"BuyRestrictionMax"
							];
						}
					}
				}
			}

			logger.logWithColor(
				"~~~~ FIRE SALE FRIDAY ~~~~",
				LogTextColor.RED,
				LogBackgroundColor.YELLOW
			);
		}

		function tweakItems() {
			//Allow bringing any item into raid
			globals.config.RestrictionsInRaid = [];

			for (const id in items) {
				//Allow discarding any item in raid
				if (
					items[id]._type == "Item" &&
					items[id]._props.DiscardLimit !== undefined
				) {
					items[id]._props["DiscardLimit"] = -1;
				}

				//Allow placing any item in secure container or backpack
				if (
					items[id]._parent == "5448bf274bdc2dfc2f8b456a" ||
					items[id]._parent == "5448e53e4bdc2d60728b4567"
				) {
					if (items[id]._props.Grids[0]._props.filters !== undefined) {
						items[id]._props.Grids[0]._props.filters = [];
					}
				}

				const redFlareId = "62389ba9a63f32501b1b4451";

				//Set ammo stack size to 100
				if (
					items[id]._parent == "5485a8684bdc2da71d8b4567" &&
					items[id]._id !== redFlareId
				) {
					items[id]._props["StackMaxSize"] = 100;

					let damageMult = 1;
					if (items[id]._props.ammoType === "buckshot") {
						damageMult = items[id]._props.buckshotBullets;
					}
					const stringToAppend =
						" (" +
						items[id]._props.Damage * damageMult +
						"/" +
						items[id]._props.PenetrationPower +
						")";
					locales[`${id} Name`] = locales[`${id} Name`] + stringToAppend;
				}

				//Remove turn speed debuff on gear
				if (items[id]._props.mousePenalty) {
					items[id]._props["mousePenalty"] = 0;
				}

				//Remove ergonomics debuff on gear
				if (items[id]._props.weaponErgonomicPenalty) {
					items[id]._props["weaponErgonomicPenalty"] = 0;
				}

				//Remove movement speed penalty debuff on gear
				if (items[id]._props.speedPenaltyPercent) {
					items[id]._props["speedPenaltyPercent"] = 0;
				}

				//Halve the weight
				if (
					items[id]._type !== "Node" &&
					items[id]._type !== undefined &&
					items[id]._parent !== "557596e64bdc2dc2118b4571" &&
					items[id]._parent !== "55d720f24bdc2d88028b456d"
				) {
					items[id]._props["Weight"] =
						Math.round(0.5 * items[id]._props.Weight * 100) / 100;
				}

				//Allow lossless weapon repair with kit
				if (items[id]._props.MaxRepairKitDegradation !== undefined) {
					items[id]._props.MinRepairKitDegradation = 0;
					items[id]._props.MaxRepairKitDegradation = 0;
				}

				//Add all items to Flea Blacklist
				ragfairConfig.dynamic.blacklist.custom.push(id);
			}
		}

		function tweakContainers() {
			//Injector Case
			setSize(items["619cbf7d23893217ec30b689"], 4, 4);

			//Documents Case
			setSize(items["590c60fc86f77412b13fddcf"], 8, 4);

			//Thicc Weapon Case
			setSize(items["5b6d9ce188a4501afc1b2b25"], 12, 12);

			//Thicc Item Case
			setSize(items["5c0a840b86f7742ffa4f2482"], 16, 16);

			//Sicc Case
			setSize(items["5d235bb686f77443f4331278"], 10, 10);

			//Holodilnick
			setSize(items["5c093db286f7740a1b2617e3"], 10, 10);

			//Medicine Case
			setSize(items["5aafbcd986f7745e590fff23"], 10, 10);

			//Ammo Case
			setSize(items["5aafbde786f774389d0cbc0f"], 10, 10);

			//Magazine Case
			setSize(items["5c127c4486f7745625356c13"], 10, 10);

			//Pistol Case
			setSize(items["567143bf4bdc2d1a0f8b4567"], 6, 6);

			//Money Case
			setSize(items["59fb016586f7746d0d4b423a"], 12, 12);

			//Kappa
			setSize(items["5c093ca986f7740a1867ab12"], 6, 3);

			const pockets = items["627a4e6b255f7527fb05a0f6"];
			pockets._props.Grids[0]._props["cellsV"] = 2;
			pockets._props.Grids[1]._props["cellsV"] = 2;
			pockets._props.Grids[2]._props["cellsV"] = 2;
			pockets._props.Grids[3]._props["cellsV"] = 2;

			//Increase stash level at each level
			// items["566abbc34bdc2d92178b4576"]._props.Grids[0]._props.cellsV = 80;
			// items["5811ce572459770cba1a34ea"]._props.Grids[0]._props.cellsV = 80;
			// items["5811ce662459770f6f490f32"]._props.Grids[0]._props.cellsV = 80;
			// items["5811ce772459770e9e5f9532"]._props.Grids[0]._props.cellsV = 80;

			logger.logWithColor(
				"Tweaked container sizes",
				LogTextColor.BLACK,
				LogBackgroundColor.YELLOW
			);
		}

		function tweakBackpacks() {
			//Hazard 4 Takedown sling backpack Black
			setSize(items["6034d103ca006d2dca39b3f0"], 6, 10);
			//Hazard 4 Takedown sling backpack Multicam
			setSize(items["6038d614d10cbf667352dd44"], 6, 10);
			//SSO Attack 2 raid backpack
			setSize(items["5ab8ebf186f7742d8b372e80"], 6, 10);

			logger.logWithColor(
				"Tweaked backpack sizes",
				LogTextColor.BLACK,
				LogBackgroundColor.YELLOW
			);
		}

		function setSize(
			container: ITemplateItem,
			horizontalSize: number,
			verticalSize: number
		) {
			container._props.Grids[0]._props["cellsH"] = horizontalSize;
			container._props.Grids[0]._props["cellsV"] = verticalSize;
		}

		function tweakSkills() {
			//Disable skill fatigue
			globals.config.SkillMinEffectiveness = 1;
			globals.config.SkillFreshEffectiveness = 1;

			//Weapon Related
			globals.config.SkillsSettings.Pistol.WeaponShotAction = 1.5;
			globals.config.SkillsSettings.Revolver.WeaponShotAction = 1.5;
			globals.config.SkillsSettings.DMR.WeaponShotAction = 1.5;
			globals.config.SkillsSettings.Assault.WeaponShotAction = 1.5;
			globals.config.SkillsSettings.Shotgun.WeaponShotAction = 1.5;
			globals.config.SkillsSettings.Sniper.WeaponShotAction = 1.5;

			//Charisma
			globals.config.SkillsSettings.Charisma.BonusSettings.LevelBonusSettings.InsuranceDiscount = 0.01;
			globals.config.SkillsSettings.Charisma.BonusSettings.LevelBonusSettings.RepeatableQuestChangeDiscount = 0.01;
			globals.config.SkillsSettings.Charisma.BonusSettings.LevelBonusSettings.PaidExitDiscount = 0.01;
			globals.config.SkillsSettings.Charisma.BonusSettings.LevelBonusSettings.HealthRestoreDiscount = 0.01;
			globals.config.SkillsSettings.Charisma.BonusSettings.LevelBonusSettings.HealthRestoreTraderDiscount = 0.01;

			//Mag Drills
			globals.config.SkillsSettings.MagDrills.RaidUnloadedAmmoAction = 0.4;
			globals.config.SkillsSettings.MagDrills.RaidLoadedAmmoAction = 0.6;

			//Immunity
			globals.config.SkillsSettings.Immunity.StimulatorNegativeBuff = 0.02;

			//Endurance
			globals.config.SkillsSettings.Endurance.SprintAction = 0.1;
			globals.config.SkillsSettings.Endurance.MovementAction = 0.015;

			//Strength
			globals.config.SkillsSettings.Strength.ThrowAction = 4;
			globals.config.SkillsSettings.Strength.SprintActionMax = 0.3;
			globals.config.SkillsSettings.Strength.SprintActionMin = 0.1;
			globals.config.SkillsSettings.Strength.MovementActionMax = 0.3;
			globals.config.SkillsSettings.Strength.MovementActionMin = 0.1;

			//Stress Resistance
			globals.config.SkillsSettings.StressResistance.HealthNegativeEffect = 6;

			//Vitality
			globals.config.SkillsSettings.Vitality.DamageTakenAction = 0.2;

			//Perception
			globals.config.SkillsSettings.Perception.OnlineAction = 4;
			globals.config.SkillsSettings.Perception.UniqueLoot = 0.5;

			//Throwing
			globals.config.SkillsSettings.Throwing.ThrowAction = 10;

			//Recoil Control
			globals.config.SkillsSettings.RecoilControl.RecoilBonusPerLevel = 0.005;
			globals.config.SkillsSettings.RecoilControl.RecoilAction = 0.0006;

			//Aim Drills
			globals.config.SkillsSettings.AimDrills.WeaponShotAction = 2;

			//Troubleshooting
			globals.config.SkillsSettings.TroubleShooting.SkillPointsPerMalfFix = 200;

			//Surgery
			globals.config.SkillsSettings.Surgery.SurgeryAction = 100;

			//Search
			globals.config.SkillsSettings.Search.FindAction = 1.5;
			globals.config.SkillsSettings.Search.SearchAction = 3;

			//Covert Movement
			globals.config.SkillsSettings.CovertMovement.MovementAction = 6;

			//Light Vests
			globals.config.SkillsSettings.LightVests.MoveSpeedPenaltyReductionHVestsReducePerLevel = 0.02;
			globals.config.SkillsSettings.LightVests.MeleeDamageLVestsReducePerLevel = 0.01;
			globals.config.SkillsSettings.LightVests.BuffSettings.RareBuffChanceCoff = 0.4;
			globals.config.SkillsSettings.LightVests.BuffSettings.MaxDurabilityLossToRemoveBuff = 0.5;
			globals.config.SkillsSettings.LightVests.BuffSettings.CurrentDurabilityLossToRemoveBuff = 0.5;
			globals.config.SkillsSettings.LightVests.MeleeDamageLVestsReducePerLevel = 0.01;
			//BUGGED
			globals.config.SkillsSettings.LightVests.WearChanceRepairLVestsReduceEliteLevel = 0.99;
			globals.config.SkillsSettings.LightVests.WearAmountRepairLVestsReducePerLevel = 0.02;

			//Heavy Vests
			globals.config.SkillsSettings.HeavyVests.MoveSpeedPenaltyReductionHVestsReducePerLevel = 0.02;
			globals.config.SkillsSettings.HeavyVests.RicochetChanceHVestsEliteLevel = 0.2;
			globals.config.SkillsSettings.HeavyVests.BuffSettings.RareBuffChanceCoff = 0.4;
			globals.config.SkillsSettings.HeavyVests.BuffSettings.MaxDurabilityLossToRemoveBuff = 0.5;
			globals.config.SkillsSettings.HeavyVests.BuffSettings.CurrentDurabilityLossToRemoveBuff = 0.5;
			//bug? property is named LVest
			globals.config.SkillsSettings.HeavyVests.WearChanceRepairLVestsReduceEliteLevel = 1;
			globals.config.SkillsSettings.HeavyVests.WearAmountRepairLVestsReducePerLevel = 0.02;
			globals.config.SkillsSettings.HeavyVests.MeleeDamageLVestsReducePerLevel = 0.01;

			//Weapon Maintenance
			globals.config.SkillsSettings.WeaponTreatment.DurLossReducePerLevel = 0.01;
			globals.config.SkillsSettings.WeaponTreatment.SkillPointsPerRepair = 20;
			globals.config.SkillsSettings.WeaponTreatment.WearAmountRepairGunsReducePerLevel = 0.02;
			globals.config.SkillsSettings.WeaponTreatment.WearChanceRepairGunsReduceEliteLevel = 1;
			globals.config.SkillsSettings.WeaponTreatment.BuffSettings.CurrentDurabilityLossToRemoveBuff = 0.5;
			globals.config.SkillsSettings.WeaponTreatment.BuffSettings.MaxDurabilityLossToRemoveBuff = 0.5;

			//Crafting
			globals.config.SkillsSettings.Crafting.PointsPerCraftingCycle = 200;
			globals.config.SkillsSettings.Crafting.PointsPerUniqueCraftCycle = 1000;
			globals.config.SkillsSettings.Crafting.ProductionTimeReductionPerLevel = 1.6;
			globals.config.SkillsSettings.Crafting.CraftTimeReductionPerLevel = 1.6;
			globals.config.SkillsSettings.Crafting.EliteExtraProductions = 2;

			//Hideout Managment
			globals.config.SkillsSettings.HideoutManagement.SkillPointsPerAreaUpgrade = 100;
			globals.config.SkillsSettings.HideoutManagement.SkillPointsPerCraft = 5;
			globals.config.SkillsSettings.HideoutManagement.EliteSlots.BitcoinFarm.Container = 20;
			globals.config.SkillsSettings.HideoutManagement.EliteSlots.Generator.Slots = 4;
			globals.config.SkillsSettings.HideoutManagement.EliteSlots.WaterCollector.Slots = 4;

			logger.logWithColor(
				"Tweaked skill settings",
				LogTextColor.BLACK,
				LogBackgroundColor.YELLOW
			);
		}

		function tweakHideout() {
			//Boost effect of adding GPU
			hideout.settings.gpuBoostRate = 2;
			for (const data in hideout.production.recipes) {
				const productionData = hideout.production.recipes[data];

				//Bitcoin Farm Output Capacity Increase
				if (productionData._id == "5d5c205bd582a50d042a3c0e") {
					productionData.productionLimitCount = 10;
					//productionData.productionTime = Config.Hideout.BitcoinTime * 60;
				}
			}

			//Speed up hideout construction
			for (const data in hideout.areas) {
				const areaData = hideout.areas[data];
				for (const i in areaData.stages) {
					if (areaData.stages[i].constructionTime > 0) {
						areaData.stages[i].constructionTime =
							areaData.stages[i].constructionTime * 0.25;
					}
				}
			}

			logger.logWithColor(
				"Tweaked hideout settings",
				LogTextColor.BLACK,
				LogBackgroundColor.YELLOW
			);
		}

		function tweakRaids() {
			//Disable run through
			globals.config.exp.match_end.survived_exp_requirement = 0;
			globals.config.exp.match_end.survived_seconds_requirement = 0;

			//Enable insurance on labs
			locations.laboratory.base.Insurance = true;

			for (const map in locations) {
				if (map !== "base") {
					//Extend Raid timers by 10 minutes
					if (isJSONValueDefined(locations[map].base.exit_access_time)) {
						locations[map].base.exit_access_time += 10;
					}
					if (isJSONValueDefined(locations[map].base.EscapeTimeLimit)) {
						locations[map].base.EscapeTimeLimit += 10;
					}
					//Speed up car extract
					for (const exit of locations[map].base.exits) {
						if (exit.PassageRequirement == "TransferItem") {
							exit.ExfiltrationTime = 20;
						}
					}
					if (map === "lighthouse" || map === "woods") {
						locations[map].base.exit_access_time = 90;
						locations[map].base.EscapeTimeLimit = 90;
					}
				}
			}
			logger.logWithColor(
				"Tweaked raid settings",
				LogTextColor.BLACK,
				LogBackgroundColor.YELLOW
			);
		}

		function tweakRepair() {
			repairConfig.armorKitSkillPointGainPerRepairPointMultiplier = 10;
			repairConfig.weaponTreatment.pointGainMultiplier = 10;
			repairConfig.applyRandomizeDurabilityLoss = false;

			//Allow lossless armor repair with kit
			for (const armorMaterial in globals.config.ArmorMaterials) {
				globals.config.ArmorMaterials[
					armorMaterial
				].MaxRepairKitDegradation = 0;
				globals.config.ArmorMaterials[
					armorMaterial
				].MinRepairKitDegradation = 0;
			}

			logger.logWithColor(
				"Tweaked repair settings",
				LogTextColor.BLACK,
				LogBackgroundColor.YELLOW
			);
		}

		function tweakInsurance() {
			traders[Traders.PRAPOR].base.insurance.min_return_hour = 6;
			traders[Traders.PRAPOR].base.insurance.max_return_hour = 24;
			insuranceConfig.insuranceMultiplier[Traders.PRAPOR] = 0.3;
			traders[Traders.THERAPIST].base.insurance.min_return_hour = 6;
			traders[Traders.THERAPIST].base.insurance.max_return_hour = 12;
			insuranceConfig.insuranceMultiplier[Traders.THERAPIST] = 0.5;
			insuranceConfig.returnChancePercent[Traders.THERAPIST] = 100;

			logger.logWithColor(
				"Tweaked insurance settings",
				LogTextColor.BLACK,
				LogBackgroundColor.YELLOW
			);
		}

		function tweakMisc() {
			//Remove Flea Market offer slots
			globals.config.RagFair.maxActiveOfferCount = [
				{
					count: -1,
					from: -10000,
					to: 10000,
				},
			];

			//Enable Flea Market at all levels
			globals.config.RagFair.minUserLevel = -1;

			//Buff mag load speed
			globals.config.BaseLoadTime = 0.4;
			globals.config.BaseUnloadTime = 0.2;

			//Allow Red Rebel extracts with armor
			globals.config.RequirementReferences.Alpinist.splice(2, 1);

			//Stamina Tweaks
			globals.config.Stamina.BaseRestorationRate = 7;
			globals.config.Stamina.SprintDrainRate = 3;
			globals.config.Stamina.Capacity = 150;
			globals.config.Stamina.BaseOverweightLimits.x = 35;
			globals.config.Stamina.SprintOverweightLimits.x = 35;
			globals.config.Stamina.WalkVisualEffectMultiplier = 0;
			globals.config.Stamina.StaminaExhaustionCausesJiggle = false;
			globals.config.Stamina.FallDamageMultiplier = 2;

			//Allow all clothing options
			for (const suit in suits) {
				const suitData = suits[suit];
				if (
					suitData._parent === "5cd944ca1388ce03a44dc2a4" ||
					suitData._parent === "5cd944d01388ce000a659df9"
				) {
					suitData._props.Side = ["Bear", "Usec"];
				}
			}

			//Quest rewards expire after 7 days
			questsConfig.mailRedeemTimeHours["default"] = 168;

			logger.logWithColor(
				"Tweaked miscellaneous settings",
				LogTextColor.BLACK,
				LogBackgroundColor.YELLOW
			);
		}

		function doubleExpWeekend() {
			globals.config.exp.match_end.survivedMult = 2.6;
			logger.logWithColor(
				"~~~~ DOUBLE EXP WEEKEND ~~~~",
				LogTextColor.RED,
				LogBackgroundColor.WHITE
			);
		}

		//SAIN OVERRIDES THIS
		function doubleBossSpawnRates() {
			const chance = 60;

			//Reshala
			locations.bigmap.base.BossLocationSpawn.find(
				(bossLocationSpawn) => bossLocationSpawn.BossName === "bossBully"
			).BossChance = chance;

			//Tagilla
			locations.factory4_day.base.BossLocationSpawn.find(
				(bossLocationSpawn) => bossLocationSpawn.BossName === "bossTagilla"
			).BossChance = chance;
			locations.factory4_night.base.BossLocationSpawn.find(
				(bossLocationSpawn) => bossLocationSpawn.BossName === "bossTagilla"
			).BossChance = chance;

			//Killa
			locations.interchange.base.BossLocationSpawn.find(
				(bossLocationSpawn) => bossLocationSpawn.BossName === "bossKilla"
			).BossChance = chance;

			//Glukhar
			locations.rezervbase.base.BossLocationSpawn.find(
				(bossLocationSpawn) => bossLocationSpawn.BossName === "bossGluhar"
			).BossChance = chance;

			//Sanitar
			locations.shoreline.base.BossLocationSpawn.find(
				(bossLocationSpawn) => bossLocationSpawn.BossName === "bossSanitar"
			).BossChance = chance;

			//Kolontay
			locations.tarkovstreets.base.BossLocationSpawn.find(
				(bossLocationSpawn) => bossLocationSpawn.BossName === "bossKolontay"
			).BossChance = chance;

			//Kaban
			locations.tarkovstreets.base.BossLocationSpawn.find(
				(bossLocationSpawn) => bossLocationSpawn.BossName === "bossBoar"
			).BossChance = chance;

			//Shturman
			locations.woods.base.BossLocationSpawn.find(
				(bossLocationSpawn) => bossLocationSpawn.BossName === "bossKojaniy"
			).BossChance = chance;

			//Raiders
			locations.rezervbase.base.BossLocationSpawn.find(
				(bossLocationSpawn) => bossLocationSpawn.BossName === "pmcBot"
			).BossChance = chance;

			locations.laboratory.base.BossLocationSpawn.find(
				(bossLocationSpawn) => bossLocationSpawn.BossName === "pmcBot"
			).BossChance = chance;

			//Cultists
			locations.bigmap.base.BossLocationSpawn.find(
				(bossLocationSpawn) => bossLocationSpawn.BossName === "sectantPriest"
			).BossChance = chance;

			locations.factory4_night.base.BossLocationSpawn.find(
				(bossLocationSpawn) => bossLocationSpawn.BossName === "sectantPriest"
			).BossChance = chance;

			locations.woods.base.BossLocationSpawn.find(
				(bossLocationSpawn) => bossLocationSpawn.BossName === "sectantPriest"
			).BossChance = chance;

			locations.shoreline.base.BossLocationSpawn.find(
				(bossLocationSpawn) => bossLocationSpawn.BossName === "sectantPriest"
			).BossChance = chance;
		}

		function isJSONValueDefined(value: { isNaN: any }) {
			return value !== undefined && !value.isNaN;
		}

		logger.logWithColor(art, LogTextColor.YELLOW, LogBackgroundColor.BLACK);
	}
}

module.exports = { mod: new Mod() };

export const mod = new Mod();
