---
id: "Default_IWG_World_Load_LoaderBase.IWGLoadBase"
title: "Class: IWGLoadBase"
sidebar_label: "IWGLoadBase"
custom_edit_url: null
---

[Default/IWG/World/Load/LoaderBase](../modules/Default_IWG_World_Load_LoaderBase.md).IWGLoadBase

## Hierarchy

- **`IWGLoadBase`**

  ↳ [`IWGInitalLoad`](Default_IWG_World_Load_InitLoad.IWGInitalLoad.md)

  ↳ [`IWGSafeExit`](Default_IWG_World_Load_SafeExit.IWGSafeExit.md)

  ↳ [`IWGTeleport`](Default_IWG_World_Load_Teleport.IWGTeleport.md)

## Constructors

### constructor

• **new IWGLoadBase**(`gen`): [`IWGLoadBase`](Default_IWG_World_Load_LoaderBase.IWGLoadBase.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `gen` | [`Generator`](Default_IWG_World_Classes_Generator.Generator.md) |

#### Returns

[`IWGLoadBase`](Default_IWG_World_Load_LoaderBase.IWGLoadBase.md)

#### Defined in

[divinevoxel/foundation/src/Default/IWG/World/Load/LoaderBase.ts:10](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/IWG/World/Load/LoaderBase.ts#L10)

## Properties

### gen

• **gen**: [`Generator`](Default_IWG_World_Classes_Generator.Generator.md)

#### Defined in

[divinevoxel/foundation/src/Default/IWG/World/Load/LoaderBase.ts:10](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/IWG/World/Load/LoaderBase.ts#L10)

___

### settings

• **settings**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `doSaveUpate` | `boolean` |
| `doSearchUpdate` | `boolean` |
| `doWorldGenUpdate` | `boolean` |
| `timeout` | `number` |

#### Defined in

[divinevoxel/foundation/src/Default/IWG/World/Load/LoaderBase.ts:4](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/IWG/World/Load/LoaderBase.ts#L4)

## Methods

### \_getTotalInProgress

▸ **_getTotalInProgress**(`types`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `types` | [`IWGTasksTypes`](../modules/Default_IWG_World_Types_IWG_types.md#iwgtaskstypes)[] |

#### Returns

`number`

#### Defined in

[divinevoxel/foundation/src/Default/IWG/World/Load/LoaderBase.ts:22](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/IWG/World/Load/LoaderBase.ts#L22)

___

### \_getTotalTasks

▸ **_getTotalTasks**(`types`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `types` | [`IWGTasksTypes`](../modules/Default_IWG_World_Types_IWG_types.md#iwgtaskstypes)[] |

#### Returns

`number`

#### Defined in

[divinevoxel/foundation/src/Default/IWG/World/Load/LoaderBase.ts:12](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/IWG/World/Load/LoaderBase.ts#L12)

___

### \_waitTillAllTasksAreDone

▸ **_waitTillAllTasksAreDone**(`type`, `onCheck?`): `Promise`\<`unknown`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | [`IWGTasksTypes`](../modules/Default_IWG_World_Types_IWG_types.md#iwgtaskstypes)[] |
| `onCheck` | `Function` |

#### Returns

`Promise`\<`unknown`\>

#### Defined in

[divinevoxel/foundation/src/Default/IWG/World/Load/LoaderBase.ts:32](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/IWG/World/Load/LoaderBase.ts#L32)

___

### run

▸ **run**(`onCheck`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `onCheck` | (`gen`: [`Generator`](Default_IWG_World_Classes_Generator.Generator.md)) => `void` |

#### Returns

`Promise`\<`void`\>

#### Defined in

[divinevoxel/foundation/src/Default/IWG/World/Load/LoaderBase.ts:59](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/IWG/World/Load/LoaderBase.ts#L59)
