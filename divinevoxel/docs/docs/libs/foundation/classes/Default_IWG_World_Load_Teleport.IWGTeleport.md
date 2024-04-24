---
id: "Default_IWG_World_Load_Teleport.IWGTeleport"
title: "Class: IWGTeleport"
sidebar_label: "IWGTeleport"
custom_edit_url: null
---

[Default/IWG/World/Load/Teleport](../modules/Default_IWG_World_Load_Teleport.md).IWGTeleport

## Hierarchy

- [`IWGLoadBase`](Default_IWG_World_Load_LoaderBase.IWGLoadBase.md)

  ↳ **`IWGTeleport`**

## Constructors

### constructor

• **new IWGTeleport**(`gen`, `teleportLocation`): [`IWGTeleport`](Default_IWG_World_Load_Teleport.IWGTeleport.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `gen` | [`Generator`](Default_IWG_World_Classes_Generator.Generator.md) |
| `teleportLocation` | `LocationData` |

#### Returns

[`IWGTeleport`](Default_IWG_World_Load_Teleport.IWGTeleport.md)

#### Overrides

[IWGLoadBase](Default_IWG_World_Load_LoaderBase.IWGLoadBase.md).[constructor](Default_IWG_World_Load_LoaderBase.IWGLoadBase.md#constructor)

#### Defined in

[divinevoxel/foundation/src/Default/IWG/World/Load/Teleport.ts:8](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/IWG/World/Load/Teleport.ts#L8)

## Properties

### gen

• **gen**: [`Generator`](Default_IWG_World_Classes_Generator.Generator.md)

#### Inherited from

[IWGLoadBase](Default_IWG_World_Load_LoaderBase.IWGLoadBase.md).[gen](Default_IWG_World_Load_LoaderBase.IWGLoadBase.md#gen)

#### Defined in

[divinevoxel/foundation/src/Default/IWG/World/Load/Teleport.ts:8](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/IWG/World/Load/Teleport.ts#L8)

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

___

### teleportLocation

• **teleportLocation**: `LocationData`

#### Defined in

[divinevoxel/foundation/src/Default/IWG/World/Load/Teleport.ts:8](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/IWG/World/Load/Teleport.ts#L8)

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

[divinevoxel/foundation/src/Default/IWG/World/Load/Teleport.ts:11](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/IWG/World/Load/Teleport.ts#L11)
