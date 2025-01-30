import { Vec3Array, Vector3Like } from "@amodx/math";
import { Quad } from "../../../Mesher/Geomtry/Primitives/Quad"
import { VoxelFaceNames } from "../../../Math";

export abstract class OcclusionFace {
  public parentId: string;
  public nodeId: number;
  public vertexCount: number;
  public faceCount: number;
  points: Vec3Array[];
  normal: Vec3Array;
  offset: Vec3Array = [0, 0, 0];

  abstract setOffset(x: number, y: number, z: number): void;
  abstract updatePoints(): void;
  abstract clone(): OcclusionFace;
  abstract isPointInBounds(point: Vec3Array): boolean;
  abstract doesCoverFace(face: OcclusionFace): boolean;
}

export class OcclusionFlatQuadFace extends OcclusionFace {
  start = Vector3Like.Create();
  end = Vector3Like.Create();

  normal: Vec3Array;

  points: [Vec3Array, Vec3Array, Vec3Array, Vec3Array];

  constructor(
    public parentId: string,
    public nodeId: number,
    public direction: VoxelFaceNames,
    public vertexCount: number,
    public faceCount: number,
    private _start: Vec3Array,
    private _end: Vec3Array
  ) {
    super();

    Vector3Like.CopyFromArray(this.start, _start);
    Vector3Like.CopyFromArray(this.end, _end);

    this.points = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];

    this.updatePoints();

