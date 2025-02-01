import { DataCursorInterface } from "../../Data/Cursor/DataCursor.interface";
import { VoxelModelConstructorRegister } from "./VoxelModelConstructorRegister";
import { Vec3Array, Vector3Like } from "@amodx/math";
import { VoxelCursor } from "../../Voxels/Cursor/VoxelCursor";
import { GetYXZOrderArrayIndex } from "../../Math/Indexing";

export class VoxelGeometryLookUpSpace {
  foundHash: Uint8Array;
  voxelHash: Uint16Array;
  modCache: Int32Array;
  stateCache: Int32Array;
  conditonalStateCache: Int32Array;
  noCastAO: Uint8Array;
  offset: Vec3Array = [0, 0, 0];
  constructor(public bounds: Vector3Like) {
    const volume = bounds.x * bounds.y * bounds.z;
    this.foundHash = new Uint8Array(volume);
    this.voxelHash = new Uint16Array(volume);
    this.modCache = new Int32Array(volume);
    this.stateCache = new Int32Array(volume);
    this.conditonalStateCache = new Int32Array(volume);
    this.noCastAO = new Uint8Array(volume);
  }
  start(x: number, y: number, z: number) {
    this.offset[0] = x;
    this.offset[1] = y;
    this.offset[2] = z;
    this.foundHash.fill(0);
    this.conditonalStateCache.fill(-1);
    this.stateCache.fill(-1);
    this.modCache.fill(-1);
  }

  getIndex(x: number, y: number, z: number) {
    return GetYXZOrderArrayIndex(
      x - this.offset[0],
      y - this.offset[1],
      z - this.offset[2],
      this.bounds.x,
      this.bounds.y,
      this.bounds.z
    );
  }

  getConstructor(index: number) {
    if (this.foundHash[index] !== 2) return null;
    return VoxelModelConstructorRegister.constructorsPaltte[
      this.voxelHash[index]
    ];
  }
  getGeomtry(index: number) {
    if (this.foundHash[index] !== 2) return false;
    return VoxelModelConstructorRegister.constructorsPaltte[
      this.voxelHash[index]
    ].data.shapeStateGeometryMap[this.stateCache[index]];
  }
  getConditionalGeomtry(index: number) {
    if (this.foundHash[index] !== 2) return false;
    return VoxelModelConstructorRegister.constructorsPaltte[
      this.voxelHash[index]
    ].data.condiotnalShapeStateGeometryMap[this.conditonalStateCache[index]];
  }
}

export class VoxelGeometryLookUp {
  static space: VoxelGeometryLookUpSpace | null = null;

  static voxelCursor = new VoxelCursor();

  static createSpace(x: number, y: number, z: number) {
    return new VoxelGeometryLookUpSpace({ x, y, z });
  }

  static init() {}

  static start(space: VoxelGeometryLookUpSpace) {
    this.space = space;
  }

  static isRulesless(geoId: number) {
    return VoxelModelConstructorRegister.rulesless[geoId] == true;
  }

  static stop() {}

  static getHash(
    dataCursor: DataCursorInterface,
    x: number,
    y: number,
    z: number
  ) {
    if (!this.space)
      throw new Error(`Voxel geomtry look up must have space set`);
    const hashed = this.space?.getIndex(x, y, z);
    if (this.space.foundHash[hashed] == 0)
      this.hashState(dataCursor, hashed, x, y, z);
    return hashed;
  }
  private static hashState(
    dataCursor: DataCursorInterface,
    index: number,
    x: number,
    y: number,
    z: number
  ) {
    if (!this.space)
      throw new Error(`Voxel geomtry look up must have space set`);
    if (this.space.foundHash[index] == 2) return this.space.stateCache[index];

    const voxel = dataCursor.getVoxel(x, y, z);

    if (!voxel) {
      this.space.foundHash[index] = 1;
      return -1;
    }
    if (!voxel.isRenderable()) {
      this.space.foundHash[index] = 1;
      return -1;
    }

    const voxelConstructor =
      VoxelModelConstructorRegister.constructorsPaltte[voxel.getId()];
    this.space.voxelHash[index] = voxel.getId();
    if (!voxelConstructor || !voxelConstructor.isModel) {
      this.space.foundHash[index] = 1;
      return -1;
    }
    this.space.foundHash[index] = 2;

    //no ao
    this.space.noCastAO[index] = voxel.isLightSource() || voxel.noAO() ? 1 : 0;
    //state
    const shapeState = voxel.getState();
    const state = voxelConstructor.shapeStateTree.getState(shapeState);
    this.space.stateCache[index] = state;
    //mod
    const mod = voxel.getMod();
    const modState = voxelConstructor.modTree.getState(mod);
    this.space.modCache[index] = modState;
    this.voxelCursor.copy(voxel).process();
    voxelConstructor.schema.position.x = x;
    voxelConstructor.schema.position.y = y;
    voxelConstructor.schema.position.z = z;
    voxelConstructor.schema.voxel = this.voxelCursor;
    voxelConstructor.schema.dataCursor = dataCursor;

    const conditonalState =
      voxelConstructor.condtioanlShapeStateTree.getState();

    this.space.conditonalStateCache[index] = conditonalState;

    return state;
  }
}
