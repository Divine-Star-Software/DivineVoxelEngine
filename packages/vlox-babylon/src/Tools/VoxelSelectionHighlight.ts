import { Vec3Array } from "@amodx/math";
import { Scene } from "@babylonjs/core/scene";
import { VoxelFaceDirections, VoxelFaces } from "@divinevoxel/vlox/Math";
import { IVoxelSelection } from "@divinevoxel/vlox/Templates/Selection/VoxelSelecton";
import { VoxelLineMesh } from "./VoxelLineMesh";

const lineChecks: Record<VoxelFaces, Vec3Array[]> = {
  [VoxelFaces.Up]: [
    [-1, 0, 0],
    [0, 0, 1],
    [1, 0, 0],
    [0, 0, -1],
  ],
  [VoxelFaces.Down]: [
    [-1, 0, 0],
    [0, 0, -1],
    [1, 0, 0],
    [0, 0, 1],
  ],
  [VoxelFaces.North]: [
    [-1, 0, 0],
    [0, -1, 0],
    [1, 0, 0],
    [0, 1, 0],
  ],
  [VoxelFaces.South]: [
    [-1, 0, 0],
    [0, 1, 0],
    [1, 0, 0],
    [0, -1, 0],
  ],
  [VoxelFaces.East]: [
    [0, -1, 0],
    [0, 0, -1],
    [0, 1, 0],
    [0, 0, 1],
  ],
  [VoxelFaces.West]: [
    [0, -1, 0],
    [0, 0, 1],
    [0, 1, 0],
    [0, 0, -1],
  ],
};
const linePoints: Record<VoxelFaces, Vec3Array[]> = {
  [VoxelFaces.Up]: [
    [-1, 1, -1],
    [-1, 1, 1],
    [1, 1, 1],
    [1, 1, -1],
  ],
  [VoxelFaces.Down]: [
    [-1, -1, 1],
    [-1, -1, -1],
    [1, -1, -1],
    [1, -1, 1],
  ],
  [VoxelFaces.North]: [
    [-1, 1, 1],
    [-1, -1, 1],
    [1, -1, 1],
    [1, 1, 1],
  ],
  [VoxelFaces.South]: [
    [-1, -1, -1],
    [-1, 1, -1],
    [1, 1, -1],
    [1, -1, -1],
  ],
  [VoxelFaces.East]: [
    [1, -1, 1],
    [1, -1, -1],
    [1, 1, -1],
    [1, 1, 1],
  ],
  [VoxelFaces.West]: [
    [-1, -1, -1],
    [-1, -1, 1],
    [-1, 1, 1],
    [-1, 1, -1],
  ],
};

const tempP1: Vec3Array = [0, 0, 0];
const tempP2: Vec3Array = [0, 0, 0];
const addVoxelFace = (
  face: VoxelFaces,
  outlineAll: boolean,
  selection: IVoxelSelection,
  size: number,
  x: number,
  y: number,
  z: number,
  mesh: VoxelLineMesh
) => {
  const faceChecks = lineChecks[face];
  const facePoints = linePoints[face];
  const multi = size / 2;

  const normal = VoxelFaceDirections[face];
  for (let i = 0; i < facePoints.length; i++) {
    const ni = (i + 1) % facePoints.length;
    const p1 = facePoints[i];
    const p2 = facePoints[ni];
    if (!outlineAll) {
      if (
        selection.isSelected(
          x + faceChecks[i][0],
          y + faceChecks[i][1],
          z + faceChecks[i][2]
        ) &&
        !selection.isSelected(
          x + faceChecks[i][0] + normal[0],
          y + faceChecks[i][1] + normal[1],
          z + faceChecks[i][2] + normal[2]
        )
      ) {
        continue;
      }
    }

    tempP1[0] = p1[0] * multi + x + 0.5;
    tempP1[1] = p1[1] * multi + y + 0.5;
    tempP1[2] = p1[2] * multi + z + 0.5;

    tempP2[0] = p2[0] * multi + x + 0.5;
    tempP2[1] = p2[1] * multi + y + 0.5;
    tempP2[2] = p2[2] * multi + z + 0.5;

    mesh.addLineSegment(tempP1, tempP2, normal, 0.1);
  }
};

export class VoxelSelectionHighlight {
  mesh: VoxelLineMesh;
  selection: IVoxelSelection;
  constructor(public scene: Scene) {
    this.mesh = new VoxelLineMesh(scene);
  }
  outlineAll = false;

  dispose() {
    this.mesh.dispose();
  }

  update(selection: IVoxelSelection) {
    this.selection = selection;
    this.mesh.clear();
    const { x: ox, y: oy, z: oz } = selection.origin;
    const { x: sx, y: sy, z: sz } = selection.size;
    const ex = ox + sx;
    const ey = oy + sy;
    const ez = oz + sz;
    for (let x = ox; x < ex; x++) {
      for (let y = oy; y < ey; y++) {
        for (let z = oz; z < ez; z++) {
          if (!selection.isSelected(x, y, z)) continue;
          for (let face: VoxelFaces = 0; face < 6; face++) {
            const n = VoxelFaceDirections[face];
            const nx = x + n[0];
            const ny = y + n[1];
            const nz = z + n[2];
            if (!selection.isSelected(nx, ny, nz)) {
              addVoxelFace(
                face,
                this.outlineAll,
                selection,
                1.01,
                x,
                y,
                z,
                this.mesh
              );
            }
          }
        }
      }
    }

    this.mesh.build();
  }
}
