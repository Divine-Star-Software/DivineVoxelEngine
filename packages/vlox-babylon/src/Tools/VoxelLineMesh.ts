import { Vec3Array } from "@amodx/math";
import { Scene } from "@babylonjs/core/scene";
import { Mesh } from "@babylonjs/core/Meshes/mesh";
import { Effect } from "@babylonjs/core/Materials/effect";
import { ShaderMaterial } from "@babylonjs/core/Materials/shaderMaterial";
import { Color4 } from "@babylonjs/core/Maths/math.color";
import { VertexBuffer } from "@babylonjs/core/Buffers/buffer";
import { Geometry } from "@babylonjs/core/Meshes/geometry";
import { BoundingInfo } from "@babylonjs/core/Culling/boundingInfo";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";

const perpendicular: Vec3Array = [0, 0, 0];
Effect.ShadersStore["voxelMeshVertexShader"] = /*glsl */ `#version 300 es
precision highp float;
in vec3 position;
uniform mat4 world;
uniform mat4 viewProjection;
#ifdef INSTANCES
  //matricies
  in vec4 world0;
  in vec4 world1;
  in vec4 world2;
  in vec4 world3;
  //custom attributes
#endif

void main(void) {
  #ifdef INSTANCES
  mat4 finalWorld = mat4(world0, world1, world2, world3);
  vec4 p = vec4( position, 1.0 );
  gl_Position = viewProjection * finalWorld * p;
  #endif
  #ifndef INSTANCES
  vec4 p = vec4( position, 1.0 );
  gl_Position = viewProjection * world * p;
  #endif

}
`;
Effect.ShadersStore["voxelMeshFragmentShader"] = /*glsl */ `#version 300 es
precision highp float;
uniform vec4 color;
out vec4 FragColor;  
void main(void) {
  FragColor = color;
}
`;
export class VoxelLineMesh extends Mesh {
  static Materials = new Map<Scene, ShaderMaterial>();
  positions: number[] = [];
  indices: number[] = [];
  _material: ShaderMaterial;
  color = new Color4();
  constructor(
    public scene: Scene,
    public name = ""
  ) {
    super(name, scene);
    this.alwaysSelectAsActiveMesh = true;
    this.renderingGroupId = 1;
    this.doNotSyncBoundingInfo = true;
    this.isPickable = false;
    this.checkCollisions = false;
    this.doNotSerialize = true;
    const geometry = new Geometry(
      Geometry.RandomId(),
      scene,
      undefined,
      true,
      this
    );
    geometry._boundingInfo = new BoundingInfo(Vector3.Zero(), Vector3.Zero());
    geometry.useBoundingInfoFromGeometry = true;

    if (!VoxelLineMesh.Materials.has(scene)) {
      const newMat = new ShaderMaterial("", scene, "voxelMesh", {
        uniforms: ["color", "world", "viewProjection"],
        attributes: ["position"],
        needAlphaBlending: true,
      });
      newMat.backFaceCulling = false;
      newMat.forceDepthWrite = true;
      VoxelLineMesh.Materials.set(scene, newMat);
    }
    this._material = VoxelLineMesh.Materials.get(scene)!.clone(
      `Voxel Line Mesh ${name}`
    );
    this.setColor(1, 1, 1, 0.8);
    this.material = this._material;
  }

  build() {
    this.setVerticesData(VertexBuffer.PositionKind, this.positions);
    this.setIndices(this.indices);
    this.positions = [];
    this.indices = [];
  }

  setColor(r: number, g: number, b: number, a: number = this.color.a) {
    this.color.set(r, g, b, a);
    this._material.setColor4("color", this.color);
  }

  addLineSegment(
    start: Vec3Array,
    end: Vec3Array,
    normal: Vec3Array,
    thickness: number
  ) {
    const { positions, indices } = this;
    const dx = end[0] - start[0];
    const dy = end[1] - start[1];
    const dz = end[2] - start[2];

    perpendicular[0] = normal[1] * dz - normal[2] * dy;
    perpendicular[1] = normal[2] * dx - normal[0] * dz;
    perpendicular[2] = normal[0] * dy - normal[1] * dx;

    let norm = Math.sqrt(
      perpendicular[0] * perpendicular[0] +
        perpendicular[1] * perpendicular[1] +
        perpendicular[2] * perpendicular[2]
    );
    if (norm === 0) return;

    perpendicular[0] = perpendicular[0] / norm;
    perpendicular[1] = perpendicular[1] / norm;
    perpendicular[2] = perpendicular[2] / norm;

    const tx = perpendicular[0] * thickness;
    const ty = perpendicular[1] * thickness;
    const tz = perpendicular[2] * thickness;

    const indexOffset = positions.length / 3;
    positions.push(
      //v0
      start[0] + tx,
      start[1] + ty,
      start[2] + tz,
      //v1
      start[0],
      start[1],
      start[2],
      //v2
      end[0] + tx,
      end[1] + ty,
      end[2] + tz,
      //v3
      end[0],
      end[1],
      end[2]
    );

    indices.push(
      indexOffset,
      indexOffset + 1,
      indexOffset + 2,
      indexOffset + 1,
      indexOffset + 3,
      indexOffset + 2
    );
  }

  clear() {
    for (const bufferKind in this.getVerticesDataKinds()) {
      this.removeVerticesData(bufferKind);
    }
  }

  dispose() {
    super.dispose();
  }
}
