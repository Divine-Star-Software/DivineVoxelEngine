//objects
import { DVEDL } from "../DivineVoxelEngineDataLoader.js";
import { ColumnDataTool } from "../../Tools/Data/WorldData/ColumnDataTool.js";
import { WorldDataSerialize } from "../Serializers/WorldDataSerializer.js";
import { Util } from "../../Global/Util.helper.js";
const columnDatatool = new ColumnDataTool();
export const DataHanlderWrapper = {
    handler: {},
    $INIT(handler) {
        this.handler = handler;
    },
    async loadRegionHeader(location) {
        try {
            const headerBuffer = await this.handler.getRegionHeader(location);
            if (!headerBuffer)
                return false;
            const sab = Util.convertBufferToSAB(headerBuffer);
            DVEDL.worldComm.runTasks("load-region-header", [
                location,
                sab,
            ]);
            return true;
        }
        catch (error) {
            console.error(`Problem getting region header at ${location.toString()}`);
            console.error(error);
            return false;
        }
    },
    async saveColumn(location) {
        if (columnDatatool.setLocation(location).loadIn()) {
            try {
                columnDatatool.markAsStored();
                const column = WorldDataSerialize.serializeColumn(location);
                if (!column)
                    return false;
                const success = await this.handler.saveColumn(location, column);
                if (!success) {
                    columnDatatool.markAsNotStored();
                    throw new Error(`Could not store column at ${location.toString()}`);
                }
            }
            catch (error) {
                console.error(`Problem storing column at ${location.toString()}`);
                console.error(error);
            }
        }
    },
    async loadColumn(location) {
        try {
            const column = await this.handler.getColumn(location);
            const data = WorldDataSerialize.deSerializeColumn(column);
            columnDatatool.setBuffer(data.column);
            DVEDL.worldComm.runTasks("load-column", [data.column]);
            for (const chunk of data.chunks) {
                DVEDL.worldComm.runTasks("load-chunk", [chunk]);
            }
            return true;
        }
        catch (error) {
            console.error(`Problem loading column at ${location.toString()}`);
            console.error(error);
            return false;
        }
    },
    async setPath(id) {
        try {
            await this.handler.setPath(id);
            return true;
        }
        catch (error) {
            console.error(`Problem setting path to ${id}`);
            console.error(error);
            return false;
        }
    },
    async columnExists(location) {
        try {
            return await this.handler.columnExists(location);
        }
        catch (error) {
            console.error(`Problem checking if column exists at ${location.toString()}`);
            console.error(error);
            return false;
        }
    },
    async columnTimestamp(location) {
        try {
            return await this.handler.columnTimestamp(location);
        }
        catch (error) {
            console.error(`Problem getting column timestamp at ${location.toString()}`);
            console.error(error);
            return 0;
        }
    },
    async saveRegion(location) {
        /** @TO-DO*/
        return true;
    },
    async loadRegion(location) {
        /** @TO-DO*/
        return true;
    },
};
