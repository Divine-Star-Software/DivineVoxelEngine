import { Flat3DIndex, Vector3Like } from "@amodx/math";
import { PaintVoxelData, RawVoxelData } from "../../Voxels";
import {
  IVoxelShapeTemplate,
  IVoxelShapeTemplateData,
  VoxelShapeTemplateFillModes,
  IVoxelShapeTemplateEvents,
} from "./VoxelShapeTemplate.types";
import { TypedEventTarget } from "../../Util/TypedEventTarget";
import { BoundingBox } from "@amodx/math/Geomtry/Bounds/BoundingBox";

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
    return {
      type,
      bounds: data.bounds || { x: 1, y: 1, z: 1 },
      position: Vector3Like.Create(),
      fillMode: "full",
      fillVoxel: PaintVoxelData.Create(),
      faceVoxel: PaintVoxelData.Create(),
      edgeVoxel: PaintVoxelData.Create(),
      pointVoxel: PaintVoxelData.Create(),
      ...data,
    };
  }
  position = Vector3Like.Create();
  index = Flat3DIndex.GetXZYOrder();
  bounds: BoundingBox;
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
    this.bounds = new BoundingBox();
    this.bounds.setMinPositionAndSize(data.position, data.bounds);
    this.index.setBounds(data.bounds.x, data.bounds.y, data.bounds.z);
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

  setPosition(x: number, y: number, z: number): void {
    this.position.x = x;
    this.position.y = y;
    this.position.z = z;
  }

  abstract isIncluded(index: number): boolean;

  isAir(index: number) {
    if (!this.isIncluded(index)) return true;
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

  protected _updateBounds() {
    this.bounds.setSize(this.bounds.size);
    this.index.setBounds(
      this.bounds.size.x,
      this.bounds.size.y,
      this.bounds.size.z
    );
  }

  abstract toJSON(): Data;

  protected getBaseJSON(): IVoxelShapeTemplateData<any> {
    return {
      type: this.type,
      position: this.position,
      bounds: this.bounds.size,
      fillMode: this.fillMode,
      fillVoxel: this.fillVoxel,
      faceVoxel: this.faceVoxel,
      edgeVoxel: this.edgeVoxel,
      pointVoxel: this.pointVoxel,
    };
  }
}
