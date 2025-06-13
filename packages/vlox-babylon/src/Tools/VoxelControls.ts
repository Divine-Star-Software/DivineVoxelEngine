import { Color3 } from "@babylonjs/core/Maths/math.color";
import { CreateBox } from "@babylonjs/core/Meshes/Builders/boxBuilder";
import { Mesh } from "@babylonjs/core/Meshes/mesh";
import { Ray } from "@babylonjs/core/Culling/ray";
import { Scene } from "@babylonjs/core/scene";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { Effect } from "@babylonjs/core/Materials/effect";
import { ShaderMaterial } from "@babylonjs/core/Materials/shaderMaterial";
import { TransformNode } from "@babylonjs/core/Meshes/transformNode";
import { VertexBuffer } from "@babylonjs/core/Buffers/buffer";
import { Plane } from "@babylonjs/core/Maths/math.plane";
import { Vector3Like } from "@amodx/math";
import { TypedEventTarget } from "@divinevoxel/vlox/Util/TypedEventTarget";

Effect.ShadersStore["voxelControlsVertexShader"] = /*glsl */ `#version 300 es
precision highp float;
in vec3 position; 
in float axes;
uniform mat4 world;
uniform mat4 viewProjection;
uniform vec3 colors[3];
uniform vec4 states[3];
out vec3 vColor;
void main(void) {
  vec4 p = vec4( position, 1.0 );
  vec4 state = states[uint(axes)];
  vec3 color = colors[uint(axes)];
  if(state.x == 1. && state.y != 1.) {
    color *= .5;
  }
  if(state.y == 1.) {
    color *= 1.5;
    color += .5;
  }
  vColor = color;
  gl_Position = viewProjection * world * p;
}
`;

Effect.ShadersStore["voxelControlsFragmentShader"] = /*glsl */ `#version 300 es
precision highp float;
in vec3 vColor;
out vec4 FragColor;  
void main(void) {
  FragColor = vec4(vColor, 1.);
}
`;
enum Axes {
  X,
  Y,
  Z,
}
type AxesNames = "x" | "y" | "z";
const AxesRecord: Record<Axes, AxesNames> = {
  [Axes.X]: "x",
  [Axes.Y]: "y",
  [Axes.Z]: "z",
};
const min = new Vector3();
const max = new Vector3();

class PositionAxes {
  mesh: Mesh;
  _dirty = false;

  get hover() {
    return this._states[this.axex * 4] == 1;
  }
  set hover(hovver: boolean) {
    this._states[this.axex * 4] = hovver ? 1 : 0;
    this._dirty = true;
  }

  get active() {
    return this._states[this.axex * 4 + 1] == 1;
  }
  set active(active: boolean) {
    this._states[this.axex * 4 + 1] = active ? 1 : 0;
    this._dirty = true;
  }

  min: Vector3;
  max: Vector3;
  constructor(
    public controls: VoxelControls,
    public normal: Vector3,
    public axex: Axes,
    public _states: Float32Array
  ) {
    const tempMesh = CreateBox(
      "",
      {
        width: normal.x || 0.1,
        height: normal.y || 0.1,
        depth: normal.z || 0.1,
      },
      this.controls.scene
    );

    const mesh = new Mesh(`${axex}`, this.controls.scene);
    this.mesh = mesh;
    const positons = tempMesh.getVerticesData(VertexBuffer.PositionKind)!;
    mesh.setVerticesData(VertexBuffer.PositionKind, positons);
    const colors: number[] = [];
    let j = 0;
    for (let i = 0; i < positons.length; i += 3) {
      colors[j] = axex;
      j++;
    }
    mesh.setVerticesBuffer(
      new VertexBuffer(
        this.controls.scene.getEngine(),
        colors,
        "axes",
        false,
        undefined,
        1
      )
    );
    mesh.setIndices(tempMesh.getIndices()!);
    this.mesh.refreshBoundingInfo();
    tempMesh.dispose();

    const bounds = this.mesh.getBoundingInfo().boundingBox!;
    this.min = bounds.minimum.clone();
    this.max = bounds.maximum.clone();

    this.mesh.position.set(
      normal.x > 0 ? normal.x / 2 : 0,
      normal.y > 0 ? normal.y / 2 : 0,
      normal.z > 0 ? normal.z / 2 : 0
    );
    this.mesh.renderingGroupId = 2;
    this.mesh.parent = this.controls.parent;
    this.mesh.material = this.controls.material;
  }

  deltaPoint = new Vector3();
  deltas = new Vector3();

