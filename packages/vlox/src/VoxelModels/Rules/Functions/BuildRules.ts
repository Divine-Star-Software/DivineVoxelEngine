import { OcclusionFace, OcclusionFlatQuadFace } from "../Classes/OcclusionFace";
import { VoxelRuleGeometry } from "../Classes/VoxelRulesGeometry";
import { VoxelRelativeCubeIndex } from "../../Indexing/VoxelRelativeCubeIndex";
import { Vec3Array, Vector3Like } from "@amodx/math";
import { StringPalette } from "../../../Interfaces/Data/StringPalette";
import { VoxelAOResultsIndex } from "../../Indexing/VoxelAOResultsIndex";
import { VoxelModelManager } from "../VoxelModelManager";
import { VoxelFaceCullResultsIndex } from "../../Indexing/VoxelFaceCullResultsIndex";

class OcculsionBox {
  constructor(
    public p1: Vec3Array = [0, 0, 0],
    public p2: Vec3Array = [0, 0, 0],
    public p3: Vec3Array = [0, 0, 0],
    public p4: Vec3Array = [0, 0, 0]
  ) {}
}

const mainBox = new OcculsionBox();
const size = 0.01;
// Calculate half the size of the box
const halfSize = size / 2;
// Create a small offset to move the box forward
const offset = 0.01;
const boxNormals: Vec3Array[] = [
  [1, 0, 0],
  [0, 1, 0],
  [0, 0, 1],
];

const boxPoints = [mainBox.p1, mainBox.p2, mainBox.p3, mainBox.p4];

const offsetPoint: Vec3Array = [0, 0, 0];
const tangent: Vec3Array = [0, 0, 0];
const bitangent: Vec3Array = [0, 0, 0];

function updateOcculsionBox(point: Vec3Array, normal: Vec3Array): OcculsionBox {
  offsetPoint[0] = point[0] + normal[0] * offset;
  offsetPoint[1] = point[1] + normal[1] * offset;
  offsetPoint[2] = point[2] + normal[2] * offset;

  if (Math.abs(normal[0]) > Math.abs(normal[2])) {
    tangent[0] = -normal[1];
    tangent[1] = normal[0];
    tangent[2] = 0;
  } else {
    tangent[0] = 0;
    tangent[1] = -normal[2];
    tangent[2] = normal[1];
  }

  const tangentLength = Math.sqrt(
    tangent[0] ** 2 + tangent[1] ** 2 + tangent[2] ** 2
  );

  tangent[0] = tangent[0] / tangentLength;
  tangent[1] = tangent[1] / tangentLength;
  tangent[2] = tangent[2] / tangentLength;

  bitangent[0] = normal[1] * tangent[2] - normal[2] * tangent[1];
  bitangent[1] = normal[2] * tangent[0] - normal[0] * tangent[2];
  bitangent[2] = normal[0] * tangent[1] - normal[1] * tangent[0];

  mainBox.p1[0] =
    offsetPoint[0] - tangent[0] * halfSize - bitangent[0] * halfSize;
  mainBox.p1[1] =
    offsetPoint[1] - tangent[1] * halfSize - bitangent[1] * halfSize;
  mainBox.p1[2] =
    offsetPoint[2] - tangent[2] * halfSize - bitangent[2] * halfSize;

  mainBox.p2[0] =
    offsetPoint[0] + tangent[0] * halfSize - bitangent[0] * halfSize;
  mainBox.p2[1] =
    offsetPoint[1] + tangent[1] * halfSize - bitangent[1] * halfSize;
  mainBox.p2[2] =
    offsetPoint[2] + tangent[2] * halfSize - bitangent[2] * halfSize;

  mainBox.p3[0] =
    offsetPoint[0] + tangent[0] * halfSize + bitangent[0] * halfSize;
  mainBox.p3[1] =
    offsetPoint[1] + tangent[1] * halfSize + bitangent[1] * halfSize;
  mainBox.p3[2] =
    offsetPoint[2] + tangent[2] * halfSize + bitangent[2] * halfSize;

  mainBox.p4[0] =
    offsetPoint[0] - tangent[0] * halfSize + bitangent[0] * halfSize;
  mainBox.p4[1] =
    offsetPoint[1] - tangent[1] * halfSize + bitangent[1] * halfSize;
  mainBox.p4[2] =
    offsetPoint[2] - tangent[2] * halfSize + bitangent[2] * halfSize;

  return mainBox;
}

function projectPointOntoAxis(point: Vec3Array, axis: Vec3Array) {
  return point[0] * axis[0] + point[1] * axis[1] + point[2] * axis[2];
}

