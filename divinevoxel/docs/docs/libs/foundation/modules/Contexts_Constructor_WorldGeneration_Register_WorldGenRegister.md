---
id: "Contexts_Constructor_WorldGeneration_Register_WorldGenRegister"
title: "Module: Contexts/Constructor/WorldGeneration/Register/WorldGenRegister"
sidebar_label: "Contexts/Constructor/WorldGeneration/Register/WorldGenRegister"
sidebar_position: 0
custom_edit_url: null
---

## Variables

### WorldGenRegister

• `Const` **WorldGenRegister**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `MAX_ATTEMPTS` | `number` |
| `_requests` | `Map`\<`string`, \{ `attempts`: `number` ; `chunks`: `Map`\<`string`, [x: number, y: number, z: number]\> ; `dimension`: `string` ; `voxels`: [x: number, y: number, z: number, data: RawVoxelData][]  }\> |
| `addToRequest` | (`registerId`: `string`, `location`: `LocationData`, `rawData`: `RawVoxelData`) => `void` |
| `attemptRequestFullFill` | (`registerId`: `string`) => `boolean` |
| `registerRequest` | (`location`: `LocationData`) => `string` |

#### Defined in

[divinevoxel/foundation/src/Contexts/Constructor/WorldGeneration/Register/WorldGenRegister.ts:15](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/Constructor/WorldGeneration/Register/WorldGenRegister.ts#L15)
