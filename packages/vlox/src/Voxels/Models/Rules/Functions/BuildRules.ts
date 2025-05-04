import { IOcclusionFace } from "../Classes/OcclusionFace";
import { VoxelRelativeCubeIndex } from "../../Indexing/VoxelRelativeCubeIndex";
import { Vec3Array, Vec3ArrayLike } from "@amodx/math";
import { StringPalette } from "../../../../Util/StringPalette";
import { VoxelModelRuleBuilderRegister } from "../VoxelModelRuleBuilderRegister";
import { OcclusionFaceRegister } from "../Classes/OcclusionFaceRegister";
import { AOOcclusionFaceIndex } from "../../Indexing/AOOcclusionFaceIndex";
import { CulledOcclusionFaceIndex } from "../../Indexing/CulledOcclusionFaceIndex";
import { OcclusionQuadFace } from "../Classes/OcclusionQuadFace";
import { OcclusionTriangleFace } from "../Classes/OcclusionTriangleFace";
import { EngineSettings } from "../../../../Settings/EngineSettings";
import { EngineStats } from "../../../../Stats/EngineStats";

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

function doesBoxIntersectFace(quad: IOcclusionFace): boolean {
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

export function BuildRules(geoPalette: StringPalette) {
  const faceCullMap: number[][] = [];
  const vertexHitMap: number[][][] = [];
  const cubeIndexSize = VoxelRelativeCubeIndex.flatIndex.size;
  const totalFaces = OcclusionFaceRegister.faces.size;
  const totalAOReusltsSize = totalFaces * 4 * cubeIndexSize * geoPalette.size;

  const aoIndexBufferSize = Math.ceil(totalAOReusltsSize / 8);
  const aoIndex = new AOOcclusionFaceIndex({
    buffer: EngineSettings.settings.memoryAndCPU.useSharedMemory
      ? new SharedArrayBuffer(aoIndexBufferSize)
      : new ArrayBuffer(aoIndexBufferSize),
    totalFaces,
  });

  const cullIndexResultsSize = totalFaces * cubeIndexSize * geoPalette.size;
  const cullIndexBufferSize = Math.ceil(cullIndexResultsSize / 8);
  const cullIndex = new CulledOcclusionFaceIndex({
    buffer: EngineSettings.settings.memoryAndCPU.useSharedMemory
      ? new SharedArrayBuffer(cullIndexBufferSize)
      : new ArrayBuffer(cullIndexBufferSize),
    totalFaces,
  });

  const faces = OcclusionFaceRegister.faces._palette;

  const currentQuadFace = new OcclusionQuadFace();
  const currentTriangleFace = new OcclusionTriangleFace();
  const otherQuadFace = new OcclusionQuadFace();
  const otherTriangleFace = new OcclusionTriangleFace();


  EngineStats.geomtry.faces = faces.length;

  for (let faceIndex = 0; faceIndex < faces.length; faceIndex++) {
    const faceData = OcclusionFaceRegister.faceIndex[faceIndex];
    let currentFace: IOcclusionFace;
    if (faceData[0] == 0) {
      currentQuadFace.setPoints(faceData[1]);
      currentFace = currentQuadFace;
    } else {
      otherTriangleFace.setPoints(faceData[1]);
      currentFace = otherTriangleFace;
    }
    faceCullMap[faceIndex] = [];
    vertexHitMap[faceIndex] = [];
    const facePoints = currentFace.points;
    const faceNormal = currentFace.normal;
    for (let gometryId = 0; gometryId < geoPalette.size; gometryId++) {
      let geomtry = VoxelModelRuleBuilderRegister.geometry.get(
        geoPalette._palette[gometryId]
      )!;
      if (geomtry.data.ogData.doNotBuildRules !== undefined) continue;
      for (const otherGeo of geomtry.compiled) {
        if (otherGeo.type == "custom" || otherGeo.trueFaceIndex === undefined)
          continue;
        const otherFaceData =
          OcclusionFaceRegister.faceIndex[otherGeo.trueFaceIndex];
        let otherFace: IOcclusionFace;
        if (otherFaceData[0] == 0) {
          otherQuadFace.setPoints(otherFaceData[1]);
          otherFace = otherQuadFace;
        } else {
          currentTriangleFace.setPoints(otherFaceData[1]);
          otherFace = currentTriangleFace;
        }

        for (let y = -1; y < 2; y++) {
          for (let x = -1; x < 2; x++) {
            for (let z = -1; z < 2; z++) {
              if (
                faceIndex == otherGeo.trueFaceIndex &&
                x == 0 &&
                y == 0 &&
                z == 0
              )
                continue;
              const directionIndex = VoxelRelativeCubeIndex.getIndex(x, y, z);

              otherQuadFace.setOffset(x, y, z);

              if (otherFace.doesCoverFace(currentFace)) {
                cullIndex.setValue(gometryId, directionIndex, faceIndex, 1);
                if (!faceCullMap[faceIndex].includes(directionIndex)) {
                  faceCullMap[faceIndex].push(directionIndex);
                }
              }

              if (Vec3ArrayLike.Equals(otherFace.normal, faceNormal)) continue;

              for (let v = 0; v < facePoints.length; v++) {
                updateOcculsionBox(facePoints[v], faceNormal);
                vertexHitMap[faceIndex][v] ??= [];

                if (doesBoxIntersectFace(otherFace)) {
                  aoIndex.setValue(gometryId, directionIndex, faceIndex, v, 1);

                  if (!vertexHitMap[faceIndex][v].includes(directionIndex)) {
                    vertexHitMap[faceIndex][v].push(directionIndex);
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  return {
    aoIndex: aoIndex.toJSON(),
    faceCullIndex: cullIndex.toJSON(),
    faceCullMap,
    vertexHitMap,
  };
}