    switch (this.direction) {
      case "up":
        this.normal = [0, 1, 0];
        break;
      case "down":
        this.normal = [0, -1, 0];
        break;
      case "north":
        this.normal = [0, 0, 1];
        break;
      case "south":
        this.normal = [0, 0, -1];
        break;
      case "east":
        this.normal = [1, 0, 0];
        break;
      case "west":
        this.normal = [-1, 0, 0];
        break;
      default:
        this.normal = [0, 0, 0];
        break;
    }
  }

  setOffset(x: number, y: number, z: number) {
    this.offset[0] = x;
    this.offset[1] = y;
    this.offset[2] = z;
    this.start.x = this._start[0] + x;
    this.start.y = this._start[1] + y;
    this.start.z = this._start[2] + z;
    this.end.x = this._end[0] + x;
    this.end.y = this._end[1] + y;
    this.end.z = this._end[2] + z;
    this.updatePoints();
  }

  updatePoints() {
    const { start, end } = this;

    switch (this.direction) {
      case "up":
        this.points[0][0] = end.x;
        this.points[0][1] = end.y;
        this.points[0][2] = end.z;

        this.points[1][0] = start.x;
        this.points[1][1] = end.y;
        this.points[1][2] = end.z;

        this.points[2][0] = start.x;
        this.points[2][1] = end.y;
        this.points[2][2] = start.z;

        this.points[3][0] = end.x;
        this.points[3][1] = end.y;
        this.points[3][2] = start.z;
        break;

      case "down":
        this.points[0][0] = start.x;
        this.points[0][1] = start.y;
        this.points[0][2] = end.z;

        this.points[1][0] = end.x;
        this.points[1][1] = start.y;
        this.points[1][2] = end.z;

        this.points[2][0] = end.x;
        this.points[2][1] = start.y;
        this.points[2][2] = start.z;

        this.points[3][0] = start.x;
        this.points[3][1] = start.y;
        this.points[3][2] = start.z;
        break;

      case "north":
        this.points[0][0] = start.x;
        this.points[0][1] = end.y;
        this.points[0][2] = end.z;

        this.points[1][0] = end.x;
        this.points[1][1] = end.y;
        this.points[1][2] = end.z;

        this.points[2][0] = end.x;
        this.points[2][1] = start.y;
        this.points[2][2] = end.z;

        this.points[3][0] = start.x;
        this.points[3][1] = start.y;
        this.points[3][2] = end.z;
        break;

      case "south":
        this.points[0][0] = end.x;
        this.points[0][1] = end.y;
        this.points[0][2] = start.z;

        this.points[1][0] = start.x;
        this.points[1][1] = end.y;
        this.points[1][2] = start.z;

        this.points[2][0] = start.x;
        this.points[2][1] = start.y;
        this.points[2][2] = start.z;

        this.points[3][0] = end.x;
        this.points[3][1] = start.y;
        this.points[3][2] = start.z;
        break;

      case "east":
        this.points[0][0] = end.x;
        this.points[0][1] = end.y;
        this.points[0][2] = end.z;

        this.points[1][0] = end.x;
        this.points[1][1] = end.y;
        this.points[1][2] = start.z;

        this.points[2][0] = end.x;
        this.points[2][1] = start.y;
        this.points[2][2] = start.z;

        this.points[3][0] = end.x;
        this.points[3][1] = start.y;
        this.points[3][2] = end.z;
        break;

      case "west":
        this.points[0][0] = start.x;
        this.points[0][1] = end.y;
        this.points[0][2] = start.z;

        this.points[1][0] = start.x;
        this.points[1][1] = end.y;
        this.points[1][2] = end.z;

        this.points[2][0] = start.x;
        this.points[2][1] = start.y;
        this.points[2][2] = end.z;

        this.points[3][0] = start.x;
        this.points[3][1] = start.y;
        this.points[3][2] = start.z;
        break;

      default:
        break;
    }
  }

  clone() {
    return new OcclusionFlatQuadFace(
      this.parentId,
      this.nodeId,
      this.direction,
      this.vertexCount,
      this.faceCount,
      [...this._start],
      [...this._end]
    );
  }

  isPointInBounds(point: Vec3Array): boolean {
    const [x, y, z] = point;

    switch (this.direction) {
      case "up":
      case "down":
        // For the up and down faces, check X and Z bounds since Y is constant
        return (
          x >= this.start.x &&
          x <= this.end.x &&
          z >= this.start.z &&
          z <= this.end.z
        );
      case "north":
      case "south":
        // For north and south faces, check X and Y bounds since Z is constant
        return (
          x >= this.start.x &&
          x <= this.end.x &&
          y >= this.start.y &&
          y <= this.end.y
        );
      case "east":
      case "west":
        // For east and west faces, check Y and Z bounds since X is constant
        return (
          y >= this.start.y &&
          y <= this.end.y &&
          z >= this.start.z &&
          z <= this.end.z
        );
      default:
        return false;
    }
  }

  doesCoverFace(face: OcclusionFace): boolean {
    if (face instanceof OcclusionFlatQuadFace) {
      // Existing logic for OcclusionFlatQuadFace
      switch (this.direction) {
        case "up":
          if (face.direction === "down" && this.start.y === face.end.y) {
            return this.totallyCoversInXAndZ(face);
          }
          break;
        case "down":
          if (face.direction === "up" && this.end.y === face.start.y) {
            return this.totallyCoversInXAndZ(face);
          }
          break;
        case "north":
          if (face.direction === "south" && this.end.z === face.start.z) {
            return this.totallyCoversInXAndY(face);
          }
          break;
        case "south":
          if (face.direction === "north" && this.start.z === face.end.z) {
            return this.totallyCoversInXAndY(face);
          }
          break;
        case "east":
          if (face.direction === "west" && this.start.x === face.end.x) {
            return this.totallyCoversInYAndZ(face);
          }
          break;
        case "west":
          if (face.direction === "east" && this.end.x === face.start.x) {
            return this.totallyCoversInYAndZ(face);
          }
          break;
        default:
          return false;
      }
    }
    if (face instanceof OcclusionQuadFace) {
      // New logic for OcclusionQuadFace
      const epsilon = 1e-6;

      // Check if normals are opposite (since we are checking occlusion)
      const dotProduct =
        this.normal[0] * face.normal[0] +
        this.normal[1] * face.normal[1] +
        this.normal[2] * face.normal[2];

      if (dotProduct >= -epsilon) {
        // Normals are not opposite or parallel
        return false;
      }

      // Determine the plane coordinate based on the face direction
      let planeCoordinate: number;
      let coordIndex: number;

      switch (this.direction) {
        case "up":
        case "down":
          planeCoordinate = this.start.y;
          coordIndex = 1; // Y-axis
          break;
        case "north":
        case "south":
          planeCoordinate = this.start.z;
          coordIndex = 2; // Z-axis
          break;
        case "east":
        case "west":
          planeCoordinate = this.start.x;
          coordIndex = 0; // X-axis
          break;
        default:
          return false;
      }

      // Check if all points of face lie on the plane of this face
      for (const point of face.points) {
        if (Math.abs(point[coordIndex] - planeCoordinate) > epsilon) {
          return false;
        }
      }

      // Check if all points of face are within the bounds of this face
      for (const point of face.points) {
        if (!this.isPointInBounds(point)) {
          return false;
        }
      }

      // All checks passed, this face covers the other face
      return true;
    }

    return false;
  }

  private totallyCoversInXAndZ(plane: OcclusionFlatQuadFace): boolean {
    return (
      this.start.x <= plane.start.x &&
      this.end.x >= plane.end.x &&
      this.start.z <= plane.start.z &&
      this.end.z >= plane.end.z
    );
  }

  private totallyCoversInXAndY(plane: OcclusionFlatQuadFace): boolean {
    return (
      this.start.x <= plane.start.x &&
      this.end.x >= plane.end.x &&
      this.start.y <= plane.start.y &&
      this.end.y >= plane.end.y
    );
  }

  private totallyCoversInYAndZ(plane: OcclusionFlatQuadFace): boolean {
    return (
      this.start.y <= plane.start.y &&
      this.end.y >= plane.end.y &&
      this.start.z <= plane.start.z &&
      this.end.z >= plane.end.z
    );
  }

  isPointOnFace(x: number, y: number, z: number): boolean {
    const epsilon = 1e-6;
    switch (this.direction) {
      case "up":
      case "down":
        return (
          Math.abs(y - this.start.y) < epsilon &&
          x >= this.start.x &&
          x <= this.end.x &&
          z >= this.start.z &&
          z <= this.end.z
        );
      case "north":
      case "south":
        return (
          Math.abs(z - this.start.z) < epsilon &&
          x >= this.start.x &&
          x <= this.end.x &&
          y >= this.start.y &&
          y <= this.end.y
        );
      case "east":
      case "west":
        return (
          Math.abs(x - this.start.x) < epsilon &&
          y >= this.start.y &&
          y <= this.end.y &&
          z >= this.start.z &&
          z <= this.end.z
        );
      default:
        return false;
    }
  }
}

