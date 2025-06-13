import { FinalCompiledVoxelModelData } from "../Models/CompiledVoxelModel.types";
import { SchemaRegister } from "../State/SchemaRegister";
import { VoxelPalettesRegister } from "../../Voxels/Data/VoxelPalettesRegister";
import { EngineStats } from "../../Stats/EngineStats";

type BuildPaletteDataProps = {
  models: FinalCompiledVoxelModelData;
};
function recurse(
  index: number,
  current: string[],
  result: string[],
  valuePairs: [string, string[]][]
) {
  if (index === valuePairs.length) {
    result.push(current.join(","));
    return;
  }

  const [key, values] = valuePairs[index];
  for (const value of values) {
    current.push(`${key}=${value}`);
    recurse(index + 1, current, result, valuePairs);
    current.pop();
  }
}

function getAllCombinations(valuePairs: [string, string[]][]) {
  const result: string[] = [];
  recurse(0, [], result, valuePairs);
  return result;
}

export function BuildPaletteData(props: BuildPaletteDataProps) {
  const models = new Map<string, FinalCompiledVoxelModelData["models"][0]>(
    props.models.models.map((_) => [_.id, _])
  );

  const modelStateArray = new Map<string, number[]>();

  for (const [, model] of models) {
    const schema = SchemaRegister.getModelSchema(model.id);

    const valuePairs: [key: string, values: string[]][] = [];

    for (const node of schema.nodes) {
      valuePairs.push([
        node.name,
        node.valuePalette
          ? node.valuePalette._palette
          : new Array(node.bitMask + 1).fill(0).map((_, i) => `${i}`),
      ]);
    }
    const stateStrings = getAllCombinations(valuePairs);

    const statePalette: number[] = [];
    for (const state of stateStrings) {
      const value = schema.readString(!state ? "*" : state);
      statePalette.push(value);
    }
    modelStateArray.set(model.id, statePalette);
  }

  const finalPalette: [
    voxelId: number,
    stateValue: number,
    modValue: number,
  ][] = [[0, 0, 0]];
  const finalPaletteRecord: number[][][] = [[[0]]];

  let paletteCount = 1;
  for (const voxel of props.models.voxels) {
    const schema = SchemaRegister.getVoxelModSchema(voxel.id);

    const valuePairs: [key: string, values: string[]][] = [];

    for (const node of schema.nodes) {
      valuePairs.push([
        node.name,
        node.valuePalette
          ? node.valuePalette._palette
          : new Array(node.bitMask + 1).fill(0).map((_, i) => `${i}`),
      ]);
    }
    const stateStrings = getAllCombinations(valuePairs);
    const modPalette: number[] = [];
    if (valuePairs.length) {
      for (const state of stateStrings) {
        const value = schema.readString(!state ? "*" : state);
        modPalette.push(value);
      }
    } else {
      modPalette.push(0);
    }

    const voxelId = VoxelPalettesRegister.voxelIds.getNumberId(voxel.id);
    const statePalette = modelStateArray.get(voxel.modelId)!;

    finalPaletteRecord[voxelId] = new Array(modPalette.length).fill(-1);
    for (let modIndex = 0; modIndex < modPalette.length; modIndex++) {
      finalPaletteRecord[voxelId][modPalette[modIndex]] = new Array(
        statePalette.length
      ).fill(-1);
      for (let stateIndex = 0; stateIndex < statePalette.length; stateIndex++) {
        finalPalette[paletteCount] = [
          voxelId,
          statePalette[stateIndex],
          modPalette[modIndex],
        ];
        finalPaletteRecord[voxelId][modPalette[modIndex]][
          statePalette[stateIndex]
        ] = paletteCount;
        paletteCount++;
      }
    }
  }

  EngineStats.palette.paletteSize = finalPalette.length;
  
  VoxelPalettesRegister.voxels = finalPalette;
  VoxelPalettesRegister.voxelRecord = finalPaletteRecord;
}
