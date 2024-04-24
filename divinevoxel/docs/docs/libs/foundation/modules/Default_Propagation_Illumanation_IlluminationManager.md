---
id: "Default_Propagation_Illumanation_IlluminationManager"
title: "Module: Default/Propagation/Illumanation/IlluminationManager"
sidebar_label: "Default/Propagation/Illumanation/IlluminationManager"
sidebar_position: 0
custom_edit_url: null
---

## Variables

### IlluminationManager

• `Const` **IlluminationManager**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `_nDataTool` | [`DataTool`](../classes/Default_Tools_Data_DataTool.DataTool.md) |
| `_sDataTool` | [`DataTool`](../classes/Default_Tools_Data_DataTool.DataTool.md) |
| `lightData` | \{ `SRS`: `number` = 2; `_lightValues`: [s: number, r: number, g: number, b: number] ; `decodeLightFromVoxelData`: (`voxelData`: `number`) => `number` ; `encodeLightIntoVoxelData`: (`voxelData`: `number`, `encodedLight`: `number`) => `number` ; `getB`: (`value`: `number`) => `number` ; `getFullSunLight`: (`sl`: `number`) => `number` ; `getG`: (`value`: `number`) => `number` ; `getLightValues`: (`value`: `number`) => [s: number, r: number, g: number, b: number] ; `getMinusOneForRGB`: (`sl`: `number`, `nl`: `number`) => `number` ; `getMinusOneForSun`: (`sl`: `number`, `nl`: `number`) => `number` ; `getR`: (`value`: `number`) => `number` ; `getRGB`: (`sl`: `number`) => `number` ; `getS`: (`value`: `number`) => `number` ; `getSunLightForUnderVoxel`: (`sl`: `number`, `nl`: `number`) => `number` ; `hasRGBLight`: (`sl`: `number`) => `boolean` ; `hasSunLight`: (`sl`: `number`) => `boolean` ; `isGreaterOrEqualThanForRGBRemove`: (`n1`: `number`, `n2`: `number`) => `boolean` ; `isGreaterOrEqualThanForSunRemove`: (`n1`: `number`, `sl`: `number`) => `boolean` ; `isLessThanForRGBAdd`: (`n1`: `number`, `n2`: `number`) => `boolean` ; `isLessThanForRGBRemove`: (`n1`: `number`, `n2`: `number`) => `boolean` ; `isLessThanForSunAdd`: (`n1`: `number`, `n2`: `number`) => `boolean` ; `isLessThanForSunAddDown`: (`n1`: `number`, `n2`: `number`) => `boolean` ; `isLessThanForSunAddUp`: (`n1`: `number`, `n2`: `number`) => `boolean` ; `isLessThanForSunRemove`: (`n1`: `number`, `sl`: `number`) => `boolean` ; `minusOneForAll`: (`sl`: `number`) => `number` ; `mixLight`: (`l1`: `number`, `l2`: `number`) => `number` ; `removeRGBLight`: (`sl`: `number`) => `number` ; `removeS`: (`sl`: `number`) => `number` ; `removeSunLight`: (`sl`: `number`) => `number` ; `setB`: (`value`: `number`, `sl`: `number`) => `number` ; `setG`: (`value`: `number`, `sl`: `number`) => `number` ; `setLightValues`: (`values`: `number`[]) => `number` ; `setR`: (`value`: `number`, `sl`: `number`) => `number` ; `setRGB`: (`value`: `number`, `sl`: `number`) => `number` ; `setS`: (`value`: `number`, `sl`: `number`) => `number` ; `sunLightCompareForDownSunRemove`: (`n1`: `number`, `sl`: `number`) => `boolean`  } |
| `lightData.SRS` | `number` |
| `lightData._lightValues` | [s: number, r: number, g: number, b: number] |
| `lightData.decodeLightFromVoxelData` | [object Object] |
| `lightData.encodeLightIntoVoxelData` | [object Object] |
| `lightData.getB` | [object Object] |
| `lightData.getFullSunLight` | [object Object] |
| `lightData.getG` | [object Object] |
| `lightData.getLightValues` | [object Object] |
| `lightData.getMinusOneForRGB` | [object Object] |
| `lightData.getMinusOneForSun` | [object Object] |
| `lightData.getR` | [object Object] |
| `lightData.getRGB` | [object Object] |
| `lightData.getS` | [object Object] |
| `lightData.getSunLightForUnderVoxel` | [object Object] |
| `lightData.hasRGBLight` | [object Object] |
| `lightData.hasSunLight` | [object Object] |
| `lightData.isGreaterOrEqualThanForRGBRemove` | [object Object] |
| `lightData.isGreaterOrEqualThanForSunRemove` | [object Object] |
| `lightData.isLessThanForRGBAdd` | [object Object] |
| `lightData.isLessThanForRGBRemove` | [object Object] |
| `lightData.isLessThanForSunAdd` | [object Object] |
| `lightData.isLessThanForSunAddDown` | [object Object] |
| `lightData.isLessThanForSunAddUp` | [object Object] |
| `lightData.isLessThanForSunRemove` | [object Object] |
| `lightData.minusOneForAll` | [object Object] |
| `lightData.mixLight` | [object Object] |
| `lightData.removeRGBLight` | [object Object] |
| `lightData.removeS` | [object Object] |
| `lightData.removeSunLight` | [object Object] |
| `lightData.setB` | [object Object] |
| `lightData.setG` | [object Object] |
| `lightData.setLightValues` | [object Object] |
| `lightData.setR` | [object Object] |
| `lightData.setRGB` | [object Object] |
| `lightData.setS` | [object Object] |
| `lightData.sunLightCompareForDownSunRemove` | [object Object] |
| `setDimension` | (`dimension`: `string`) => `void` |

#### Defined in

[divinevoxel/foundation/src/Default/Propagation/Illumanation/IlluminationManager.ts:6](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Propagation/Illumanation/IlluminationManager.ts#L6)
