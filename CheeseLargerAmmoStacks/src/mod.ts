import { DependencyContainer } from "tsyringe";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { LogTextColor } from "@spt-aki/models/spt/logging/LogTextColor";
import { LogBackgroundColor } from "@spt-aki/models/spt/logging/LogBackgroundColor";
import { IPostDBLoadMod } from "@spt-aki/models/external/IPostDBLoadMod";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";
import { IDatabaseTables } from "@spt-aki/models/spt/server/IDatabaseTables";

class Mod implements IPostDBLoadMod 
{
    postDBLoad(container: DependencyContainer): void 
    {
        const logger = container.resolve<ILogger>("WinstonLogger");
        logger.logWithColor("CHEESE!", LogTextColor.YELLOW, LogBackgroundColor.RED);

        const databaseServer = container.resolve<DatabaseServer>("DatabaseServer");
        const tables: IDatabaseTables = databaseServer.getTables();
        const items = tables.templates.items;

        for (const id in items) 
        {
            const base = items[id];

            if (base._parent.includes("5485a8684bdc2da71d8b4567")) 
            {
                editSimpleItemData(id, "StackMaxSize", 100);
            }
        }

        function editSimpleItemData(id, data, value) 
        {
            if (isNaN(value) && value !== "true" && value !== "false") 
            {
                items[id]._props[data] = value;
            }
            else 
            {
                items[id]._props[data] = JSON.parse(value);
            }
        }
    }
}

module.exports = { mod: new Mod() };
