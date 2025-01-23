import {
  MeshAttributes,
  MeshDefaultAttributes,
} from "@amodx/meshing/MeshData.types";
import { EngineSettings } from "../../Settings/EngineSettings";
import { MesherDataTool } from "@amodx/meshing";
import {
  BinaryNumberTypes,
  TypedArrayClassMap,
  MappedByteCounts,
} from "@amodx/binary";
import {
  CompactMeshData,
  CompactSubMesh,
  CompactMeshIndex,
} from "../Types/Mesher.types";

export function CompactMesh(
  materialId: string,
  tool: MesherDataTool
): CompactMeshData {
  let webGPU = EngineSettings.settings.rendererSettings.mode == "webgpu";

  const mesh = tool.mesh!;
  const dataMap: CompactSubMesh = [materialId, []];
  let totalSize = 0;
  for (let [key, [array, stride, type]] of mesh.attributes) {
    if (key == MeshDefaultAttributes.Indices) {
      if (array.length > 60_000) {
        type = BinaryNumberTypes.Uint32;
      }
    }
    let current = totalSize;

    totalSize += MappedByteCounts[type] * array.length;
    dataMap[1].push([
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

  for (let data of dataMap[1]) {
    const [id, n, length, startByte, endByte, stride, type] = data;

    const newArray = new TypedArrayClassMap[type](
      finalBuffer,
      //@ts-ignore
      startByte,
      length
    ) as Float32Array;
    newArray.set(mesh.attributes.get(id)![0]);
    data[1] = newArray;
  }

  return [0, finalBuffer, [dataMap]];
}
