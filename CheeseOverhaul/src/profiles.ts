import { LogBackgroundColor } from "@spt/models/spt/logging/LogBackgroundColor";
import { LogTextColor } from "@spt/models/spt/logging/LogTextColor";
import { profileHideoutConfig } from "./profileHideoutConfig";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { IDatabaseTables } from "@spt/models/spt/server/IDatabaseTables";

export function handleProfiles(tables: IDatabaseTables, logger: ILogger): void {
	const templates = tables.templates;

	templates.profiles["CHEESE ZERO STATE"] = cloneProfile(
		templates.profiles["SPT Zero to hero"]
	);
	delete templates.profiles["Standard"];
	delete templates.profiles["Left Behind"];
	delete templates.profiles["Prepare To Escape"];
	delete templates.profiles["Edge Of Darkness"];
	delete templates.profiles["Unheard"];
	delete templates.profiles["Tournament"];
	delete templates.profiles["SPT Easy start"];
	delete templates.profiles["SPT Developer"];
	delete templates.profiles["SPT Zero to hero"];

	logger.logWithColor(
		"Handled Profiles",
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
		cloneProfile[pmc].character.Hideout.Areas = profileHideoutConfig;
	};
	loadDataContent("bear");
	loadDataContent("usec");
	return cloneProfile;
}
