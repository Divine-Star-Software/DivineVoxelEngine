import { DivineVoxelEngineWorld } from "../../../../Contexts/World";
import { LocationData } from "../../../../Math";

import { ColumnData } from "../../../../Data/World/Classes";

export class DataSerializerTool {
  serializeColumn(
    location: LocationData,
    onDone: (buffer: ArrayBuffer | false) => void
  ) {
    DivineVoxelEngineWorld.instance.threads.constructors.runPromiseTasks(
      "serialize-column",
      location,
      [],
      (buffer) => {
        onDone(buffer);
      }
    );
  }
  serializeColumnAsync(location: LocationData) {
    return new Promise<ArrayBuffer | false>((resolve) => {
      this.serializeColumn(location, (buffer) => {
        resolve(buffer);
      });
    });
  }

  deSerializeColumn(
    column: ArrayBuffer,
    onDone: (columnData: ColumnData) => void
  ) {
    DivineVoxelEngineWorld.instance.threads.constructors.runPromiseTasks(
      "deserialize-column",
      column,
      [column],
      (buffer) => {
        onDone(buffer);
      }
    );
  }
  deSerializeColumnAsync(column: ArrayBuffer) {
    return new Promise<ColumnData>((resolve) => {
      this.deSerializeColumn(column, (buffer) => {
        resolve(buffer);
      });
    });
  }
}
