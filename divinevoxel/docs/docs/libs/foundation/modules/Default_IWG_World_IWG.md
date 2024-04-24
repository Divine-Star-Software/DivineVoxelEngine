---
id: "Default_IWG_World_IWG"
title: "Module: Default/IWG/World/IWG"
sidebar_label: "Default/IWG/World/IWG"
sidebar_position: 0
custom_edit_url: null
---

## Variables

### IWG

• `Const` **IWG**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `generators` | `Map`\<`string`, [`Generator`](../classes/Default_IWG_World_Classes_Generator.Generator.md)\> |
| `inProgressMap` | \{ `map`: `Map`\<`string`, `string`\> ; `add`: (`x`: `number`, `y`: `number`, `z`: `number`, `tasks`: `string`) => `void` ; `has`: (`x`: `number`, `y`: `number`, `z`: `number`) => `boolean` ; `remove`: (`x`: `number`, `y`: `number`, `z`: `number`) => `boolean`  } |
| `inProgressMap.map` | `Map`\<`string`, `string`\> |
| `inProgressMap.add` | [object Object] |
| `inProgressMap.has` | [object Object] |
| `inProgressMap.remove` | [object Object] |
| `tasks` | `Record`\<[`IWGTasksTypes`](Default_IWG_World_Types_IWG_types.md#iwgtaskstypes), `Map`\<`string`, [`IWGTasksData`](Default_IWG_World_Types_IWG_types.md#iwgtasksdata)\>\> |
| `addGenerator` | (`data`: [`IWGGeneratorData`](Default_IWG_World_Types_IWG_types.md#iwggeneratordata)) => [`Generator`](../classes/Default_IWG_World_Classes_Generator.Generator.md) |
| `getGenerator` | (`id`: `string`) => ``false`` \| [`Generator`](../classes/Default_IWG_World_Classes_Generator.Generator.md) |
| `getKey` | (`x`: `number`, `y`: `number`, `z`: `number`) => `any` |
| `initalLoad` | (`dimension`: `string`, `position`: `Vec3Array`, `settings`: [`IWGSettignsData`](Default_IWG_World_Types_IWG_types.md#iwgsettignsdata), `onCheck`: (`gen`: [`Generator`](../classes/Default_IWG_World_Classes_Generator.Generator.md)) => `void`) => `Promise`\<`void`\> |
| `registerTasks` | (`type`: [`IWGTasksTypes`](Default_IWG_World_Types_IWG_types.md#iwgtaskstypes), `tasksData`: [`IWGTasksData`](Default_IWG_World_Types_IWG_types.md#iwgtasksdata)) => `void` |
| `removeGenerator` | (`id`: `string`) => `boolean` |
| `safeExit` | (`genId`: `string`, `onCheck`: (`gen`: [`Generator`](../classes/Default_IWG_World_Classes_Generator.Generator.md)) => `void`) => `Promise`\<`undefined` \| ``false``\> |
| `saveUpdate` | (`max`: `number`) => `void` |
| `searchUpdate` | () => `void` |
| `teleport` | (`genId`: `string`, `location`: `LocationData`, `onCheck`: (`gen`: [`Generator`](../classes/Default_IWG_World_Classes_Generator.Generator.md)) => `void`) => `Promise`\<`undefined` \| ``false``\> |
| `worldGenUpdate` | (`max`: `number`) => `void` |

#### Defined in

[divinevoxel/foundation/src/Default/IWG/World/IWG.ts:16](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/IWG/World/IWG.ts#L16)
