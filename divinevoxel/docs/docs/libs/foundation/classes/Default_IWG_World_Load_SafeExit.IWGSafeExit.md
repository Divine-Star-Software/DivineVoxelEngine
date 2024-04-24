---
id: "Default_IWG_World_Load_SafeExit.IWGSafeExit"
title: "Class: IWGSafeExit"
sidebar_label: "IWGSafeExit"
custom_edit_url: null
---

[Default/IWG/World/Load/SafeExit](../modules/Default_IWG_World_Load_SafeExit.md).IWGSafeExit

## Hierarchy

- [`IWGLoadBase`](Default_IWG_World_Load_LoaderBase.IWGLoadBase.md)

  ↳ **`IWGSafeExit`**

## Constructors

### constructor

• **new IWGSafeExit**(`gen`): [`IWGSafeExit`](Default_IWG_World_Load_SafeExit.IWGSafeExit.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `gen` | [`Generator`](Default_IWG_World_Classes_Generator.Generator.md) |

#### Returns

[`IWGSafeExit`](Default_IWG_World_Load_SafeExit.IWGSafeExit.md)

#### Inherited from

[IWGLoadBase](Default_IWG_World_Load_LoaderBase.IWGLoadBase.md).[constructor](Default_IWG_World_Load_LoaderBase.IWGLoadBase.md#constructor)

#### Defined in

[divinevoxel/foundation/src/Default/IWG/World/Load/LoaderBase.ts:10](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/IWG/World/Load/LoaderBase.ts#L10)

## Properties

### gen

• **gen**: [`Generator`](Default_IWG_World_Classes_Generator.Generator.md)

#### Inherited from

[IWGLoadBase](Default_IWG_World_Load_LoaderBase.IWGLoadBase.md).[gen](Default_IWG_World_Load_LoaderBase.IWGLoadBase.md#gen)

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

#### Inherited from

[IWGLoadBase](Default_IWG_World_Load_LoaderBase.IWGLoadBase.md).[settings](Default_IWG_World_Load_LoaderBase.IWGLoadBase.md#settings)

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

#### Inherited from

[IWGLoadBase](Default_IWG_World_Load_LoaderBase.IWGLoadBase.md).[_getTotalInProgress](Default_IWG_World_Load_LoaderBase.IWGLoadBase.md#_gettotalinprogress)

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

#### Inherited from

[IWGLoadBase](Default_IWG_World_Load_LoaderBase.IWGLoadBase.md).[_getTotalTasks](Default_IWG_World_Load_LoaderBase.IWGLoadBase.md#_gettotaltasks)

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

#### Inherited from

[IWGLoadBase](Default_IWG_World_Load_LoaderBase.IWGLoadBase.md).[_waitTillAllTasksAreDone](Default_IWG_World_Load_LoaderBase.IWGLoadBase.md#_waittillalltasksaredone)

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

#### Overrides

[IWGLoadBase](Default_IWG_World_Load_LoaderBase.IWGLoadBase.md).[run](Default_IWG_World_Load_LoaderBase.IWGLoadBase.md#run)

#### Defined in

[divinevoxel/foundation/src/Default/IWG/World/Load/SafeExit.ts:5](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/IWG/World/Load/SafeExit.ts#L5)
