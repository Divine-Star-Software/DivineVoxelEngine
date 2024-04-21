import { DBO } from "@divinestar/binary/";
import {
  GetRichDataTasks,
  SetRichColumnTasks,
  SetRichDataTasks,
} from "../../Types/Tasks.types.js";
import { RichColumnDataTool } from "./Tools/RichColumnDataTool.js";
import { RichDataTool } from "./Tools/RichDataTool.js";
import { ThreadComm } from "@divinestar/threads/";
import { LocationData } from "@divinevoxel/core/Math";
import { DivineVoxelEngineRichWorld } from "./DivineStarVoxelEngineRichWorld.js";

export default function (DVERW: DivineVoxelEngineRichWorld) {
  const richTool = new RichDataTool();
  const richColumnTool = new RichColumnDataTool();
  const RichDataRegister = DVERW.register;
  ThreadComm.registerTasks<LocationData>(
    "has-data",
    (location, onDone) => {
      if (onDone) onDone(Boolean(RichDataRegister.column.get(location)));
    },
    "deferred"
  );
  ThreadComm.registerTasks<GetRichDataTasks>(
    "get-data",
    ([location, segment], onDone) => {
      if (!onDone) return false;
      if (!richTool.setSegment(segment).setLocation(location).loadIn()) {
        return onDone(false);
      }

      const buffer = DBO.objectToBuffer(richTool.getData());
      onDone(buffer, buffer);
    },
    "deferred"
  );
  ThreadComm.registerTasks<SetRichDataTasks>(
    "set-data",
    ([location, segment, objectBuffer], onDone) => {
      richColumnTool.setLocation(location).loadIn();
      richTool.setSegment(segment).setLocation(location).loadIn();
      if (onDone)
        onDone(richTool.setData(DBO.bufferToObject(objectBuffer)).commit());
    },
    "deferred"
  );
  ThreadComm.registerTasks<GetRichDataTasks>(
    "remove-data",
    ([location, segment], onDone) => {
      if (onDone)
        onDone(richTool.setSegment(segment).setLocation(location).delete());
    },
    "deferred"
  );
  ThreadComm.registerTasks<LocationData>(
    "remove-column",
    (location, onDone) => {
      const column = RichDataRegister.column.get(location);
      if (!column) return onDone!(false);
      RichDataRegister.column.remove(location);
      onDone!(true);
    },
    "deferred"
  );
  ThreadComm.registerTasks<LocationData>(
    "get-column",
    (location, onDone) => {
      const column = RichDataRegister.column.get(location);
      if (!column) return onDone!(false);
      const buf = DBO.objectToBuffer(column.data);
      onDone!(buf, buf);
    },
    "deferred"
  );
  ThreadComm.registerTasks<SetRichColumnTasks>(
    "set-column",
    ([location, buffer], onDone) => {
      if (!onDone) return false;

      const column = RichDataRegister.column.add(location);
      column.data = DBO.bufferToObject(buffer);
      return onDone(true);
    },
    "deferred"
  );
  ThreadComm.registerTasks(
    "release-all-data",
    (data, onDone) => {
      RichDataRegister.releaeeAll();
      if (onDone) onDone(true);
    },
    "deferred"
  );
}