export class OcclusionQuadFace extends OcclusionFace {
  normal: Vec3Array;
  normals: Vec3Array[];

  public points: [Vec3Array, Vec3Array, Vec3Array, Vec3Array];

  constructor(
    public parentId: string,
    public nodeId: number,
    public vertexCount: number,
    public faceCount: number,
    private _points: [Vec3Array, Vec3Array, Vec3Array, Vec3Array]
  ) {
    super();

    this.normals = Quad.GetQuadNormalLeftHanded(
      _points[0],
      _points[1],
      _points[2],
      _points[3]
    );

    const averageNormal: Vec3Array = [0, 0, 0];

    for (let i = 0; i < this.normals.length; i++) {
      averageNormal[0] += this.normals[i][0];
      averageNormal[1] += this.normals[i][1];
      averageNormal[2] += this.normals[i][2];
    }
    averageNormal[0] /= this.normals.length;
    averageNormal[1] /= this.normals.length;
    averageNormal[2] /= this.normals.length;

    // Normalize the average normal
    const magnitude = Math.sqrt(
      averageNormal[0] * averageNormal[0] +
        averageNormal[1] * averageNormal[1] +
        averageNormal[2] * averageNormal[2]
    );
    if (magnitude !== 0) {
      averageNormal[0] /= magnitude;
      averageNormal[1] /= magnitude;
      averageNormal[2] /= magnitude;
    }

    this.normal = averageNormal;

    this.points = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];

