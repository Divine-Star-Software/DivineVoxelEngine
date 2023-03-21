import { DBO } from "divine-binary-object";
import { RichDataRegister } from "../Register/RichDataRegister.js";
import { RichColumnDataTool } from "../Tools/RichColumnDataTool.js";
import { RichDataTool } from "../Tools/RichDataTool.js";
import { ThreadComm } from "threadcomm";
const richTool = new RichDataTool();
const richColumnTool = new RichColumnDataTool();
export const RichWorldTasks = {
    hasData: ThreadComm.registerTasks("has-data", (location, onDone) => {
        if (onDone)
            onDone(Boolean(RichDataRegister.column.get(location)));
    }, "deferred"),
    getData: ThreadComm.registerTasks("get-data", ([location, segment], onDone) => {
        if (!onDone)
            return false;
        if (!richTool.setSegment(segment).setLocation(location).loadIn()) {
            return onDone(false);
        }
        const buffer = DBO.objectToBuffer(richTool.getData());
        onDone(buffer, buffer);
    }, "deferred"),
    setData: ThreadComm.registerTasks("set-data", ([location, segment, objectBuffer], onDone) => {
        richColumnTool.setLocation(location).loadIn();
        richTool.setSegment(segment).setLocation(location).loadIn();
        if (onDone)
            onDone(richTool.setData(DBO.bufferToObject(objectBuffer)).commit());
    }, "deferred"),
    removeData: ThreadComm.registerTasks("remove-data", ([location, segment], onDone) => {
        if (onDone)
            onDone(richTool.setSegment(segment).setLocation(location).delete());
    }, "deferred"),
    removeColumn: ThreadComm.registerTasks("remove-column", (location, onDone) => {
        const column = RichDataRegister.column.get(location);
        if (!column)
            return onDone(false);
        RichDataRegister.column.remove(location);
        onDone(true);
    }, "deferred"),
    getColumn: ThreadComm.registerTasks("get-column", (location, onDone) => {
        const column = RichDataRegister.column.get(location);
        if (!column)
            return onDone(false);
        const buf = DBO.objectToBuffer(column.data);
        onDone(buf, buf);
    }, "deferred"),
    setColumn: ThreadComm.registerTasks("set-column", ([location, buffer], onDone) => {
        if (!onDone)
            return false;
        const column = RichDataRegister.column.add(location);
        column.data = DBO.bufferToObject(buffer);
        return onDone(true);
    }, "deferred"),
    releaseAllData: ThreadComm.registerTasks("release-all-data", (data, onDone) => {
        RichDataRegister.releaeeAll();
        if (onDone)
            onDone(true);
    }, "deferred"),
};
