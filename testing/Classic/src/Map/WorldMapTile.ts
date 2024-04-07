import { LocationData } from "@divinevoxel/core/Math";
import { WorldMap } from "./WorldMap";
import { EntityInstance } from "@divinevoxel/core/Render/Tools/EntityInstance";

export class WorldMapTile {
  static GetQuad() {
    const meterSize = [16, 16];
    const positions: number[] = [
      //1
      0,
      0,
      0,
      //2
      meterSize[0],
      0,
      0,
      //3
      meterSize[0],
      0,
      meterSize[1],
      //3
      0,
      0,
      meterSize[1],
    ];
    const normals: number[] = [0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0];
    const indicies: number[] = [0, 1, 2, 2, 3, 0];
    const uvs: number[] = [
      //1
      0, 0,
      //2
      0, 0,
      //3
      0, 0,
      //4
      0, 0,
    ];

    return {
      positions,
      indicies,
      normals,
      uvs,
    };
  }

  _instance: EntityInstance;

  constructor(public worldMap: WorldMap, public location: LocationData) {
    const instance = this.worldMap._instanceTool.getInstance();
    if (!instance) {
      console.warn(`Could not load tile instance for ${location}`);
    } else {
      this._instance = instance;
    }
   
    this._instance.position.set(location[1], location[2], location[3]);
  }
}
