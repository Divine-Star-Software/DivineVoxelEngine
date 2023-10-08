import type { Generator } from "World/Classes/Generator";

export type IWGGeneratorData = {
  id: string;
  positionWatch:
    | number[]
    | Float32Array
    | Float64Array
    | Int32Array
    | Int16Array;

} & IWGSettignsData;


export type IWGSettignsData = {
  renderDistance: number;
  generateDistance: number;
  saveWorldData ?: boolean;
  maxDistance?: number;
  anaylzerDistance?: number;
}

export type IWGTasksData = {
  id: string;
  name : string,
  run: (
    generator: Generator,
    x: number,
    y: number,
    z: number,
    onDone: Function
  ) => void;
  propagationBlocking?: boolean;

};

export type IWGTasksTypes = "world-gen" | "saving" | "updating";
