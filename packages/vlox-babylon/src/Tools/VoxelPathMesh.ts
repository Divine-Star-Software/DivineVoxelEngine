import { Scene } from "@babylonjs/core/scene";
import { Mesh } from "@babylonjs/core/Meshes/mesh";
import { Effect } from "@babylonjs/core/Materials/effect";
import { ShaderMaterial } from "@babylonjs/core/Materials/shaderMaterial";
import { Color4 } from "@babylonjs/core/Maths/math.color";
import { VertexBuffer } from "@babylonjs/core/Buffers/buffer";
import { Geometry } from "@babylonjs/core/Meshes/geometry";
import { BoundingInfo } from "@babylonjs/core/Culling/boundingInfo";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import {
  VoxelPath,
  VoxelPathSegment,
} from "@divinevoxel/vlox/Templates/Path/VoxelPath";
Effect.ShadersStore["voxelPathVertexShader"] = /*glsl */ `#version 300 es
precision highp float;
in vec3 position;
uniform mat4 world;
uniform mat4 viewProjection;
void main(void) {
  vec4 p = vec4( position, 1.0 );
  gl_Position = viewProjection * world * p;
}
`;
Effect.ShadersStore["voxelPathFragmentShader"] = /*glsl */ `#version 300 es
precision highp float;
uniform vec4 color;
out vec4 FragColor;  
void main(void) {
  FragColor = color;
}
`;

export class VoxelPathSegmentMesh extends Mesh {
  positions: number[] = [];
  indices: number[] = [];

  private _dispose: () => void;
  _dirty = false;
  constructor(
    public pathMesh: VoxelPathMesh,
    public path: VoxelPath,
    public segment: VoxelPathSegment
  ) {
    super("", pathMesh.scene);
    this.material = pathMesh._material;
    this.alwaysSelectAsActiveMesh = true;
    this.renderingGroupId = 1;
    this.doNotSyncBoundingInfo = true;
    this.isPickable = false;
    this.checkCollisions = false;
    this.doNotSerialize = true;
    const geometry = new Geometry(
      Geometry.RandomId(),
      this.pathMesh.scene,
      undefined,
      true,
      this
    );
    geometry._boundingInfo = new BoundingInfo(Vector3.Zero(), Vector3.Zero());
    geometry.useBoundingInfoFromGeometry = true;
    this.update();

    this.renderingGroupId = 1;

    const update = () => {
      this.update();
    };
    this.segment.addEventListener("updated", update);
    this._dispose = () => {
      this.segment.removeEventListener("updated", update);
    };

    this.update();
  }

  update() {
    this._dirty = true;
    const thickness = 0.1;
    const start = [
      this.segment.start[0] + 0.5,
      this.segment.start[1] + 0.5,
      this.segment.start[2] + 0.5,
    ];
    const end = [
      this.segment.end[0] + 0.5,
      this.segment.end[1] + 0.5,
      this.segment.end[2] + 0.5,
    ];

    const { positions, indices } = this;

    const direction = Vector3.FromArray(end)
      .subtract(Vector3.FromArray(start))
      .normalize();
    const up = Vector3.Up();
    const right = Vector3.Cross(direction, up).normalize();

    // In case direction is colinear with Up, use a different up vector
    if (right.length() === 0) {
      const alternativeUp = new Vector3(1, 0, 0);
      right.copyFrom(Vector3.Cross(direction, alternativeUp).normalize());
    }

    const halfThickness = thickness / 2;
    const offsetRight = right.scale(halfThickness);
    const offsetUp = Vector3.Cross(direction, right)
      .normalize()
      .scale(halfThickness);

    const base = Vector3.FromArray(start);
    const tip = Vector3.FromArray(end);

    // Compute 8 corners of the box
    const corners = [
      base.subtract(offsetRight).subtract(offsetUp),
      base.add(offsetRight).subtract(offsetUp),
      base.add(offsetRight).add(offsetUp),
      base.subtract(offsetRight).add(offsetUp),
      tip.subtract(offsetRight).subtract(offsetUp),
      tip.add(offsetRight).subtract(offsetUp),
      tip.add(offsetRight).add(offsetUp),
      tip.subtract(offsetRight).add(offsetUp),
    ];

    const indexOffset = positions.length / 3;
    for (const corner of corners) {
      positions.push(corner.x, corner.y, corner.z);
    }

    const faceIndices = [
      [0, 1, 2, 3], // base
      [4, 5, 6, 7], // top
      [0, 1, 5, 4], // side
      [2, 3, 7, 6], // side
      [1, 2, 6, 5], // side
      [3, 0, 4, 7], // side
    ];

    for (const face of faceIndices) {
      indices.push(
        indexOffset + face[0],
        indexOffset + face[1],
        indexOffset + face[2],
        indexOffset + face[0],
        indexOffset + face[2],
        indexOffset + face[3]
      );
    }
  }

  build() {
    if (!this._dirty) return;
    this._dirty = false;
    this.setVerticesData(VertexBuffer.PositionKind, this.positions);
    this.setIndices(this.indices);
    this.positions = [];
    this.indices = [];
  }
  clear() {
    for (const bufferKind in this.getVerticesDataKinds()) {
      this.removeVerticesData(bufferKind);
    }
  }

  dispose() {
    super.dispose();
    this._dispose();
  }
}

export class VoxelPathMesh {
  static Materials = new Map<Scene, ShaderMaterial>();

  _material: ShaderMaterial;
  color = new Color4();
  path: VoxelPath;
  segments: VoxelPathSegmentMesh[] = [];

  constructor(
    public scene: Scene,
    public name = ""
  ) {
    if (!VoxelPathMesh.Materials.has(scene)) {
      const newMat = new ShaderMaterial("", scene, "voxelPath", {
        uniforms: ["color", "world", "viewProjection"],
        attributes: ["position"],
        needAlphaBlending: true,
      });
      newMat.backFaceCulling = false;
      newMat.forceDepthWrite = true;
      VoxelPathMesh.Materials.set(scene, newMat);
    }
    this._material = VoxelPathMesh.Materials.get(scene)!.clone(
      `Voxel Line Mesh ${name}`
    );
    this.setColor(1, 1, 1, 0.8);
  }

  setColor(r: number, g: number, b: number, a: number = this.color.a) {
    this.color.set(r, g, b, a);
    this._material.setColor4("color", this.color);
  }

  setPath(path: VoxelPath) {
    this.path = path;
    for (let i = 0; i < path.segments.length; i++) {
      this.segments.push(
        new VoxelPathSegmentMesh(this, path, path.segments[i])
      );
    }
    const segmentAdded = this.path.createEventListener(
      "segmentAdded",
      ({ detail: segment }) => {
        this.segments.push(new VoxelPathSegmentMesh(this, path, segment));
      }
    );
    this.path.addEventListener("segmentAdded", segmentAdded);
    const segmentRemoved = this.path.createEventListener(
      "segmentRemoved",
      ({ detail: segment }) => {
        for (let i = 0; i < this.segments.length; i++) {
          if (this.segments[i].segment == segment) {
            this.segments[i].dispose();
            this.segments.splice(i, 1);
          }
        }
      }
    );
    this.path.addEventListener("segmentRemoved", segmentRemoved);
  }

  build() {
    for (const segment of this.segments) {
      segment.build();
    }
  }

  dispose() {
    this.clear();
    this._material.dispose();
  }

  clear() {
    for (const segment of this.segments) {
      segment.dispose();
    }
    this.segments = [];
  }
}
