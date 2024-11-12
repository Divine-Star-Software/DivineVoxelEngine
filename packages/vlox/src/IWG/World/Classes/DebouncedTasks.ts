import { WorldSpaces } from "../../../Data/World/WorldSpaces";
import { LocationData } from "../../../Math";

type DebouncedTasksData = {
  run: (location: LocationData) => void;
  timeOut: number;
};
export class DebouncedTasks {
  _tasks = new Map<string, any>();

  constructor(public data: DebouncedTasksData) {}
  runTasksNow([dimension, cx, cy, cz]: LocationData) {
    this.data.run([dimension, cx, cy, cz]);
  }
  runTasks([dimension, cx, cy, cz]: LocationData) {
    const columnKey = WorldSpaces.column.getKeyXYZ(cx, 0, cz);
    if (this._tasks.has(columnKey)) {
      clearTimeout(this._tasks.get(columnKey));
    }

    this._tasks.set(
      columnKey,
      setTimeout(() => {
        this.data.run([dimension, cx, cy, cz]);
      }, this.data.timeOut)
    );
  }

  clearTasks([dimension, cx, cy, cz]: LocationData) {
    const columnKey = WorldSpaces.column.getKeyXYZ(cx, 0, cz);
    if (this._tasks.has(columnKey)) {
      clearTimeout(this._tasks.get(columnKey));
      this._tasks.delete(columnKey);
    }
  }

  hasTasks(key: string) {
    return this._tasks.has(key);
  }
  hasTasksLocation([dimension, cx, cy, cz]: LocationData) {
    const columnKey = WorldSpaces.column.getKeyXYZ(cx, 0, cz);
    return this._tasks.has(columnKey);
  }
}
