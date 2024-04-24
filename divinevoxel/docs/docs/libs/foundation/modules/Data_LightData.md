---
id: "Data_LightData"
title: "Module: Data/LightData"
sidebar_label: "Data/LightData"
sidebar_position: 0
custom_edit_url: null
---

## Variables

### LightData

• `Const` **LightData**: `Object`

# Light Byte
---
Used to decode light color info.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `SRS` | `number` |
| `_lightValues` | [s: number, r: number, g: number, b: number] |
| `decodeLightFromVoxelData` | (`voxelData`: `number`) => `number` |
| `encodeLightIntoVoxelData` | (`voxelData`: `number`, `encodedLight`: `number`) => `number` |
| `getB` | (`value`: `number`) => `number` |
| `getFullSunLight` | (`sl`: `number`) => `number` |
| `getG` | (`value`: `number`) => `number` |
| `getLightValues` | (`value`: `number`) => [s: number, r: number, g: number, b: number] |
| `getMinusOneForRGB` | (`sl`: `number`, `nl`: `number`) => `number` |
| `getMinusOneForSun` | (`sl`: `number`, `nl`: `number`) => `number` |
| `getR` | (`value`: `number`) => `number` |
| `getRGB` | (`sl`: `number`) => `number` |
| `getS` | (`value`: `number`) => `number` |
| `getSunLightForUnderVoxel` | (`sl`: `number`, `nl`: `number`) => `number` |
| `hasRGBLight` | (`sl`: `number`) => `boolean` |
| `hasSunLight` | (`sl`: `number`) => `boolean` |
| `isGreaterOrEqualThanForRGBRemove` | (`n1`: `number`, `n2`: `number`) => `boolean` |
| `isGreaterOrEqualThanForSunRemove` | (`n1`: `number`, `sl`: `number`) => `boolean` |
| `isLessThanForRGBAdd` | (`n1`: `number`, `n2`: `number`) => `boolean` |
| `isLessThanForRGBRemove` | (`n1`: `number`, `n2`: `number`) => `boolean` |
| `isLessThanForSunAdd` | (`n1`: `number`, `n2`: `number`) => `boolean` |
| `isLessThanForSunAddDown` | (`n1`: `number`, `n2`: `number`) => `boolean` |
| `isLessThanForSunAddUp` | (`n1`: `number`, `n2`: `number`) => `boolean` |
| `isLessThanForSunRemove` | (`n1`: `number`, `sl`: `number`) => `boolean` |
| `minusOneForAll` | (`sl`: `number`) => `number` |
| `mixLight` | (`l1`: `number`, `l2`: `number`) => `number` |
| `removeRGBLight` | (`sl`: `number`) => `number` |
| `removeS` | (`sl`: `number`) => `number` |
| `removeSunLight` | (`sl`: `number`) => `number` |
| `setB` | (`value`: `number`, `sl`: `number`) => `number` |
| `setG` | (`value`: `number`, `sl`: `number`) => `number` |
| `setLightValues` | (`values`: `number`[]) => `number` |
| `setR` | (`value`: `number`, `sl`: `number`) => `number` |
| `setRGB` | (`value`: `number`, `sl`: `number`) => `number` |
| `setS` | (`value`: `number`, `sl`: `number`) => `number` |
| `sunLightCompareForDownSunRemove` | (`n1`: `number`, `sl`: `number`) => `boolean` |

#### Defined in

[divinevoxel/foundation/src/Data/LightData.ts:5](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Data/LightData.ts#L5)
