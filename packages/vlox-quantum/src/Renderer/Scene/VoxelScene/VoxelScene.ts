import { PerspectiveCamera } from "Renderer/Camera/PerspectiveCamera";
import { Scene } from "../Scene";
import { VoxelMesh } from "./Meshes/VoxelMesh";
import { VoxelSceneMeshes } from "./Meshes/VoxelSceneMeshes";
import { VoxelMeshRenderPipeline } from "./Pipelines/VoxelMeshRenderPipeline";
import { VoxelRayComputePipeline } from "./Pipelines/VoxelRayComputePipeline";
import { VoxelFinalPipeLine } from "./Pipelines/VoxelFinalPipeline";
import { Vector3 } from "../../../Renderer/Math";

export class VoxelScene {
  meshes: VoxelSceneMeshes;
  computePipeline: VoxelRayComputePipeline;
  renderPipeline: VoxelMeshRenderPipeline;
  finalPipeline: VoxelFinalPipeLine;

  _sceneProps = new Float32Array(
    new ArrayBuffer(Math.ceil(((4 + 4 + 4 + 4 + 4) * 4) / 16) * 16)
  );
  _scenePropsBuffer: GPUBuffer;

  sunPosition = new Vector3();

  private _isReady = false;

  constructor(
    public scene: Scene,
    public renderRadius: number
  ) {}

  async init() {
    this.meshes = new VoxelSceneMeshes(this, this.renderRadius);
    await this.meshes.init();
    this.computePipeline = new VoxelRayComputePipeline(this);
    await this.computePipeline.init();

    this.renderPipeline = new VoxelMeshRenderPipeline(this);
    await this.renderPipeline.init();
    this.finalPipeline = new VoxelFinalPipeLine(this);
    await this.finalPipeline.init();

    this.sunPosition._vector = new Float32Array(this._sceneProps.buffer, 16 * 4, 3);
    this.sunPosition.x = -10;
    this.sunPosition.y = 100;
    this.sunPosition.z = -20;
    
    this._isReady = true;

    this._scenePropsBuffer = this.scene.engine.device.createBuffer({
      size: this._sceneProps.byteLength,
      mappedAtCreation: false,
      usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    });
  }
  _drawn = false;

  setCamera(camera: PerspectiveCamera) {
    if (this.renderPipeline) this.renderPipeline.setCamera(camera);
    this.computePipeline.setCamera(camera);
    if (this.finalPipeline) this.finalPipeline.setCamera(camera);
    const bounds = this.scene.engine.canvas.getBoundingClientRect();

    const width = bounds.width;
    const height = bounds.height;
    this.scene.engine.canvas.width = width;
    this.scene.engine.canvas.height = height;

    const canvasTexture = this.scene.engine.context.getCurrentTexture();
    this.computePipeline.createTexture(
      canvasTexture.width,
      canvasTexture.height
    );
    if (this.renderPipeline)
      this.renderPipeline.createTexture(
        canvasTexture.width,
        canvasTexture.height
      );
    if (this.finalPipeline)
      this.finalPipeline.setTextures(
        this.renderPipeline._outputTexture,
        this.computePipeline._outputTexture
      );
    this._sceneProps[0] = canvasTexture.width;
    this._sceneProps[1] = canvasTexture.height;
    this._updateSceneProps();
  }

  _updateSceneProps() {
    this.scene.engine.device.queue.writeBuffer(
      this._scenePropsBuffer,
      0,
      this._sceneProps
    );
  }

  render() {
    this.scene.activeCamera!._updateUniform();
    if (this.sunPosition._isDirty) {
      this.sunPosition._isDirty = false;
      this._updateSceneProps();
    }
    if (this.meshes._meshes) {
      this.computePipeline.render();
      this.renderPipeline.render();
      this.finalPipeline.render();
    }
  }
}