function projectionsOverlap(
  axis: Vec3Array,
  shape1Points: Vec3Array[],
  shape2Points: Vec3Array[]
) {
  let min1 = Infinity;
  let max1 = -Infinity;
  let min2 = Infinity;
  let max2 = -Infinity;

  for (const point of shape1Points) {
    const projection = projectPointOntoAxis(point, axis);
    min1 = Math.min(min1, projection);
    max1 = Math.max(max1, projection);
  }

  for (const point of shape2Points) {
    const projection = projectPointOntoAxis(point, axis);
    min2 = Math.min(min2, projection);
    max2 = Math.max(max2, projection);
  }

  return !(max1 < min2 || max2 < min1);
}

function doesBoxIntersectFace(quad: OcclusionFace): boolean {
  const quadPoints = quad.points;

  const quadNormal = quad.normal;

  if (!projectionsOverlap(quadNormal, quadPoints, boxPoints)) {
    return false;
  }

  for (const boxNormal of boxNormals) {
    if (!projectionsOverlap(boxNormal, quadPoints, boxPoints)) {
      return false;
    }
  }

  return true;
}

export function BuildRules(main: VoxelRuleGeometry, geoPalette: StringPalette) {
  main.occlusionPlane.setOffset(0, 0, 0);
  const faceCullMap: number[][] = [];
  for (let i = 0; i < main.faceCount; i++) {
    faceCullMap[i] = [];
  }
  const vertexHitMap: number[][] = [];
  for (let i = 0; i < main.vertexCount; i++) {
    vertexHitMap[i] = [];
  }
  const maxIndex = VoxelRelativeCubeIndex.flatIndex.size;

  const totalAOReusltsSize = main.vertexCount * maxIndex;
  const aoRulesBuffer = new SharedArrayBuffer(
    totalAOReusltsSize * (geoPalette.size + 1)
  );

  const aoIndex = new VoxelAOResultsIndex({
    buffer: aoRulesBuffer,
    vertexByteCount: main.vertexCount,
  });

  const cullIndex = new VoxelFaceCullResultsIndex({
    buffer: new SharedArrayBuffer(
      main.faceCount * 2 * maxIndex * (geoPalette.size + 1)
    ),

    faceByteCount: main.faceCount,
  });

  for (
    let otherNumberId = 0;
    otherNumberId < geoPalette.size;
    otherNumberId++
  ) {
    let other = VoxelModelManager.geometry.get(
      geoPalette._palette[otherNumberId]
    )!;
    if(other.data.ogData.doNotBuildRules !== undefined) continue;
    if (other.id == main.id) other = main.clone();

    for (let y = -1; y < 2; y++) {
      for (let nx = -1; nx < 2; nx++) {
        for (let nz = -1; nz < 2; nz++) {
          const directionIndex = VoxelRelativeCubeIndex.getIndex(nx, y, nz);
          other.occlusionPlane.setOffset(nx, y, nz);

          for (const currentPlane of main.occlusionPlane.faces) {
            let occuledFaceIndex = -1;

            const points = currentPlane.points;
            const normal = currentPlane.normal;
            for (const otherPlane of other.occlusionPlane.faces) {
              if (
                otherPlane.parentId == currentPlane.parentId &&
                currentPlane.nodeId == otherPlane.nodeId &&
                nx == 0 &&
                y == 0 &&
                nz == 0
              )
                continue;

              if (otherPlane.doesCoverFace(currentPlane)) {
                occuledFaceIndex = otherPlane.faceCount;
              }

              if (
                Vector3Like.EqualsArray(otherPlane.normal, currentPlane.normal)
              )
                continue;
              for (let v = 0; v < points.length; v++) {
                updateOcculsionBox(points[v], normal);
                const trueVertexIndex = currentPlane.vertexCount + v;

                if (doesBoxIntersectFace(otherPlane)) {
                  aoIndex.setValue(
                    otherNumberId,
                    directionIndex,
                    trueVertexIndex,
                    1
                  );
                  if (!vertexHitMap[trueVertexIndex].includes(directionIndex))
                    vertexHitMap[trueVertexIndex].push(directionIndex);
                }
              }
            }

            cullIndex.setValue(
              otherNumberId,
              directionIndex,
              currentPlane.faceCount,
              occuledFaceIndex
            );
            if (occuledFaceIndex > -1) {
              if (!faceCullMap[currentPlane.faceCount].includes(directionIndex))
                faceCullMap[currentPlane.faceCount].push(directionIndex);
            }
          }
        }
      }
    }
  }

  return {
    aoIndex: aoIndex.data,
    cullIndex: cullIndex.data,
    faceCullMap,
    vertexHitMap,
  };
}
