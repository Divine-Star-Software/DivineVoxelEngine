import { CompactMeshData, CompactSubMesh } from "../Types/Mesher.types";
import { VoxelModelBuilder } from "Mesher/Models/VoxelModelBuilder";
import { VoxelMeshVertexStructCursor } from "../Geomtry/VoxelMeshVertexStructCursor";

const structCursor = new VoxelMeshVertexStructCursor();
/* 
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
} */

export function CompactVoxelMesh(
  tools: VoxelModelBuilder[],
  transfers: any[] = []
): CompactMeshData {
  const data: CompactMeshData = [0, []];
  for (let i = 0; i < tools.length; i++) {
    const tool = tools[i];
    if (!tool.mesh!.vertexCount) continue;

    const totalVerticies =
      tool.mesh.vertexCount * VoxelMeshVertexStructCursor.VertexFloatSize;
    const vertexArray = new Float32Array(totalVerticies);
    const vertexBuffers = tool.mesh.buffer._buffers;
    let start = 0;
    let done = false;
    for (let i = 0; i < vertexBuffers.length; i++) {
      const buffer = vertexBuffers[i];
      for (let j = 0; j < buffer.length; j++) {
        vertexArray[start] = buffer[j];
        start++;
        if (start > totalVerticies) {
          done = true;
          break;
        }
      }
      if (done) break;
    }
    const indiciesArray =
      tool.mesh.indicieCount > 65535
        ? new Uint32Array(tool.mesh.indicieCount)
        : new Uint16Array(tool.mesh.indicieCount);

    const indiceBuffers = tool.mesh.indices._buffers;
    start = 0;
    done = false;
    for (let i = 0; i < indiceBuffers.length; i++) {
      const buffer = indiceBuffers[i];
      for (let j = 0; j < buffer.length; j++) {
        indiciesArray[start] = buffer[j];
        start++;
        if (start > tool.mesh.indicieCount) {
          done = true;
          break;
        }
      }
      if (done) break;
    }
    const minBounds = tool.mesh.minBounds;
    const maxBounds = tool.mesh.maxBounds;

    data[1].push([
      tool.id,
      vertexArray,
      indiciesArray,
      [minBounds.x, minBounds.y, minBounds.z],
      [maxBounds.x, maxBounds.y, maxBounds.z],
    ]);
    transfers.push(vertexArray.buffer, indiciesArray.buffer);
  }

  return data;
}
