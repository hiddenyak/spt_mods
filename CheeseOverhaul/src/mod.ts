import { DependencyContainer } from "tsyringe";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { LogTextColor } from "@spt-aki/models/spt/logging/LogTextColor";
import { LogBackgroundColor } from "@spt-aki/models/spt/logging/LogBackgroundColor";
import { IPostDBLoadMod } from "@spt-aki/models/external/IPostDBLoadMod";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";
import { IDatabaseTables } from "@spt-aki/models/spt/server/IDatabaseTables";
import { ConfigServer } from "@spt-aki/servers/ConfigServer";
import { ConfigTypes } from "@spt-aki/models/enums/ConfigTypes";

class Mod implements IPostDBLoadMod {
	postDBLoad(container: DependencyContainer): void {
		const logger = container.resolve<ILogger>("WinstonLogger");
		const databaseServer = container.resolve<DatabaseServer>("DatabaseServer");
		const tables: IDatabaseTables = databaseServer.getTables();
		const items = tables.templates.items;
		const hideout = tables.hideout;
		const globals = tables.globals;
		const bots = tables.bots.types;
		const locations = tables.locations;
		const suits = tables.templates.customization;
		const traders = tables.traders;
		const itemStrings = tables.locales.global["en"];

		const configServer = container.resolve<ConfigServer>("ConfigServer");
		const repairConfig = configServer.getConfig(ConfigTypes.REPAIR);
		const insuranceConfig = configServer.getConfig(ConfigTypes.INSURANCE);
		const ragfairConfig = configServer.getConfig(ConfigTypes.RAGFAIR);

		tweakSkills();
		tweakItems();
		tweakContainers();
		tweakHideout();
		tweakRaids();
		tweakRepair();
		tweakInsurance();
		tweakMisc();

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
				//Allow placing any item in secure container
				if (
					items[id]._parent == "5448bf274bdc2dfc2f8b456a" &&
					items[id]._props.Grids[0]._props.filters !== undefined
				) {
					items[id]._props.Grids[0]._props.filters = [];
				}
				//Allow placing any item in backpack
				if (
					items[id]._parent == "5448e53e4bdc2d60728b4567" &&
					items[id]._props.Grids[0]._props.filters !== undefined
				) {
					items[id]._props.Grids[0]._props.filters = [];
				}
				//Set ammo stack size to 100
				if (items[id]._parent.includes("5485a8684bdc2da71d8b4567")) {
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
					itemStrings[`${id} Name`] =
						itemStrings[`${id} Name`] + stringToAppend;
				}

				//Allow climbing extract with body armor
				if (items[id]._props.BlocksArmorVest !== undefined) {
					items[id]._props["BlocksArmorVest"] = false;
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
				//Change the weight
				if (
					items[id]._type !== "Node" &&
					items[id]._type !== undefined &&
					(items[id]._parent !== "557596e64bdc2dc2118b4571" ||
						items[id]._parent !== "55d720f24bdc2d88028b456d")
				) {
					items[id]._props["Weight"] =
						Math.round(0.5 * items[id]._props.Weight * 100) / 100;
				}
				//Add all items to Flea Blacklist
				ragfairConfig.dynamic.blacklist.custom.push(id);
			}
		}

