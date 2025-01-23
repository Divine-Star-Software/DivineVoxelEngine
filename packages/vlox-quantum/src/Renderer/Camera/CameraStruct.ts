import { Vector3, Vector4 } from "../Math";

/**

struct CameraData {
   projection: mat4x4f,
    view: mat4x4f,
    viewProjection: mat4x4f,
    inverseViewProjection: mat4x4f,
  //x -> FOV in radians, y -> near, z -> far, w -> aspect
    settings: vec4f,
    position: vec3f,
    forward: vec3f,
    right: vec3f,
    up: vec3f
};
  
 */
export class CameraStruct {
  static StructFloatSize = 84;
  static StuctByteSize = this.StructFloatSize * 4;
  static ProjectionMatrixOffset = 0;
  static ViewMatrixOffset = 16;
  static ViewProjectionMatrixOffset = 32;
  static InverseViewProjectionOffset = 48;
  static SettingsOffset = 64;
  static PositionOffset = 68;
  static ForwardOffset = 72;
  static RightOFfset = 76;
  static UpOffset = 80;
  _perspectiveNeedUpdate = false;

  _buffer: Float32Array;

  viewMatrix: Float32Array;
  projectionMatrix: Float32Array;
  viewProjectionMatrix: Float32Array;
  inverseViewProjectionMatrix: Float32Array;
  settings = new Vector4();
  position = new Vector3();
  forward = new Vector3();
  right = new Vector3();
  up = new Vector3();

  get fov() {
    return this.settings.x;
  }

  set fov(value: number) {
    if (value != this.fov) this._perspectiveNeedUpdate = true;
    this.settings.x = value;
  }

  get near() {
    return this.settings.y;
  }
  set near(value: number) {
    if (value != this.near) this._perspectiveNeedUpdate = true;
    this.settings.y = value;
  }

  get far() {
    return this.settings.z;
  }
  set far(value: number) {
    if (value != this.far) this._perspectiveNeedUpdate = true;
    this.settings.z = value;
  }

  get aspectRatio() {
    return this.settings.w;
  }
  set aspectRatio(value: number) {
    if (value != this.aspectRatio) this._perspectiveNeedUpdate = true;
    this.settings.w = value;
  }
  constructor() {
    this._buffer = new Float32Array(CameraStruct.StructFloatSize);
    this.viewMatrix = new Float32Array(
      this._buffer.buffer,
      CameraStruct.ViewMatrixOffset * 4,
      16
    );
    this.projectionMatrix = new Float32Array(
      this._buffer.buffer,
      CameraStruct.ProjectionMatrixOffset * 4,
      16
    );
    this.viewProjectionMatrix = new Float32Array(
      this._buffer.buffer,
      CameraStruct.ViewProjectionMatrixOffset * 4,
      16
    );
    this.inverseViewProjectionMatrix = new Float32Array(
      this._buffer.buffer,
      CameraStruct.InverseViewProjectionOffset * 4,
      16
    );
    this.settings._vector = new Float32Array(
      this._buffer.buffer,
      CameraStruct.SettingsOffset * 4,
      4
    );
    this.position._vector = new Float32Array(
      this._buffer.buffer,
      CameraStruct.PositionOffset * 4,
      3
    );
    this.forward._vector = new Float32Array(
      this._buffer.buffer,
      CameraStruct.ForwardOffset * 4,
      3
    );
    this.right._vector = new Float32Array(
      this._buffer.buffer,
      CameraStruct.RightOFfset * 4,
      3
    );
    this.up._vector = new Float32Array(
      this._buffer.buffer,
      CameraStruct.UpOffset * 4,
      3
    );
  }
}
