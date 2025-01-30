import { MeshDefaultAttributes } from "../Geomtry/MeshData.types"
import { EngineSettings } from "../../Settings/EngineSettings";
import { MesherDataTool } from "../Geomtry/Tools/MesherDataTools"
import {
  BinaryNumberTypes,
  TypedArrayClassMap,
  MappedByteCounts,
} from "@amodx/binary";
import {  CompactSubMesh } from "../Types/Mesher.types";

export function CompactMesh(
  materialId: string,
  tool: MesherDataTool
) {
/*   let webGPU = EngineSettings.settings.rendererSettings.mode == "webgpu";

  const mesh = tool.mesh!;
  const byteRanges: [
    byteStart: number,
    length: number,
    type: BinaryNumberTypes,
  ][] = [];
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
    byteRanges.push([current, array.length, type]);
    dataMap[1].push([key, array as any, stride]);
  }

  const finalBuffer = new ArrayBuffer(totalSize);

  for (let i = 0; i < dataMap[1].length; i++) {
    const startByte = byteRanges[i][0];
    const length = byteRanges[i][1];
    const type = byteRanges[i][2];
    const newArray = new TypedArrayClassMap[type](
      finalBuffer,
      //@ts-ignore
      startByte,
      length
    ) as Float32Array;
    newArray.set(dataMap[1][i][0] as any as number[]);
    dataMap[1][i][1] = newArray;
  }

  return [0, finalBuffer, [dataMap]]; */
}
