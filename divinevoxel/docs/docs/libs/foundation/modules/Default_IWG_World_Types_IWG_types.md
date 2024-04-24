---
id: "Default_IWG_World_Types_IWG_types"
title: "Module: Default/IWG/World/Types/IWG.types"
sidebar_label: "Default/IWG/World/Types/IWG.types"
custom_edit_url: null
---

## Type Aliases

### IWGGeneratorData

Ƭ **IWGGeneratorData**: \{ `id`: `string` ; `positionWatch`: `number`[] \| `Float32Array` \| `Float64Array` \| `Int32Array` \| `Int16Array`  } & [`IWGSettignsData`](Default_IWG_World_Types_IWG_types.md#iwgsettignsdata)

#### Defined in

[divinevoxel/foundation/src/Default/IWG/World/Types/IWG.types.ts:3](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/IWG/World/Types/IWG.types.ts#L3)

___

### IWGSettignsData

Ƭ **IWGSettignsData**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `anaylzerDistance?` | `number` |
| `generateDistance` | `number` |
| `maxDistance?` | `number` |
| `renderDistance` | `number` |
| `saveWorldData?` | `boolean` |

#### Defined in

[divinevoxel/foundation/src/Default/IWG/World/Types/IWG.types.ts:15](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/IWG/World/Types/IWG.types.ts#L15)

___

### IWGTasksData

Ƭ **IWGTasksData**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `name` | `string` |
| `propagationBlocking?` | `boolean` |
| `run` | (`generator`: [`Generator`](../classes/Default_IWG_World_Classes_Generator.Generator.md), `x`: `number`, `y`: `number`, `z`: `number`, `onDone`: `Function`) => `void` |

#### Defined in

[divinevoxel/foundation/src/Default/IWG/World/Types/IWG.types.ts:23](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/IWG/World/Types/IWG.types.ts#L23)

___

### IWGTasksTypes

Ƭ **IWGTasksTypes**: ``"world-gen"`` \| ``"saving"`` \| ``"updating"``

#### Defined in

[divinevoxel/foundation/src/Default/IWG/World/Types/IWG.types.ts:37](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/IWG/World/Types/IWG.types.ts#L37)
