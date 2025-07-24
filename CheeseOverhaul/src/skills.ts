import { LogBackgroundColor } from "@spt/models/spt/logging/LogBackgroundColor";
import { LogTextColor } from "@spt/models/spt/logging/LogTextColor";
import { IDatabaseTables } from "@spt/models/spt/server/IDatabaseTables";
import { ILogger } from "@spt/models/spt/utils/ILogger";

export function handleSkills(tables: IDatabaseTables, logger: ILogger): void {
	const config = tables.globals.config;

	//Disable skill fatigue
	config.SkillMinEffectiveness = 1;
	config.SkillFreshEffectiveness = 1;

	//Weapon Skills
	config.SkillsSettings.Pistol.WeaponShotAction = 1.5;
	config.SkillsSettings.Revolver.WeaponShotAction = 1.5;
	config.SkillsSettings.DMR.WeaponShotAction = 1.5;
	config.SkillsSettings.Assault.WeaponShotAction = 1.5;
	config.SkillsSettings.Shotgun.WeaponShotAction = 1.5;
	config.SkillsSettings.Sniper.WeaponShotAction = 1.5;

	//Character Skills
	config.SkillsSettings.Charisma.BonusSettings.LevelBonusSettings.InsuranceDiscount = 0.01;
	config.SkillsSettings.Charisma.BonusSettings.LevelBonusSettings.RepeatableQuestChangeDiscount = 0.01;
	config.SkillsSettings.Charisma.BonusSettings.LevelBonusSettings.PaidExitDiscount = 0.01;
	config.SkillsSettings.Charisma.BonusSettings.LevelBonusSettings.HealthRestoreDiscount = 0.01;
	config.SkillsSettings.Charisma.BonusSettings.LevelBonusSettings.HealthRestoreTraderDiscount = 0.01;
	config.SkillsSettings.MagDrills.RaidUnloadedAmmoAction = 0.4;
	config.SkillsSettings.MagDrills.RaidLoadedAmmoAction = 0.6;
	config.SkillsSettings.Immunity.StimulatorNegativeBuff = 0.02;
	config.SkillsSettings.Endurance.SprintAction = 0.1;
	config.SkillsSettings.Endurance.MovementAction = 0.015;
	config.SkillsSettings.Strength.ThrowAction = 4;
	config.SkillsSettings.Strength.SprintActionMax = 0.3;
	config.SkillsSettings.Strength.SprintActionMin = 0.1;
	config.SkillsSettings.Strength.MovementActionMax = 0.3;
	config.SkillsSettings.Strength.MovementActionMin = 0.1;
	config.SkillsSettings.StressResistance.HealthNegativeEffect = 6;
	config.SkillsSettings.Vitality.DamageTakenAction = 0.2;
	config.SkillsSettings.Perception.OnlineAction = 4;
	config.SkillsSettings.Perception.UniqueLoot = 0.5;
	config.SkillsSettings.Throwing.ThrowAction = 10;
	config.SkillsSettings.RecoilControl.RecoilBonusPerLevel = 0.005;
	config.SkillsSettings.RecoilControl.RecoilAction = 0.0006;
	config.SkillsSettings.AimDrills.WeaponShotAction = 2;
	config.SkillsSettings.TroubleShooting.SkillPointsPerMalfFix = 200;
	config.SkillsSettings.Surgery.SurgeryAction = 100;
	config.SkillsSettings.Search.FindAction = 1.5;
	config.SkillsSettings.Search.SearchAction = 3;
	config.SkillsSettings.CovertMovement.MovementAction = 10;

	//Light Vests
	config.SkillsSettings.LightVests.MoveSpeedPenaltyReductionHVestsReducePerLevel = 0.02;
	config.SkillsSettings.LightVests.RicochetChanceHVestsCurrentDurabilityThreshold = 0.01;
	config.SkillsSettings.LightVests.RicochetChanceHVestsEliteLevel = 0.3;
	config.SkillsSettings.LightVests.RicochetChanceHVestsMaxDurabilityThreshold = 1;
	config.SkillsSettings.LightVests.MeleeDamageLVestsReducePerLevel = 0.01;
	config.SkillsSettings.LightVests.MoveSpeedPenaltyReductionLVestsReducePerLevel = 0.02;
	config.SkillsSettings.LightVests.WearAmountRepairLVestsReducePerLevel = 0.02;
	config.SkillsSettings.LightVests.WearChanceRepairLVestsReduceEliteLevel = 1;

	//Light Vests Buffs
	config.SkillsSettings.LightVests.BuffSettings.RareBuffChanceCoff = 0.4;
	config.SkillsSettings.LightVests.BuffSettings.MaxDurabilityLossToRemoveBuff = 1;
	config.SkillsSettings.LightVests.BuffSettings.CurrentDurabilityLossToRemoveBuff = 1;

	//Heavy Vests
	config.SkillsSettings.HeavyVests.MoveSpeedPenaltyReductionHVestsReducePerLevel = 0.02;
	config.SkillsSettings.HeavyVests.RicochetChanceHVestsCurrentDurabilityThreshold = 0.01;
	config.SkillsSettings.HeavyVests.RicochetChanceHVestsEliteLevel = 0.3;
	config.SkillsSettings.HeavyVests.RicochetChanceHVestsMaxDurabilityThreshold = 1;
	config.SkillsSettings.HeavyVests.MeleeDamageLVestsReducePerLevel = 0.01;
	config.SkillsSettings.HeavyVests.MoveSpeedPenaltyReductionLVestsReducePerLevel = 0.02;
	config.SkillsSettings.HeavyVests.WearAmountRepairLVestsReducePerLevel = 0.02;
	config.SkillsSettings.HeavyVests.WearChanceRepairLVestsReduceEliteLevel = 1;

	// Heavy Vests Buffs
	config.SkillsSettings.HeavyVests.BuffSettings.RareBuffChanceCoff = 0.4;
	config.SkillsSettings.HeavyVests.BuffSettings.MaxDurabilityLossToRemoveBuff = 1;
	config.SkillsSettings.HeavyVests.BuffSettings.CurrentDurabilityLossToRemoveBuff = 1;

	//Weapon Maintenance
	config.SkillsSettings.WeaponTreatment.DurLossReducePerLevel = 0.01;
	config.SkillsSettings.WeaponTreatment.SkillPointsPerRepair = 50;
	config.SkillsSettings.WeaponTreatment.WearAmountRepairGunsReducePerLevel = 0.02;
	config.SkillsSettings.WeaponTreatment.WearChanceRepairGunsReduceEliteLevel = 1;
	config.SkillsSettings.WeaponTreatment.BuffSettings.CurrentDurabilityLossToRemoveBuff = 0.5;
	config.SkillsSettings.WeaponTreatment.BuffSettings.MaxDurabilityLossToRemoveBuff = 0.5;

	//Crafting
	config.SkillsSettings.Crafting.PointsPerCraftingCycle = 1000;
	config.SkillsSettings.Crafting.PointsPerUniqueCraftCycle = 1000;
	config.SkillsSettings.Crafting.ProductionTimeReductionPerLevel = 1.6;
	config.SkillsSettings.Crafting.CraftTimeReductionPerLevel = 1.6;
	config.SkillsSettings.Crafting.EliteExtraProductions = 2;

	//Hideout Management
	config.SkillsSettings.HideoutManagement.SkillPointsPerAreaUpgrade = 100;
	config.SkillsSettings.HideoutManagement.SkillPointsPerCraft = 5;
	config.SkillsSettings.HideoutManagement.EliteSlots.BitcoinFarm.Container = 20;
	config.SkillsSettings.HideoutManagement.EliteSlots.Generator.Slots = 4;
	config.SkillsSettings.HideoutManagement.EliteSlots.WaterCollector.Slots = 4;

	logger.logWithColor(
		"Handled Skills",
		LogTextColor.BLACK,
		LogBackgroundColor.YELLOW
	);
}
