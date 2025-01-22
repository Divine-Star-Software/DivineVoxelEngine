import { DataCursorInterface } from "../../Data/Cursor/Interfaces/DataCursor.interface";
import { VoxelModelConstructorRegister } from "./VoxelModelConstructorRegister";
import { VoxelConstructor } from "./VoxelConstructor";
import { Vec3Array, Vector3Like } from "@amodx/math";
import { VoxelCursor } from "../../Data/Cursor/VoxelCursor";

export class VoxelGeometryLookUp {
  static voxelHash: VoxelConstructor[] = [];
  static modCache: number[] = [];
  static stateCache: number[] = [];
  static conditonalStateCache: number[] = [];
  static geometryCache: number[][] = [];
  static conditionalGeometryCache: number[][][] = [];
  static noCastAO: boolean[] = [];
  static offset: Vec3Array = [0, 0, 0];

  static voxelCursor = new VoxelCursor();

  static init() {}

  static start(dimension: string, x: number, y: number, z: number) {
    this.offset[0] = x;
    this.offset[1] = y;
    this.offset[2] = z;
  }

  static isRulesless(geoId: number) {
    return VoxelModelConstructorRegister.rulesless[geoId] == true;
  }

  static stop() {
    this.stateCache.length = 0;
    this.voxelHash.length = 0;
    this.modCache.length = 0;
    this.geometryCache.length = 0;
    this.conditionalGeometryCache.length = 0;
    this.conditonalStateCache.length = 0;
    this.noCastAO.length = 0;
  }

  static getHash(
    dataCursor: DataCursorInterface,
    x: number,
    y: number,
    z: number
  ) {
    const hashed = Vector3Like.HashXYZ(
      x - this.offset[0],
      y - this.offset[1],
      z - this.offset[2]
    );
    if (!this.stateCache[hashed]) this.hashState(dataCursor, hashed, x, y, z);
    return hashed;
  }

  private static hashState(
    dataCursor: DataCursorInterface,
    hashed: number,
    x: number,
    y: number,
    z: number
  ) {
    if (this.stateCache[hashed] !== undefined) return this.stateCache[hashed];

    const voxel = dataCursor.getVoxel(x, y, z);

    if (!voxel) {
      this.stateCache[hashed] = -1;
      return -1;
    }
    if (!voxel.isRenderable()) {
      this.stateCache[hashed] = -1;
      return -1;
    }

    const voxelConstructor =
      VoxelModelConstructorRegister.constructorsPaltte[voxel.getId()];

    if (!voxelConstructor || !voxelConstructor.isModel) {
      this.stateCache[hashed] = -1;
      return -1;
    }


    //no ao
    this.noCastAO[hashed] = voxel.isLightSource() || voxel.noAO();
    //state
    const shapeState = voxel.getShapeState();
    const state = voxelConstructor.shapeStateTree.getState(shapeState);
    this.stateCache[hashed] = state;
    //mod
    const mod = voxel.getMod();
    const modState = voxelConstructor.modTree.getState(mod);
    this.modCache[hashed] = modState;
    this.voxelCursor.copy(voxel).process();
    voxelConstructor.schema.position.x = x;
    voxelConstructor.schema.position.y = y;
    voxelConstructor.schema.position.z = z;
    voxelConstructor.schema.voxel = this.voxelCursor;
    voxelConstructor.schema.dataCursor = dataCursor;

    const conditonalState =
      voxelConstructor.condtioanlShapeStateTree.getState();

    this.voxelHash[hashed] = voxelConstructor;
    this.conditonalStateCache[hashed] = conditonalState;

    this.geometryCache[hashed] =
      voxelConstructor.data.shapeStateGeometryMap[state];

    this.conditionalGeometryCache[hashed] =
      voxelConstructor.data.condiotnalShapeStateGeometryMap[conditonalState];

    return state;
  }
}
