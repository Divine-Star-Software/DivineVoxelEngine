//tools
//data
import { QuadScalarVertexData } from "../Geomtry/Primitives/QuadVertexData";
import { VoxelFaces, VoxelFacesArray } from "../../Math";
import { QuadVerticies } from "../Geomtry/Geometry.types";
import calculateFaceData from "./Common/Calc/FaceDataCalc.js";
import { VoxelMesh } from "../Geomtry/VoxelMesh";
import { VoxelMeshBVHBuilder } from "../Geomtry/VoxelMeshBVHBuilder";
import { Vec3Array, Vector3Like, Vector4Like } from "@amodx/math";
import { VoxelCursorInterface } from "../../Voxels/Cursor/VoxelCursor.interface.js";
import { DataCursorInterface } from "../../Voxels/Cursor/DataCursor.interface.js";
import { VoxelGeometryBuilderCacheSpace } from "./VoxelGeometryBuilderCacheSpace";

class VoxelVars {

  textureIndex = 0;
  overlayTextures = Vector4Like.Create();
  light = new QuadScalarVertexData();
  ao = new QuadScalarVertexData();
  animation = new QuadScalarVertexData();
  level = new QuadScalarVertexData();

  reset() {
    this.textureIndex = 0;
    this.overlayTextures.x = 0;
    this.overlayTextures.y = 0;
    this.overlayTextures.z = 0;
    this.overlayTextures.w = 0;
  }
}

export class VoxelModelBuilder {
  space: VoxelGeometryBuilderCacheSpace;
  voxel: VoxelCursorInterface;
  nVoxel: DataCursorInterface;
  /**The current world position */
  position = Vector3Like.Create();
  /**The current local origin  */
  origin = Vector3Like.Create();

  mesh = new VoxelMesh();
  bvhTool: VoxelMeshBVHBuilder | null = null;

  vars = new VoxelVars();

  dataCalculated: Record<VoxelFaces, boolean>;

  condiotnalGeometryData: Record<
    VoxelFaces,
    Record<QuadVerticies, [number[][], number[][], number[][]]>
  >;
  lightData: Record<VoxelFaces, Record<QuadVerticies, number>>;
  effects: Record<string, number[]>;

  constructor(
    public id: string,
    public materialIndex: number
  ) {
    //  this.faceDataOverride.currentVoxel = this.voxel;
    //  this.faceDataOverride.neighborVoxel = this.nVoxel;

    this.dataCalculated = [] as any;
    for (const face of VoxelFacesArray) {
      this.dataCalculated[face] = false;
    }

    this.condiotnalGeometryData = [] as any;
    for (const face of VoxelFacesArray) {
      this.condiotnalGeometryData[face] = [] as any;
      this.condiotnalGeometryData[face][QuadVerticies.TopRight] = [[], [], []];
      this.condiotnalGeometryData[face][QuadVerticies.TopLeft] = [[], [], []];
      this.condiotnalGeometryData[face][QuadVerticies.BottomLeft] = [
        [],
        [],
        [],
      ];
      this.condiotnalGeometryData[face][QuadVerticies.BottomRight] = [
        [],
        [],
        [],
      ];
    }
    this.lightData = [] as any;
    for (const face of VoxelFacesArray) {
      this.lightData[face] = [] as any;
      this.lightData[face][QuadVerticies.TopRight] = 0;
      this.lightData[face][QuadVerticies.TopLeft] = 0;
      this.lightData[face][QuadVerticies.BottomLeft] = 0;
      this.lightData[face][QuadVerticies.BottomRight] = 0;
    }
  }

  bounds: { min: Vec3Array; max: Vec3Array } = {
    min: [0, 0, 0],
    max: [0, 0, 0],
  };
  _indexStart = 0;

  startConstruction() {
    this._indexStart = this.mesh!.indicieCount;
    this.bounds.min[0] = Infinity;
    this.bounds.min[1] = Infinity;
    this.bounds.min[2] = Infinity;
    this.bounds.max[0] = -Infinity;
    this.bounds.max[1] = -Infinity;
    this.bounds.max[2] = -Infinity;
    this._boundsUpdate = false;
  }

  endConstruction() {
    this.vars.reset();

    if (this.bvhTool) {
      if (!this._boundsUpdate) return false;

      this.bvhTool.updateVoxel(
        this.position.x,
        this.position.y,
        this.position.z,
        this._indexStart,
        this.materialIndex,
        this.mesh!.indicieCount,
        this.bounds.min[0],
        this.bounds.min[1],
        this.bounds.min[2],
        this.bounds.max[0],
        this.bounds.max[1],
        this.bounds.max[2]
      );

    }

    return true;
  }

  

  _boundsUpdate = false;
  updateBounds(bounds: [Vec3Array, Vec3Array]) {
    const origin = this.origin;
    //min
    if (origin.x + bounds[0][0] < this.bounds.min[0])
      this.bounds.min[0] = origin.x + bounds[0][0];
    if (origin.y + bounds[0][1] < this.bounds.min[1])
      this.bounds.min[1] = origin.y + bounds[0][1];
    if (origin.z + bounds[0][2] < this.bounds.min[2])
      this.bounds.min[2] = origin.z + bounds[0][2];
    //max
    if (origin.x + bounds[1][0] > this.bounds.max[0])
      this.bounds.max[0] = origin.x + bounds[1][0];
    if (origin.y + bounds[1][1] > this.bounds.max[1])
      this.bounds.max[1] = origin.y + bounds[1][1];
    if (origin.z + bounds[1][2] > this.bounds.max[2])
      this.bounds.max[2] = origin.z + bounds[1][2];

    this._boundsUpdate = true;
  }

  calculateFaceData(direction: VoxelFaces) {
    if (this.dataCalculated[direction]) return true;
    calculateFaceData(direction, this);
    this.dataCalculated[direction] = true;
  }

  clearCalculatedData() {
    this.dataCalculated[VoxelFaces.Up] = false;
    this.dataCalculated[VoxelFaces.Down] = false;
    this.dataCalculated[VoxelFaces.North] = false;
    this.dataCalculated[VoxelFaces.South] = false;
    this.dataCalculated[VoxelFaces.East] = false;
    this.dataCalculated[VoxelFaces.West] = false;
  }

  clear() {
    this.vars.reset();
    this.mesh.clear();
    return this;
  }
}
