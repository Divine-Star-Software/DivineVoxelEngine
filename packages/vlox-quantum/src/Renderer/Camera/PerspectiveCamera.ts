import { Vector3 } from "../Math";
import { Scene } from "../../Renderer/Scene/Scene";
import { mat4, vec3 } from "../Math/wgpu-matrix";
import { Vector3Like } from "@amodx/math";
import { CameraStruct } from "./CameraStruct";

export class PerspectiveCamera {
  struct: CameraStruct;

  _cameraDataUniformBuffer: GPUBuffer;

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
    this.struct = new CameraStruct();
    this._cameraDataUniformBuffer = this.scene.engine.device.createBuffer({
      size: this.struct._buffer.byteLength,
      usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
      mappedAtCreation: false,
    });
    this.struct.fov = fov;
    this.struct.aspectRatio = aspectRatio;

    this.struct.near = near;
    this.struct.far = far;

    this._updatePerspectiveMatrix();
    this._updateViewMatrix();
    this._updateViewProjection();
    this._updateVectors();
  }
  _updateVectors() {
    Vector3Like.Copy(this.struct.position, this.position);
    Vector3Like.SubtractToRef(this.target, this.position, this.struct.forward);
    Vector3Like.NormalizeInPlace(this.struct.forward);

    Vector3Like.CrossToRef(
      this.worldUp,
      this.struct.forward,
      this.struct.right
    );
    Vector3Like.NormalizeInPlace(this.struct.right);

    Vector3Like.CrossToRef(
      this.struct.forward,
      this.struct.right,
      this.struct.up
    );
    Vector3Like.NormalizeInPlace(this.struct.up);
  }
  _updateUniform() {
    this.scene.engine.device.queue.writeBuffer(
      this!._cameraDataUniformBuffer,
      0,
      this!.struct._buffer
    );
  }

  _updateViewProjection() {
    mat4.multiply(
      this.struct.projectionMatrix,
      this.struct.viewMatrix,
      this.struct.viewProjectionMatrix
    );

    mat4.inverse(
      this.struct.viewProjectionMatrix,
      this.struct.inverseViewProjectionMatrix
    );

    this._updateUniform();
  }

  _update() {
    let updated = false;
    if (
      this.position._isDirty ||
      this.target._isDirty ||
      this.worldUp._isDirty
    ) {
      this._updateViewMatrix();
      this.position._isDirty = false;
      this.target._isDirty = false;
      this.worldUp._isDirty = false;
      updated = true;
      this._updateVectors();
    }
    if (this.struct._perspectiveNeedUpdate) {
      this._updatePerspectiveMatrix();
      this.struct._perspectiveNeedUpdate = false;
      updated = true;
    }
    if (updated) {
      this._updateViewProjection();
    }
  }

  _updatePerspectiveMatrix(): void {
    console.log("update perspective matrix",this.struct.aspectRatio)
    mat4.perspective(
      this.struct.fov * (Math.PI / 180),
      this.struct.aspectRatio,
      this.struct.near,
      this.struct.far,
      this.struct.projectionMatrix
    );
  }

  _updateViewMatrix(): void {
    mat4.lookAt(
      this.position._vector,
      this.target._vector,
      this.worldUp._vector,
      this.struct.viewMatrix
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
    this.struct.fov = fov;
    this.struct.aspectRatio = aspectRatio;
    this.struct.near = near;
    this.struct.far = far;

    this._updatePerspectiveMatrix();
    this._updateViewMatrix();
  }
}
