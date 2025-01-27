import { MeshDefaultAttributes } from "@amodx/meshing/MeshData.types";
import { EngineSettings } from "../../Settings/EngineSettings";
import {
  BinaryNumberTypes,
  TypedArrayClassMap,
  MappedByteCounts,
} from "@amodx/binary";
import { CompactMeshData, CompactSubMesh } from "../Types/Mesher.types";
import { VoxelMeshTypes } from "../../Mesher/Types/VoxelMesh.types";
import { Vector3Like } from "@amodx/math";
import { VoxelMesherDataTool } from "Mesher/Tools/VoxelMesherDataTool";
import { VoxelMeshVertexStructCursor } from "../Tools/VoxelMeshVertexStructCursor";

const structCursor = new VoxelMeshVertexStructCursor();

function MakeWebGPUMesh(tool: VoxelMesherDataTool): CompactMeshData {
  const mesh = tool.mesh!;

  const positions = mesh.attributes.get(MeshDefaultAttributes.Position)![0];
  const normals = mesh.attributes.get(MeshDefaultAttributes.Normal)![0];
  const voxelData = mesh.attributes.get("voxelData")![0];
  const textureIndex = mesh.attributes.get("textureIndex")![0];
  const uv = mesh.attributes.get("uv")![0];
  const colors = mesh.attributes.get("colors")![0];
  const indices = mesh.attributes.get(MeshDefaultAttributes.Indices)![0];

  const numVertices = positions.length / 3;

  // Create the vertex buffer
  const finalBuffer = new ArrayBuffer(
    numVertices * VoxelMeshTypes.vertexStrideBytes
  );
  const vertexData = new Float32Array(finalBuffer);
  structCursor.data = vertexData;
  for (let i = 0; i < numVertices; i++) {
    structCursor.index = i;

    structCursor.positionX = positions[i * 3];
    structCursor.positionY = positions[i * 3 + 1];
    structCursor.positionZ = positions[i * 3 + 2];

    structCursor.normalX = normals[i * 3];
    structCursor.normalY = normals[i * 3 + 1];
    structCursor.normalZ = normals[i * 3 + 2];

    structCursor.voxelData = voxelData[i];

    structCursor.textureIndexX = textureIndex[i * 3];
    structCursor.textureIndexY = textureIndex[i * 3 + 1];
    structCursor.textureIndexZ = textureIndex[i * 3 + 2];

    structCursor.uvX = uv[i * 2];
    structCursor.uvY = uv[i * 2 + 1];

    structCursor.colorR = colors[i * 3];
    structCursor.colorG = colors[i * 3 + 1];
    structCursor.colorB = colors[i * 3 + 2];
  }

  const indexData = new Uint32Array(indices);
  for (let i = 0; i < tool.bvhTool.tree.length; i++) {
    if (tool.bvhTool.tree[i] == -Infinity) tool.bvhTool.tree[i] = -1;
  }

  return [
    1,
    finalBuffer,
    indexData,
    tool.bvhTool.tree.slice(0),
    tool.bvhTool.indices.slice(0),
    Vector3Like.ToArray(mesh.minBounds),
    Vector3Like.ToArray(mesh.maxBounds),
  ];
}

export function CompactVoxelMesh(
  tools: VoxelMesherDataTool[]
): CompactMeshData {
  if (EngineSettings.settings.rendererSettings.mode == "webgpu") {
    return MakeWebGPUMesh(tools[0]);
  }
  const dataMap: CompactSubMesh[] = [];
  const byteRanges: [
    byteStart: number,
    length: number,
    type: BinaryNumberTypes,
  ][] = [];
  let totalSize = 0;
  for (let i = 0; i < tools.length; i++) {
    const tool = tools[i];
    const mesh = tool.mesh!;

    const subMesh: CompactSubMesh = [tool.id, []];

    for (let [key, [array, stride, type]] of mesh.attributes) {
      if (key == MeshDefaultAttributes.Indices) {
        if (array.length > 60_000) {
          type = BinaryNumberTypes.Uint32;
        }
      }
      byteRanges.push([totalSize, array.length, type]);
      subMesh[1].push([key, array as any, stride]);
      totalSize += MappedByteCounts[type] * array.length;
    }

    for (let i = 0; i < tool.bvhTool.tree.length; i++) {
      if (tool.bvhTool.tree[i] == -Infinity) tool.bvhTool.tree[i] = -1;
    }

    dataMap.push(subMesh);
  }

  const finalBuffer = new ArrayBuffer(totalSize);

  let b = 0;
  for (let s = 0; s < dataMap.length; s++) {
    const attributes = dataMap[s][1];
    for (let i = 0; i < attributes.length; i++) {
      const startByte = byteRanges[b][0];
      const length = byteRanges[b][1];
      const type = byteRanges[b][2];
      const newArray = new TypedArrayClassMap[type](
        finalBuffer,
        //@ts-ignore
        startByte,
        length
      ) as Float32Array;

      newArray.set(attributes[i][1] as any as number[]);
      attributes[i][1] = newArray;
      b++;
    }
  }

  return [0, finalBuffer, dataMap];
}
