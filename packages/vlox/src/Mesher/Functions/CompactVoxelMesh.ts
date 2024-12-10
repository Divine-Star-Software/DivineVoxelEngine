import {
  MeshAttributes,
  MeshDefaultAttributes,
} from "@amodx/meshing/MeshData.types";
import { EngineSettings } from "../../Data/Settings/EngineSettings";
import { MesherDataTool } from "@amodx/meshing";
import {
  BinaryNumberTypes,
  TypedArrayClassMap,
  MappedByteCounts,
} from "@amodx/binary";
import { CompactMeshData, CompactMeshIndex } from "../Types/Mesher.types";
import { VoxelMeshTypes } from "../../Mesher/Types/VoxelMesh.types";
import { Vector3Like } from "@amodx/math";
import { VoxelMesherDataTool } from "Mesher/Tools/VoxelMesherDataTool";
import { VoxelMeshVertexStructCursor } from "../Tools/VoxelMeshVertexStructCursor";

/**
struct VoxelMeshVertex {
    position: vec3<f32>,
    normal: vec3<f32>,
    voxelData: f32,
    textureIndex: vec3<f32>,
    uv: vec2<f32>,
    colors: vec3<f32>,
};
 */

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

export function CompactVoxelMesh(tool: VoxelMesherDataTool): CompactMeshData {
  if (EngineSettings.settings.rendererSettings.mode == "webgpu") {
    return MakeWebGPUMesh(tool);
  }

  const mesh = tool.mesh!;
  const dataMap: CompactMeshIndex = [];
  let totalSize = 0;
  for (let [key, [array, stride, type]] of mesh.attributes) {
    if (key == MeshDefaultAttributes.Indices) {
      if (array.length > 60_000) {
        type = BinaryNumberTypes.Uint32;
      }
    }
    let current = totalSize;

    totalSize += MappedByteCounts[type] * array.length;
    dataMap.push([
      key,
      {} as any,
      array.length,
      current,
      totalSize,
      stride,
      type,
    ]);
  }

  const finalBuffer = new ArrayBuffer(totalSize);

  for (let data of dataMap) {
    const [id, n, length, startByte, endByte, stride, type] = data;

    const newArray = new TypedArrayClassMap[type](
      finalBuffer,
      startByte,
      length
    ) as Float32Array;
    newArray.set(mesh.attributes.get(id)![0]);
    data[1] = newArray;
  }

  for (let i = 0; i < tool.bvhTool.tree.length; i++) {
    if (tool.bvhTool.tree[i] == -Infinity) tool.bvhTool.tree[i] = -1;
  }

  return [0, finalBuffer, dataMap];
}