    this.updatePoints();
  }

  setOffset(x: number, y: number, z: number) {
    this.offset[0] = x;
    this.offset[1] = y;
    this.offset[2] = z;
    this.updatePoints();
  }

  updatePoints() {
    for (let i = 0; i < 4; i++) {
      this.points[i][0] = this._points[i][0] + this.offset[0];
      this.points[i][1] = this._points[i][1] + this.offset[1];
      this.points[i][2] = this._points[i][2] + this.offset[2];
    }
  }

  clone() {
    return new OcclusionQuadFace(
      this.parentId,
      this.nodeId,
      this.vertexCount,
      this.faceCount,
      structuredClone(this._points)
    );
  }

  private isPointInTriangle(
    p: Vec3Array,
    a: Vec3Array,
    b: Vec3Array,
    c: Vec3Array
  ): boolean {
    // Compute vectors
    const v0: Vec3Array = [c[0] - a[0], c[1] - a[1], c[2] - a[2]];
    const v1: Vec3Array = [b[0] - a[0], b[1] - a[1], b[2] - a[2]];
    const v2: Vec3Array = [p[0] - a[0], p[1] - a[1], p[2] - a[2]];

    // Compute dot products
    const dot00 = Vector3Like.DotArray(v0, v0);
    const dot01 = Vector3Like.DotArray(v0, v1);
    const dot02 = Vector3Like.DotArray(v0, v2);
    const dot11 = Vector3Like.DotArray(v1, v1);
    const dot12 = Vector3Like.DotArray(v1, v2);

    // Compute barycentric coordinates
    const denom = dot00 * dot11 - dot01 * dot01;
    if (denom === 0) {
      return false; // Degenerate triangle
    }
    const u = (dot11 * dot02 - dot01 * dot12) / denom;
    const v = (dot00 * dot12 - dot01 * dot02) / denom;

    // Check if point is in triangle
    return u >= 0 && v >= 0 && u + v <= 1;
  }

  isPointInBounds(point: Vec3Array): boolean {
    return (
      this.isPointInTriangle(
        point,
        this.points[0],
        this.points[1],
        this.points[2]
      ) ||
      this.isPointInTriangle(
        point,
        this.points[0],
        this.points[2],
        this.points[3]
      )
    );
  }

  isPointOnFace(x: number, y: number, z: number): boolean {
    // First, check if point is on the plane
    const p0 = this.points[0];
    const v: Vec3Array = [x - p0[0], y - p0[1], z - p0[2]];
    const d = Vector3Like.DotArray(this.normal, v);
    const epsilon = 1e-6;
    if (Math.abs(d) > epsilon) {
      return false;
    }
    // Point is on plane, now check if it's inside the face
    const p: Vec3Array = [x, y, z];
    return this.isPointInBounds(p);
  }

  doesCoverFace(face: OcclusionFace): boolean {
    const epsilon = 1e-6;

    // Normalize normals
    const n1 = this.normal;
    const n2 = face.normal;
    const n1Mag = Math.sqrt(n1[0] * n1[0] + n1[1] * n1[1] + n1[2] * n1[2]);
    const n2Mag = Math.sqrt(n2[0] * n2[0] + n2[1] * n2[1] + n2[2] * n2[2]);
    const n1Norm: Vec3Array = [n1[0] / n1Mag, n1[1] / n1Mag, n1[2] / n1Mag];
    const n2Norm: Vec3Array = [n2[0] / n2Mag, n2[1] / n2Mag, n2[2] / n2Mag];

    // Compute dot product of normals
    const dotNormals = Vector3Like.DotArray(n1Norm, n2Norm);
    if (Math.abs(Math.abs(dotNormals) - 1) > epsilon) {
      // Normals are not parallel
      return false;
    }

    // Check if a point from face lies on the plane of this face
    const p0 = this.points[0];
    const v: Vec3Array = [
      face.points[0][0] - p0[0],
      face.points[0][1] - p0[1],
      face.points[0][2] - p0[2],
    ];
    const d = Vector3Like.DotArray(this.normal, v);
    if (Math.abs(d) > epsilon) {
      // Faces are not coplanar
      return false;
    }

    // Check if all points of face are within this face
    for (const point of face.points) {
      if (!this.isPointInBounds(point)) {
        return false;
      }
    }
    return true;
  }
}

export class OcclusionFaceContainer {
  faces: OcclusionFace[] = [];
  offset: Vec3Array = [0, 0, 0];

  constructor() {}
  setOffset(x: number, y: number, z: number) {
    this.offset[0] = x;
    this.offset[1] = y;
    this.offset[2] = z;
    for (const plane of this.faces) {
      plane.setOffset(x, y, z);
      plane.updatePoints();
    }
  }

  addFace(face: OcclusionFace) {
    this.faces[face.faceCount] = face;
  }

  clone() {
    const container = new OcclusionFaceContainer();
    for (const face of this.faces) {
      container.faces[face.faceCount] = face.clone();
    }
    return container;
  }
}
