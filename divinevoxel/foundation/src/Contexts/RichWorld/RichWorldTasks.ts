import { BinaryObject } from "@amodx/binary/";
import {
  GetRichDataTasks,
  SetRichColumnTasks,
  SetRichDataTasks,
} from "../../Types/Tasks.types.js";
import { RichColumnDataTool } from "./Tools/RichColumnDataTool.js";
import { RichDataTool } from "./Tools/RichDataTool.js";
import { Threads } from "@amodx/threads/";
import { LocationData } from "@divinevoxel/core/Math";
import { DivineVoxelEngineRichWorld } from "./DivineStarVoxelEngineRichWorld.js";

export default function (DVERW: DivineVoxelEngineRichWorld) {
  const richTool = new RichDataTool();
  const richColumnTool = new RichColumnDataTool();
  const RichDataRegister = DVERW.register;
  Threads.registerTasks<LocationData>(
    "has-data",
    (location, onDone) => {
      if (onDone) onDone(Boolean(RichDataRegister.column.get(location)));
    },
    "deferred"
  );
  Threads.registerTasks<GetRichDataTasks>(
    "get-data",
    ([location, segment], onDone) => {
      if (!onDone) return false;
      if (!richTool.setSegment(segment).setLocation(location).loadIn()) {
        return onDone(false);
      }

      const buffer = BinaryObject.objectToBuffer(richTool.getData());
      onDone(buffer, buffer);
    },
    "deferred"
  );
  Threads.registerTasks<SetRichDataTasks>(
    "set-data",
    ([location, segment, objectBuffer], onDone) => {
      richColumnTool.setLocation(location).loadIn();
      richTool.setSegment(segment).setLocation(location).loadIn();
      if (onDone)
        onDone(
          richTool.setData(BinaryObject.bufferToObject(objectBuffer)).commit()
        );
    },
    "deferred"
  );
  Threads.registerTasks<GetRichDataTasks>(
    "remove-data",
    ([location, segment], onDone) => {
      if (onDone)
        onDone(richTool.setSegment(segment).setLocation(location).delete());
    },
    "deferred"
  );
  Threads.registerTasks<LocationData>(
    "remove-column",
    (location, onDone) => {
      const column = RichDataRegister.column.get(location);
      if (!column) return onDone!(false);
      RichDataRegister.column.remove(location);
      onDone!(true);
    },
    "deferred"
  );
  Threads.registerTasks<LocationData>(
    "get-column",
    (location, onDone) => {
      const column = RichDataRegister.column.get(location);
      if (!column) return onDone!(false);
      const buf = BinaryObject.objectToBuffer(column.data);
      onDone!(buf, buf);
    },
    "deferred"
  );
  Threads.registerTasks<SetRichColumnTasks>(
    "set-column",
    ([location, buffer], onDone) => {
      if (!onDone) return false;

      const column = RichDataRegister.column.add(location);
      column.data = BinaryObject.bufferToObject(buffer);
      return onDone(true);
    },
    "deferred"
  );
  Threads.registerTasks(
    "release-all-data",
    (data, onDone) => {
      RichDataRegister.releaeeAll();
      if (onDone) onDone(true);
    },
    "deferred"
  );
}