  update(ray: Ray, mouseDown: boolean) {
    min.set(
      this.min.x + this.mesh.position.x + this.controls.parent.position.x,
      this.min.y + this.mesh.position.y + this.controls.parent.position.y,
      this.min.z + this.mesh.position.z + this.controls.parent.position.z
    );
    max.set(
      this.max.x + this.mesh.position.x + this.controls.parent.position.x,
      this.max.y + this.mesh.position.y + this.controls.parent.position.y,
      this.max.z + this.mesh.position.z + this.controls.parent.position.z
    );
    if (this.active && !mouseDown) {
      this.active = false;
      this.controls._controlActive = false;
      this.controls.dispatch("inactive", AxesRecord[this.axex]);
      return;
    }

    if (this.active) {
      const axis = this.normal; // this is (1,0,0) for X

      // Get a plane normal that's perpendicular to the camera but allows movement along the axis
      const planeNormal = Vector3.Cross(
        Vector3.Cross(axis, ray.direction),
        axis
      ).normalize();

      // Define a new drag plane every frame (or store it if performance becomes an issue)
      const dragPlane = Plane.FromPositionAndNormal(
        this.deltaPoint,
        planeNormal
      );

      const distance = ray.intersectsPlane(dragPlane);
      if (!distance) return;
      const intersectionPoint = new Vector3(
        ray.origin.x + ray.direction.x * distance,
        ray.origin.y + ray.direction.y * distance,
        ray.origin.z + ray.direction.z * distance
      );

      // Only allow movement along the axis
      const movementVector = intersectionPoint.subtract(this.deltaPoint);
      const projected = axis.scale(Vector3.Dot(movementVector, axis));

      const dx = Math.floor(projected.x);
      const dy = Math.floor(projected.y);
      const dz = Math.floor(projected.z);

      const needUpdate =
        dx !== this.deltas.x || dy !== this.deltas.y || dz !== this.deltas.z;

      if (needUpdate) {
        this.deltas.set(dx, dy, dz);
        this.controls.dispatch("position", { x: dx, y: dy, z: dz });
      }
    }

    if (ray.intersectsBoxMinMax(min, max)) {
      if (mouseDown && !this.active && !this.controls._controlActive) {
        this.active = true;
        this.deltas.set(0, 0, 0);
        this.deltaPoint.set(
          this.controls.parent.position.x,
          this.controls.parent.position.y,
          this.controls.parent.position.z
        );
        this.controls._controlActive = true;
        this.controls.dispatch("active", AxesRecord[this.axex]);
      }
      if (!this.hover) this.hover = true;
    } else {
      if (this.hover) this.hover = false;
    }
  }

  dispose() {
    this.mesh.dispose();
  }
}

export interface VoxelControlsEvents {
  position: Vector3Like;
  active: AxesNames;
  inactive: AxesNames;
}

const tempRay = new Ray(new Vector3(0, 0, 0), new Vector3(1, 1, 1), 10000);

export class VoxelControls extends TypedEventTarget<VoxelControlsEvents> {
  static Materials = new Map<Scene, ShaderMaterial>();
  xAxes: PositionAxes;
  yAxes: PositionAxes;
  zAxes: PositionAxes;
  colors: Record<Axes, Color3>;
  parent: TransformNode;
  material: ShaderMaterial;
  _states: Float32Array;
  _controlActive = false;

  origin = Vector3Like.Create();
  size = Vector3Like.Create(1, 1, 1);

  constructor(public scene: Scene) {
    super();
    if (!VoxelControls.Materials.has(scene)) {
      const material = new ShaderMaterial("", scene, "voxelControls", {
        uniforms: ["colors", "states", "world", "viewProjection"],
        attributes: ["position", "axes"],
        needAlphaBlending: true,
      });
      VoxelControls.Materials.set(scene, material);
    }

    const material = VoxelControls.Materials.get(scene)!.clone("");
    this.material = material;
    material.backFaceCulling = false;
    material.forceDepthWrite = true;

    this.parent = new TransformNode("", scene);
    this._states = new Float32Array(4 * 3);
    this.xAxes = new PositionAxes(
      this,
      new Vector3(1, 0, 0),
      Axes.X,
      this._states
    );

    this.yAxes = new PositionAxes(
      this,
      new Vector3(0, 1, 0),
      Axes.Y,
      this._states
    );

    this.zAxes = new PositionAxes(
      this,
      new Vector3(0, 0, 1),
      Axes.Z,
      this._states
    );

    this.updateColors(
      new Color3(1, 0, 0),
      new Color3(0, 1, 0),
      new Color3(0, 0, 1)
    );
    this.material.setArray4("states", this._states as any);
  }

  updateColors(x: Color3, y: Color3, z: Color3) {
    if (!this.colors) this.colors = {} as any;
    this.colors[Axes.X] = x;
    this.colors[Axes.Y] = y;
    this.colors[Axes.Z] = z;
    this.material.setColor3Array("colors", [
      this.colors[Axes.X],
      this.colors[Axes.Y],
      this.colors[Axes.Z],
    ]);
  }

  setOriginAndSize(origin: Vector3Like, size: Vector3Like) {
    this.origin = origin;
    this.size = size;
  }

  updatePosition() {
    this.parent.position.x = this.origin.x + this.size.x / 2;
    this.parent.position.y = this.origin.y + this.size.y / 2;
    this.parent.position.z = this.origin.z + this.size.z / 2;
  }
  update(
    mouseDown: boolean,
    rayOrigin: Vector3Like,
    rayDirection: Vector3Like,
    length: number
  ) {
    this.updatePosition();
    tempRay.origin.set(rayOrigin.x, rayOrigin.y, rayOrigin.z);
    tempRay.direction.set(rayDirection.x, rayDirection.y, rayDirection.z);
    tempRay.length = length;
    this.xAxes.update(tempRay, mouseDown);
    this.yAxes.update(tempRay, mouseDown);
    this.zAxes.update(tempRay, mouseDown);
    if (this.xAxes._dirty || this.yAxes._dirty || this.zAxes._dirty) {
      this.material.setArray4("states", this._states as any);
      this.xAxes._dirty = false;
      this.yAxes._dirty = false;
      this.zAxes._dirty = false;
    }
  }

  setEnabled(enabled: boolean) {
    this.xAxes.mesh.setEnabled(enabled);
    this.yAxes.mesh.setEnabled(enabled);
    this.zAxes.mesh.setEnabled(enabled);
  }

  dispose() {
    this.xAxes.dispose();
    this.yAxes.dispose();
    this.zAxes.dispose();
    this.material.dispose();
  }
}
