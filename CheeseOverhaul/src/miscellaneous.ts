import { LogBackgroundColor } from "@spt/models/spt/logging/LogBackgroundColor";
import { LogTextColor } from "@spt/models/spt/logging/LogTextColor";
import { IDatabaseTables } from "@spt/models/spt/server/IDatabaseTables";
import { ILogger } from "@spt/models/spt/utils/ILogger";

export function handleMiscellaneous(
	tables: IDatabaseTables,
    repairConfig: any,
	logger: ILogger
): void {
	const globals = tables.globals;
	const suits = tables.templates.customization;

	//Disable run through
	globals.config.exp.match_end.survived_exp_requirement = 0;
	globals.config.exp.match_end.survived_seconds_requirement = 0;

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

	//Buff base mag load speed
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

	//Allow bringing any item into raid
	globals.config.RestrictionsInRaid = [];

	//Allow lossless armor repair with kit
	for (const armorMaterial in globals.config.ArmorMaterials) {
		globals.config.ArmorMaterials[armorMaterial].MaxRepairKitDegradation = 0;
		globals.config.ArmorMaterials[armorMaterial].MinRepairKitDegradation = 0;
	}

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

	//Repair tweaks
	repairConfig.armorKitSkillPointGainPerRepairPointMultiplier = 10;
	repairConfig.weaponTreatment.pointGainMultiplier = 10;
	repairConfig.applyRandomizeDurabilityLoss = false;

	logger.logWithColor(
		"Handled Miscellaneous",
		LogTextColor.BLACK,
		LogBackgroundColor.YELLOW
	);
}
