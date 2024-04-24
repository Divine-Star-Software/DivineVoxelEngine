---
id: "Contexts_Constructor_WorldGeneration_WorldGeneration"
title: "Module: Contexts/Constructor/WorldGeneration/WorldGeneration"
sidebar_label: "Contexts/Constructor/WorldGeneration/WorldGeneration"
sidebar_position: 0
custom_edit_url: null
---

## Variables

### WorldGeneration

• `Const` **WorldGeneration**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `_brushes` | `any`[] |
| `register` | \{ `MAX_ATTEMPTS`: `number` = 100; `_requests`: `Map`\<`string`, \{ `attempts`: `number` ; `chunks`: `Map`\<`string`, [x: number, y: number, z: number]\> ; `dimension`: `string` ; `voxels`: [x: number, y: number, z: number, data: RawVoxelData][]  }\> ; `addToRequest`: (`registerId`: `string`, `location`: `LocationData`, `rawData`: `RawVoxelData`) => `void` ; `attemptRequestFullFill`: (`registerId`: `string`) => `boolean` ; `registerRequest`: (`location`: `LocationData`) => `string`  } |
| `register.MAX_ATTEMPTS` | `number` |
| `register._requests` | `Map`\<`string`, \{ `attempts`: `number` ; `chunks`: `Map`\<`string`, [x: number, y: number, z: number]\> ; `dimension`: `string` ; `voxels`: [x: number, y: number, z: number, data: RawVoxelData][]  }\> |
| `register.addToRequest` | [object Object] |
| `register.attemptRequestFullFill` | [object Object] |
| `register.registerRequest` | [object Object] |
| `worldBounds` | \{ `bounds`: \{ `MaxX`: `number` ; `MaxY`: `number` ; `MaxZ`: `number` ; `MinX`: `number` ; `MinY`: `number` ; `MinZ`: `number`  } ; `setWorldBounds`: (`minX`: `number`, `maxX`: `number`, `minZ`: `number`, `maxZ`: `number`, `minY`: `number`, `maxY`: `number`) => `void`  } |
| `worldBounds.bounds` | \{ `MaxX`: `number` ; `MaxY`: `number` ; `MaxZ`: `number` ; `MinX`: `number` ; `MinY`: `number` ; `MinZ`: `number`  } |
| `worldBounds.bounds.MaxX` | `number` |
| `worldBounds.bounds.MaxY` | `number` |
| `worldBounds.bounds.MaxZ` | `number` |
| `worldBounds.bounds.MinX` | `number` |
| `worldBounds.bounds.MinY` | `number` |
| `worldBounds.bounds.MinZ` | `number` |
| `worldBounds.setWorldBounds` | [object Object] |
| `worldGen` | ``null`` \| [`WorldGenInterface`](Interfaces_WorldGen_WorldGen_types.md#worldgeninterface) |
| `generate` | (`data`: [`GenerateTasks`](Types_Tasks_types.md#generatetasks), `mode`: ``"generate"`` \| ``"decorate"``, `onDone`: `Function`) => `Promise`\<`void`\> |
| `getBrush` | () => [`WorldGenBrush`](../classes/Contexts_Constructor_Tools_WorldGenBrush.WorldGenBrush.md) |
| `setWorldGen` | (`worldGen`: [`WorldGenInterface`](Interfaces_WorldGen_WorldGen_types.md#worldgeninterface)) => `void` |

#### Defined in

[divinevoxel/foundation/src/Contexts/Constructor/WorldGeneration/WorldGeneration.ts:11](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/Constructor/WorldGeneration/WorldGeneration.ts#L11)
