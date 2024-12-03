import { Vector3 } from "../Math";
import { Scene } from "../../Renderer/Scene/Scene";
import { mat4, vec3 } from "../Math/wgpu-matrix";
import { Vector3Like } from "@amodx/math";

export class PerspectiveCamera {
  projectionMatrix = new Float32Array(16);
  viewMatrix = new Float32Array(16);
  viewProjectionMatrix = new Float32Array(16);

  private _perspectiveNeedUpdate = false;

  private _fov = 50;
  get fov() {
    return this._fov;
  }
  set fov(value: number) {
    if (value != this._fov) this._perspectiveNeedUpdate = true;
    this._fov = value;
  }

  private _near = 0.1;
  get near() {
    return this._near;
  }
  set near(value: number) {
    if (value != this._near) this._perspectiveNeedUpdate = true;
    this._near = value;
  }

  private _far = 500;
  get far() {
    return this._far;
  }
  set far(value: number) {
    if (value != this._far) this._perspectiveNeedUpdate = true;
    this._far = value;
  }

  private _aspectRatio = 1;
  get aspectRatio() {
    return this._aspectRatio;
  }
  set aspectRatio(value: number) {
    if (value != this._aspectRatio) this._perspectiveNeedUpdate = true;
    this._aspectRatio = value;
  }

  _cameraDataUniformBuffer: GPUBuffer;
  cameraDataUniform = new Float32Array(
    new ArrayBuffer(
      Math.ceil(((16 + 16 + 16 + 4 + 4 + 4 + 4 + 4) * 4) / 16) * 16
    )
  );

  _forward = new Vector3();
  _right = new Vector3();
  _up = new Vector3();

  constructor(
    public scene: Scene, 
    fov: number = 50,
    aspectRatio: number = 16 / 9,
    near: number = 0.1,
    far: number = 500,
    public position: Vector3 = new Vector3(-24, 17.5, 31),
    public target: Vector3 = new Vector3(0, 0, 0),
    public worldUp: Vector3 = new Vector3(0, 1, 0)
  ) {
    this._cameraDataUniformBuffer = this.scene.engine.device.createBuffer({
      size: this.cameraDataUniform.byteLength,
      usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
      mappedAtCreation: false,
    });
    this._fov = fov;
    this._aspectRatio = aspectRatio;

    this._near = near;
    this._far = far;

    this._updatePerspectiveMatrix();
    this._updateViewMatrix();
    this._updateViewProjection();
    this._updateVectors();
  }
  _updateVectors() {
    Vector3Like.SubtractToRef(this.target, this.position, this._forward);
    Vector3Like.NormalizeInPlace(this._forward);

    Vector3Like.CrossToRef(this.worldUp, this._forward, this._right);
    Vector3Like.NormalizeInPlace(this._right);


    Vector3Like.CrossToRef(this._forward, this._right, this._up);
    Vector3Like.NormalizeInPlace(this._up);

  }
  _updateUniform() {
    this.cameraDataUniform.set(this!.projectionMatrix);
    this!.cameraDataUniform.set(this!.viewMatrix, 16);
    this!.cameraDataUniform.set(this!.viewProjectionMatrix, 32);
    this!.cameraDataUniform[48] = this!.fov * (Math.PI / 180);
    this!.cameraDataUniform[49] = this!.aspectRatio;
    this!.cameraDataUniform[50] = 0;
    this!.cameraDataUniform[51] = 0;
    this!.cameraDataUniform[52] = this!.position.x;
    this!.cameraDataUniform[53] = this!.position.y;
    this!.cameraDataUniform[54] = this!.position.z;
    //55
    this!.cameraDataUniform[56] = this!._forward.x;
    this!.cameraDataUniform[57] = this!._forward.y;
    this!.cameraDataUniform[58] = this!._forward.z;
    //59
    this!.cameraDataUniform[60] = this!._right.x;
    this!.cameraDataUniform[61] = this!._right.y;
    this!.cameraDataUniform[62] = this!._right.z;
    //63
    this!.cameraDataUniform[64] = this!._up.x;
    this!.cameraDataUniform[65] = this!._up.y;
    this!.cameraDataUniform[66] = this!._up.z;

    this.scene.engine.device.queue.writeBuffer(
      this!._cameraDataUniformBuffer,
      0,
      this!.cameraDataUniform
    );
  }
  _updateViewProjection() {
    mat4.multiply(
      this.projectionMatrix,
      this.viewMatrix,
      this.viewProjectionMatrix
    );
    this._updateUniform();
    //   mat4.transpose(this.viewProjectionMatrix, this.viewProjectionMatrix);
  }

  _update() {
    let updated = false;
    if (this.position._isDirty || this.target._isDirty || this.worldUp._isDirty) {
      this._updateViewMatrix();
      this.position._isDirty = false;
      this.target._isDirty = false;
      this.worldUp._isDirty = false;
      updated = true;
      this._updateVectors();
    }
    if (this._perspectiveNeedUpdate) {
      this._updatePerspectiveMatrix();
      this._perspectiveNeedUpdate = false;
      updated = true;
    }
    if (updated) {
      this._updateViewProjection();
    }
  }

  _updatePerspectiveMatrix(): void {
    mat4.perspective(
      this.fov * (Math.PI / 180),
      this.aspectRatio,
      this.near,
      this.far,
      this.projectionMatrix
    );
  }

  _updateViewMatrix(): void {
    mat4.lookAt(
      this.position._vector,
      this.target._vector,
      this.worldUp._vector,
      this.viewMatrix
    );
  }

  setPosition(position: Vector3): void {
    this.position = position;
    this._updateViewMatrix();
  }

  setTarget(target: Vector3): void {
    this.target = target;
    this._updateViewMatrix();
  }

  setUp(up: Vector3): void {
    this.worldUp = up;
    this._updateViewMatrix();
  }

  reset(fov: number, aspectRatio: number, near: number, far: number): void {
    this.fov = fov;
    this.aspectRatio = aspectRatio;
    this.near = near;
    this.far = far;

    this._updatePerspectiveMatrix();
    this._updateViewMatrix();
  }
}
