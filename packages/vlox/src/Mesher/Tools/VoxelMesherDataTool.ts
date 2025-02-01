//tools
import { MesherDataTool } from "../Geomtry/Tools/MesherDataTools";
//data
import { QuadScalarVertexData } from "../Geomtry/Primitives/QuadVertexData";
import { VoxelFaces, VoxelFacesArray } from "../../Math";
import { QuadVerticies } from "../Geomtry/Geometry.types";
import { FaceDataCalc } from "../Models/Common/Calc/FaceDataCalc.js";
import { VoxelMesh } from "../Geomtry/VoxelMesh";
import { VoxelMeshBVHBuilder } from "./VoxelMeshBVHBuilder";
import { Vec3Array, Vector3Like } from "@amodx/math";
import { VoxelCursorInterface } from "../../Voxels/Cursor/VoxelCursor.interface.js";
import { DataCursorInterface } from "../../Data/Cursor/DataCursor.interface.js";

class VoxelVars {
  faceFlipped = false;
  textureIndex = 0;
  light = new QuadScalarVertexData();
  ao = new QuadScalarVertexData();
  animation = new QuadScalarVertexData();
  level = new QuadScalarVertexData();
  overlayTextures = new QuadScalarVertexData();

  reset() {
    this.faceFlipped = false;
    this.textureIndex = 0;
  }
}

export class VoxelMesherDataTool extends MesherDataTool {
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
    super();
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

    this.startNewMesh(new VoxelMesh());
  }

  bounds: { min: Vec3Array; max: Vec3Array } = {
    min: [0, 0, 0],
    max: [0, 0, 0],
  };
  _indexStart = 0;

  startConstruction() {
    this._indexStart = this.mesh!.indices.length;
    this.bounds.min[0] = Infinity;
    this.bounds.min[1] = Infinity;
    this.bounds.min[2] = Infinity;
    this.bounds.max[0] = -Infinity;
    this.bounds.max[1] = -Infinity;
    this.bounds.max[2] = -Infinity;
  }

  endConstruction() {
    if (
      this.bounds.min.includes(Infinity) ||
      this.bounds.max.includes(-Infinity)
    )
      return false;
    if (this.bvhTool) {
      this.bvhTool.updateVoxel(
        this.position.x,
        this.position.y,
        this.position.z,
        this._indexStart,
        this.materialIndex,
        this.mesh!.indices.length,
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

  calculateFaceData(direction: VoxelFaces) {
    if (this.dataCalculated[direction]) return true;
    FaceDataCalc.calculate(direction, this);
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

  reset() {
    this.vars.reset();
  }
}
