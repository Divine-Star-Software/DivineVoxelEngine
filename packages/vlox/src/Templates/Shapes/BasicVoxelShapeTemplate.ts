import { Flat3DIndex, Vec3Array } from "@amodx/math";
import { PaintVoxelData, RawVoxelData } from "../../Voxels";
import {
  IVoxelShapeTemplate,
  IVoxelShapeTemplateData,
  VoxelShapeTemplateFillModes,
  IVoxelShapeTemplateEvents,
} from "./VoxelShapeTemplate.types";
import { TypedEventTarget } from "../../Util/TypedEventTarget";

export abstract class BasicVoxelShapeTemplate<
    Type extends string,
    Data extends IVoxelShapeTemplateData<any>,
    Events extends IVoxelShapeTemplateEvents = IVoxelShapeTemplateEvents,
  >
  extends TypedEventTarget<Events>
  implements IVoxelShapeTemplate<Type, Data, Events>
{
  static CreateBaseData<Type extends string>(
    type: Type,
    data: Partial<IVoxelShapeTemplateData<Type>>
  ): IVoxelShapeTemplateData<Type> {
    const size = data.bounds || [1, 1, 1];
    return {
      type,
      bounds: size,
      fillMode: "full",
      fillVoxel: PaintVoxelData.Create(),
      faceVoxel: PaintVoxelData.Create(),
      edgeVoxel: PaintVoxelData.Create(),
      pointVoxel: PaintVoxelData.Create(),
      ...data,
    };
  }
  index = Flat3DIndex.GetXZYOrder();
  bounds: Vec3Array;
  type = "";
  fillMode: VoxelShapeTemplateFillModes;
  fillVoxel: PaintVoxelData;
  faceVoxel: PaintVoxelData;
  edgeVoxel: PaintVoxelData;
  pointVoxel: PaintVoxelData;
  _fillVoxel: RawVoxelData;
  _faceVoxel: RawVoxelData;
  _edgeVoxel: RawVoxelData;
  _pointVoxel: RawVoxelData;
  constructor(data: Data) {
    super();
    this.type = data.type;
    this.fillMode = data.fillMode;
    this.bounds = [...data.bounds];
    this.index.setBounds(...data.bounds);
    this.setVoxels(
      data.fillVoxel,
      data.faceVoxel,
      data.edgeVoxel,
      data.pointVoxel
    );
  }
  setVoxels(
    fill: PaintVoxelData,
    face?: PaintVoxelData,
    edge?: PaintVoxelData,
    point?: PaintVoxelData
  ): void {
    this.fillVoxel = fill;
    this.faceVoxel = face || fill;
    this.edgeVoxel = edge || fill;
    this.pointVoxel = point || fill;
    this._fillVoxel = PaintVoxelData.ToRaw(this.fillVoxel);
    this._faceVoxel = PaintVoxelData.ToRaw(this.faceVoxel);
    this._edgeVoxel = PaintVoxelData.ToRaw(this.edgeVoxel);
    this._pointVoxel = PaintVoxelData.ToRaw(this.pointVoxel);
  }
  getIndex(x: number, y: number, z: number): number {
    return this.index.getIndexXYZ(x, y, z);
  }
  abstract isIncluded(index: number): boolean;
  isAir(index: number) {
    if(!this.isIncluded(index)) return true;
    return this.getId(index) === 0;
  }
  getId(index: number): number {
    if (!this.isIncluded(index)) return 0;
    const id = this._fillVoxel[0];
    if (this.fillMode == "full") return id;
    return id;
  }
  getLight(index: number): number {
    if (!this.isIncluded(index)) return 0;

    const light = this._fillVoxel[1];
    if (this.fillMode == "full") return light;
    return light;
  }
  getLevel(index: number): number {
    if (!this.isIncluded(index)) return 0;

    const level = this._fillVoxel[2];
    if (this.fillMode == "full") return level;
    return level;
  }
  getSecondary(index: number): number {
    if (!this.isIncluded(index)) return 0;

    const secondary = this._fillVoxel[3];
    if (this.fillMode == "full") return secondary;
    return secondary;
  }

  getRaw(index: number, rawRef: RawVoxelData = [0, 0, 0, 0]): RawVoxelData {
    if (!this.isIncluded(index)) {
      rawRef[0] = 0;
      rawRef[1] = 0;
      rawRef[2] = 0;
      rawRef[3] = 0;
      return rawRef;
    }
    rawRef[0] = this.getId(index);
    rawRef[1] = this.getLight(index);
    rawRef[2] = this.getLevel(index);
    rawRef[3] = this.getSecondary(index);
    return rawRef;
  }
  abstract toJSON(): Data;

  getBaseJSON(): IVoxelShapeTemplateData<any> {
    return {
      type: this.type,
      bounds: this.bounds,
      fillMode: this.fillMode,
      fillVoxel: this.fillVoxel,
      faceVoxel: this.faceVoxel,
      edgeVoxel: this.edgeVoxel,
      pointVoxel: this.pointVoxel,
    };
  }
}
