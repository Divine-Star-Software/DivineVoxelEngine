import { VoxelConstructorsRegister } from "../../Mesher/Constructors/Voxel/VoxelConstructorsRegister";
import { DataTool } from "../../Tools/Data/DataTool";
import { VoxelModelConstructorRegister } from "./Register/VoxelModelConstructorRegister";
import { VoxelModelVoxelConstructor } from "./VoxelModelVoxelConstructor";
import { Vec3Array, Vector3Like } from "@amodx/math";

export class VoxelGeometryLookUp {
  static dataTool: DataTool;
  static voxelHash: VoxelModelVoxelConstructor[] = [];
  static modCache: number[] = [];
  static stateCache: number[] = [];
  static conditonalStateCache: number[] = [];
  static geometryCache: number[][] = [];
  static conditionalGeometryCache: number[][][] = [];
  static noCastAO: boolean[] = [];
  static offset: Vec3Array = [0, 0, 0];

  static init() {
    this.dataTool = new DataTool();
  }

  static start(dimension: string, x: number, y: number, z: number) {
    this.dataTool.setDimension(dimension);
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

  static getHash(x: number, y: number, z: number) {
    const hashed = Vector3Like.HashXYZ(
      x - this.offset[0],
      y - this.offset[1],
      z - this.offset[2]
    );
    if (!this.stateCache[hashed]) this.hashState(hashed, x, y, z);
    return hashed;
  }

  private static hashState(hashed: number, x: number, y: number, z: number) {
    if (this.stateCache[hashed] !== undefined) return this.stateCache[hashed];

    if (!this.dataTool.loadInAt(x, y, z)) {
      this.stateCache[hashed] = -1;
      return -1;
    }
    if (!this.dataTool.isRenderable()) {
      this.stateCache[hashed] = -1;
      return -1;
    }

    const voxelConstructor = VoxelConstructorsRegister.constructorsPaltte[
      this.dataTool.getId()
    ] as VoxelModelVoxelConstructor;

    if (!voxelConstructor || !voxelConstructor.isModel) {
      this.stateCache[hashed] = -1;
      return -1;
    }
    voxelConstructor.model.schema.voxel.setDimension(this.dataTool.dimension);
    voxelConstructor.model.schema.voxel.loadInAt(x, y, z);
    const shapeState = this.dataTool.getShapeState();
    const state = voxelConstructor.model.shapeStateTree.getState(shapeState);
    const mod = this.dataTool.getMod();
    const modState = voxelConstructor.modTree.getState(mod);
    this.modCache[hashed] = modState;
    const conditonalState =
      voxelConstructor.model.condtioanlShapeStateTree.getState(shapeState);
    this.stateCache[hashed] = state;

    this.voxelHash[hashed] = voxelConstructor;
    this.conditonalStateCache[hashed] = conditonalState;

    this.noCastAO[hashed] =
      this.dataTool.isLightSource() || this.dataTool.noAO();

    this.geometryCache[hashed] =
      voxelConstructor.model.data.shapeStateGeometryMap[state];

    this.conditionalGeometryCache[hashed] =
      voxelConstructor.model.data.condiotnalShapeStateGeometryMap[
        conditonalState
      ];

    return state;
  }
}
