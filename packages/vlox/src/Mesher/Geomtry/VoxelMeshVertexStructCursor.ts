export const VoxelMeshVertexConstants = {
  VertexFloatSize: 24,
  VertexByteSize: 24 * 4,
  PositionOffset: 0,
  NormalOffset: 4,
  TextureIndexOffset: 8,
  UVOffset: 12,
  ColorOffset: 14,
  VoxelDataOFfset: 18,
};
export class VoxelMeshVertexStructCursor {
  static VertexFloatSize = 24;
  static VertexByteSize = this.VertexFloatSize * 4;
  static PositionOffset = 0;
  static NormalOffset = 4;
  static TextureIndexOffset = 8;
  static UVOffset = 12;
  static ColorOffset = 14;
  static VoxelDataOFfset = 18;

  // position
  get positionX() {
    return this.data[
      this.trueIndex + VoxelMeshVertexStructCursor.PositionOffset
    ];
  }
  set positionX(value: number) {
    this.data[this.trueIndex + VoxelMeshVertexStructCursor.PositionOffset] =
      value;
  }

  get positionY() {
    return this.data[
      this.trueIndex + VoxelMeshVertexStructCursor.PositionOffset + 1
    ];
  }
  set positionY(value: number) {
    this.data[this.trueIndex + VoxelMeshVertexStructCursor.PositionOffset + 1] =
      value;
  }

  get positionZ() {
    return this.data[
      this.trueIndex + VoxelMeshVertexStructCursor.PositionOffset + 2
    ];
  }
  set positionZ(value: number) {
    this.data[this.trueIndex + VoxelMeshVertexStructCursor.PositionOffset + 2] =
      value;
  }

  // normal
  get normalX() {
    return this.data[this.trueIndex + VoxelMeshVertexStructCursor.NormalOffset];
  }
  set normalX(value: number) {
    this.data[this.trueIndex + VoxelMeshVertexStructCursor.NormalOffset] =
      value;
  }

  get normalY() {
    return this.data[
      this.trueIndex + VoxelMeshVertexStructCursor.NormalOffset + 1
    ];
  }
  set normalY(value: number) {
    this.data[this.trueIndex + VoxelMeshVertexStructCursor.NormalOffset + 1] =
      value;
  }

  get normalZ() {
    return this.data[
      this.trueIndex + VoxelMeshVertexStructCursor.NormalOffset + 2
    ];
  }
  set normalZ(value: number) {
    this.data[this.trueIndex + VoxelMeshVertexStructCursor.NormalOffset + 2] =
      value;
  }

  // voxel data
  get voxelDataX() {
    return this.data[
      this.trueIndex + VoxelMeshVertexStructCursor.VoxelDataOFfset
    ];
  }
  set voxelDataX(value: number) {
    this.data[this.trueIndex + VoxelMeshVertexStructCursor.VoxelDataOFfset] =
      value;
  }

  get voxelDataY() {
    return this.data[
      this.trueIndex + VoxelMeshVertexStructCursor.VoxelDataOFfset + 1
    ];
  }
  set voxelDataY(value: number) {
    this.data[
      this.trueIndex + VoxelMeshVertexStructCursor.VoxelDataOFfset + 1
    ] = value;
  }

  get voxelDataZ() {
    return this.data[
      this.trueIndex + VoxelMeshVertexStructCursor.VoxelDataOFfset + 2
    ];
  }
  set voxelDataZ(value: number) {
    this.data[
      this.trueIndex + VoxelMeshVertexStructCursor.VoxelDataOFfset + 2
    ] = value;
  }

  get voxelDataW() {
    return this.data[
      this.trueIndex + VoxelMeshVertexStructCursor.VoxelDataOFfset + 3
    ];
  }
  set voxelDataW(value: number) {
    this.data[
      this.trueIndex + VoxelMeshVertexStructCursor.VoxelDataOFfset + 3
    ] = value;
  }

  // texture index
  get textureIndexX() {
    return this.data[
      this.trueIndex + VoxelMeshVertexStructCursor.TextureIndexOffset
    ];
  }
  set textureIndexX(value: number) {
    this.data[this.trueIndex + VoxelMeshVertexStructCursor.TextureIndexOffset] =
      value;
  }

  get textureIndexY() {
    return this.data[
      this.trueIndex + VoxelMeshVertexStructCursor.TextureIndexOffset + 1
    ];
  }
  set textureIndexY(value: number) {
    this.data[
      this.trueIndex + VoxelMeshVertexStructCursor.TextureIndexOffset + 1
    ] = value;
  }

  get textureIndexZ() {
    return this.data[
      this.trueIndex + VoxelMeshVertexStructCursor.TextureIndexOffset + 2
    ];
  }
  set textureIndexZ(value: number) {
    this.data[
      this.trueIndex + VoxelMeshVertexStructCursor.TextureIndexOffset + 2
    ] = value;
  }

  // uv
  get uvX() {
    return this.data[this.trueIndex + VoxelMeshVertexStructCursor.UVOffset];
  }
  set uvX(value: number) {
    this.data[this.trueIndex + VoxelMeshVertexStructCursor.UVOffset] = value;
  }

  get uvY() {
    return this.data[this.trueIndex + VoxelMeshVertexStructCursor.UVOffset + 1];
  }
  set uvY(value: number) {
    this.data[this.trueIndex + VoxelMeshVertexStructCursor.UVOffset + 1] =
      value;
  }

  // color
  get colorR() {
    return this.data[this.trueIndex + VoxelMeshVertexStructCursor.ColorOffset];
  }
  set colorR(value: number) {
    this.data[this.trueIndex + VoxelMeshVertexStructCursor.ColorOffset] = value;
  }

  get colorG() {
    return this.data[
      this.trueIndex + VoxelMeshVertexStructCursor.ColorOffset + 1
    ];
  }
  set colorG(value: number) {
    this.data[this.trueIndex + VoxelMeshVertexStructCursor.ColorOffset + 1] =
      value;
  }

  get colorB() {
    return this.data[
      this.trueIndex + VoxelMeshVertexStructCursor.ColorOffset + 2
    ];
  }
  set colorB(value: number) {
    this.data[this.trueIndex + VoxelMeshVertexStructCursor.ColorOffset + 2] =
      value;
  }

  trueIndex = 0;
  _index = 0;
  data: { [index: number]: number };
  get index() {
    return this._index;
  }
  set index(index: number) {
    this._index = index;
    this.trueIndex = index * VoxelMeshVertexStructCursor.VertexFloatSize;
  }

  constructor(data?: Float32Array) {
    if (data) this.data = data;
  }

  toJSON() {
    return {
      position: [this.positionX, this.positionY, this.positionZ],
      normal: [this.normalX, this.normalY, this.normalZ],
      voxelData: [
        this.voxelDataX,
        this.voxelDataY,
        this.voxelDataZ,
        this.voxelDataW,
      ],
      textureIndex: [
        this.textureIndexX,
        this.textureIndexY,
        this.textureIndexZ,
      ],
      uv: [this.uvX, this.uvY],
      color: [this.colorR, this.colorG, this.colorB],
    };
  }
}