		function tweakContainers() {
			//Increase stash level four size
			items["5811ce772459770e9e5f9532"]._props.Grids[0]._props.cellsV = 100;

			const injectorCase = items["619cbf7d23893217ec30b689"];
			injectorCase._props.Grids[0]._props["cellsH"] = 4;
			injectorCase._props.Grids[0]._props["cellsV"] = 4;

			const documentsCase = items["590c60fc86f77412b13fddcf"];
			documentsCase._props.Grids[0]._props["cellsH"] = 8;

			const thiccWeaponCase = items["5b6d9ce188a4501afc1b2b25"];
			thiccWeaponCase._props.Grids[0]._props["cellsH"] = 12;

			const thiccItemCase = items["5c0a840b86f7742ffa4f2482"];
			thiccItemCase._props.Grids[0]._props["cellsH"] = 15;
			thiccItemCase._props.Grids[0]._props["cellsV"] = 15;

			const sicc = items["5d235bb686f77443f4331278"];
			sicc._props.Grids[0]._props["cellsH"] = 10;
			sicc._props.Grids[0]._props["cellsV"] = 10;

			const holodilnick = items["5c093db286f7740a1b2617e3"];
			holodilnick._props.Grids[0]._props["cellsH"] = 8;
			holodilnick._props.Grids[0]._props["cellsV"] = 8;

			const medcase = items["5909d4c186f7746ad34e805a"];
			medcase._props.Grids[0]._props["cellsH"] = 9;
			medcase._props.Grids[0]._props["cellsV"] = 9;

			const ammunitonCase = items["5aafbde786f774389d0cbc0f"];
			ammunitonCase._props.Grids[0]._props["cellsH"] = 10;
			ammunitonCase._props.Grids[0]._props["cellsV"] = 10;

			const kappaContainer = items["5c093ca986f7740a1867ab12"];
			kappaContainer._props.Grids[0]._props["cellsH"] = 6;
			kappaContainer._props.Grids[0]._props["cellsV"] = 3;

			const pockets = items["627a4e6b255f7527fb05a0f6"];
			pockets._props.Grids[0]._props["cellsV"] = 2;
			pockets._props.Grids[1]._props["cellsV"] = 2;
			pockets._props.Grids[2]._props["cellsV"] = 2;
			pockets._props.Grids[3]._props["cellsV"] = 2;
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
			globals.config.SkillsSettings.MagDrills.RaidUnloadedAmmoAction = 0.08;
			globals.config.SkillsSettings.MagDrills.RaidLoadedAmmoAction = 0.16;

			//Immunity
			globals.config.SkillsSettings.Immunity.StimulatorNegativeBuff = 0.02;

			//Endurance
			globals.config.SkillsSettings.Endurance.SprintAction = 0.16;
			globals.config.SkillsSettings.Endurance.MovementAction = 0.02;

			//Strength
			globals.config.SkillsSettings.Strength.ThrowAction = 4;
			globals.config.SkillsSettings.Strength.SprintActionMax = 0.4;
			globals.config.SkillsSettings.Strength.SprintActionMin = 0.15;
			globals.config.SkillsSettings.Strength.MovementActionMax = 0.4;
			globals.config.SkillsSettings.Strength.MovementActionMin = 0.15;

			//Stress Resistance
			globals.config.SkillsSettings.StressResistance.HealthNegativeEffect = 3;

			//Vitality
			globals.config.SkillsSettings.Vitality.DamageTakenAction = 0.065;

			//Throwing
			globals.config.SkillsSettings.Throwing.ThrowAction = 2.5;

			//Recoil Control
			globals.config.SkillsSettings.RecoilControl.RecoilBonusPerLevel = 0.005;
			globals.config.SkillsSettings.RecoilControl.RecoilAction = 0.0003;

			//Aim Drills
			globals.config.SkillsSettings.AimDrills.WeaponShotAction = 1;

			//Troubleshooting
			globals.config.SkillsSettings.TroubleShooting.SkillPointsPerMalfFix = 50;

			//Surgery
			globals.config.SkillsSettings.Surgery.SurgeryAction = 30;

			//Covert Movement
			globals.config.SkillsSettings.CovertMovement.MovementAction = 0.4;

			//Light Vests
			globals.config.SkillsSettings.LightVests.MoveSpeedPenaltyReductionHVestsReducePerLevel = 0.02;
			globals.config.SkillsSettings.LightVests.MeleeDamageLVestsReducePerLevel = 0.01;
			globals.config.SkillsSettings.LightVests.BuffSettings.RareBuffChanceCoff = 0.4;
			globals.config.SkillsSettings.LightVests.BuffSettings.MaxDurabilityLossToRemoveBuff = 0.5;
			globals.config.SkillsSettings.LightVests.BuffSettings.CurrentDurabilityLossToRemoveBuff = 0.5;
			globals.config.SkillsSettings.LightVests.WearChanceRepairLVestsReduceEliteLevel = 1;
			globals.config.SkillsSettings.LightVests.WearAmountRepairLVestsReducePerLevel = 0.02;
			globals.config.SkillsSettings.LightVests.MeleeDamageLVestsReducePerLevel = 0.01;

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
			globals.config.SkillsSettings.Crafting.PointsPerCraftingCycle = 5;
			globals.config.SkillsSettings.Crafting.PointsPerUniqueCraftCycle = 20;
			globals.config.SkillsSettings.Crafting.ProductionTimeReductionPerLevel = 1.6;
			globals.config.SkillsSettings.Crafting.CraftTimeReductionPerLevel = 1.6;
			globals.config.SkillsSettings.Crafting.EliteExtraProductions = 2;

			//Hideout Managment
			globals.config.SkillsSettings.HideoutManagement.SkillPointsPerAreaUpgrade = 100;
			globals.config.SkillsSettings.HideoutManagement.SkillPointsPerCraft = 5;
			globals.config.SkillsSettings.HideoutManagement.EliteSlots.BitcoinFarm.Container = 20;
			globals.config.SkillsSettings.HideoutManagement.EliteSlots.Generator.Slots = 4;
			globals.config.SkillsSettings.HideoutManagement.EliteSlots.WaterCollector.Slots = 4;
		}

