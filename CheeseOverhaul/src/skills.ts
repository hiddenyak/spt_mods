import { LogBackgroundColor } from "@spt/models/spt/logging/LogBackgroundColor";
import { LogTextColor } from "@spt/models/spt/logging/LogTextColor";
import { IDatabaseTables } from "@spt/models/spt/server/IDatabaseTables";
import { ILogger } from "@spt/models/spt/utils/ILogger";

export function handleSkills(tables: IDatabaseTables, logger: ILogger): void {
	const globals = tables.globals;

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