		function tweakHideout() {
			//Boost effect of adding GPU
			hideout.settings.gpuBoostRate = 10;
			for (const data of hideout.production) {
				//Bitcoin Farm Output Capacity Increase
				if (data._id === "5d5c205bd582a50d042a3c0e") {
					data.productionLimitCount = 10;
				}
			}
		}

		function tweakRaids() {
			//Disable run through
			globals.config.exp.match_end.survived_exp_requirement = 0;
			globals.config.exp.match_end.survived_seconds_requirement = 0;

			//Enable insurance on labs
			locations.laboratory.base.Insurance = true;

			for (const map in locations) {
				if (map !== "base") {
					//Extend Raid timers by 60 minutes
					if (isJSONValueDefined(locations[map].base.exit_access_time)) {
						locations[map].base.exit_access_time += 60;
					}
					if (isJSONValueDefined(locations[map].base.EscapeTimeLimit)) {
						locations[map].base.EscapeTimeLimit += 60;
					}
					//Speed up car extract
					for (const exit of locations[map].base.exits) {
						if (exit.PassageRequirement == "TransferItem") {
							exit.ExfiltrationTime = 20;
						}
					}
				}
			}
		}

		function tweakRepair() {
			repairConfig.armorKitSkillPointGainPerRepairPointMultiplier = 10;
			repairConfig.weaponTreatment.pointGainMultiplier = 10;
		}

		function tweakInsurance() {
			//Prapor
			traders["54cb50c76803fa8b248b4571"].base.insurance.min_return_hour = 6;
			traders["54cb50c76803fa8b248b4571"].base.insurance.max_return_hour = 16;
			insuranceConfig.insuranceMultiplier["54cb50c76803fa8b248b4571"] = 0.3;
			insuranceConfig.returnChancePercent["54cb50c76803fa8b248b4571"] = 100;
			//Therapist
			traders["54cb57776803fa99248b456e"].base.insurance.min_return_hour = 1;
			traders["54cb57776803fa99248b456e"].base.insurance.max_return_hour = 2;
			insuranceConfig.insuranceMultiplier["54cb57776803fa99248b456e"] = 0.5;
			insuranceConfig.returnChancePercent["54cb57776803fa99248b456e"] = 100;
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

			//Stamina Tweaks
			globals.config.Stamina.StandupConsumption.x = 0;
			globals.config.Stamina.StandupConsumption.y = 0;
			globals.config.Stamina.BaseRestorationRate = 7;
			globals.config.Stamina.SprintDrainRate = 3;
			globals.config.Stamina.Capacity = 150;

			//Increase Scav Rep from killing PMC
			bots["bear"].experience.standingForKill = 1;
			bots["usec"].experience.standingForKill = 1;

			for (const suit in suits) {
				const suitData = suits[suit];
				if (
					suitData._parent === "5cd944ca1388ce03a44dc2a4" ||
					suitData._parent === "5cd944d01388ce000a659df9"
				) {
					suitData._props.Side = ["Bear", "Usec"];
				}
			}
		}

		function isJSONValueDefined(value) {
			return value !== undefined && !value.isNaN;
		}

		logger.logWithColor(
			"~~~~ CHEESE OVERHAUL LOADED ~~~~",
			LogTextColor.BLACK,
			LogBackgroundColor.YELLOW
		);
	}
}

module.exports = { mod: new Mod() };
