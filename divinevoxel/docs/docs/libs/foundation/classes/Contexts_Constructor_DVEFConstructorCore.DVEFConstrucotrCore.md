---
id: "Contexts_Constructor_DVEFConstructorCore.DVEFConstrucotrCore"
title: "Class: DVEFConstrucotrCore"
sidebar_label: "DVEFConstrucotrCore"
custom_edit_url: null
---

[Contexts/Constructor/DVEFConstructorCore](../modules/Contexts_Constructor_DVEFConstructorCore.md).DVEFConstrucotrCore

## Hierarchy

- `DVEConstructorCore`

  ↳ **`DVEFConstrucotrCore`**

## Constructors

### constructor

• **new DVEFConstrucotrCore**(`data`): [`DVEFConstrucotrCore`](Contexts_Constructor_DVEFConstructorCore.DVEFConstrucotrCore.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`DVEFConstrucotrCoreInitData`](../modules/Contexts_Constructor_DVEFConstructorCore.md#dvefconstrucotrcoreinitdata) |

#### Returns

[`DVEFConstrucotrCore`](Contexts_Constructor_DVEFConstructorCore.DVEFConstrucotrCore.md)

#### Overrides

DVEConstructorCore.constructor

#### Defined in

[divinevoxel/foundation/src/Contexts/Constructor/DVEFConstructorCore.ts:25](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/Constructor/DVEFConstructorCore.ts#L25)

## Properties

### analyzer

• **analyzer**: [`DVEAnaylzer`](Interfaces_Anaylzer_DVEAnaylzer.DVEAnaylzer.md)

#### Defined in

[divinevoxel/foundation/src/Contexts/Constructor/DVEFConstructorCore.ts:24](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/Constructor/DVEFConstructorCore.ts#L24)

___

### builder

• **builder**: [`DVEBuilder`](Interfaces_Builder_DVEBuilder.DVEBuilder.md)

#### Defined in

[divinevoxel/foundation/src/Contexts/Constructor/DVEFConstructorCore.ts:22](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/Constructor/DVEFConstructorCore.ts#L22)

___

### data

• **data**: [`DVEFDataCore`](Data_DVEFDataCore.DVEFDataCore.md)

#### Overrides

DVEConstructorCore.data

#### Defined in

[divinevoxel/foundation/src/Contexts/Constructor/DVEFConstructorCore.ts:20](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/Constructor/DVEFConstructorCore.ts#L20)

___

### propagation

• **propagation**: [`DVEPropagation`](Interfaces_Propagation_DVEPropagation.DVEPropagation.md)

#### Defined in

[divinevoxel/foundation/src/Contexts/Constructor/DVEFConstructorCore.ts:23](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/Constructor/DVEFConstructorCore.ts#L23)

___

### threads

• **threads**: [`DVEFConstructorThreads`](Contexts_Constructor_DVEFConstructorThreads.DVEFConstructorThreads.md)

#### Overrides

DVEConstructorCore.threads

#### Defined in

[divinevoxel/foundation/src/Contexts/Constructor/DVEFConstructorCore.ts:19](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/Constructor/DVEFConstructorCore.ts#L19)

___

### worldGen

• **worldGen**: `Object` = `WorldGeneration`

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
| `worldGen` | ``null`` \| [`WorldGenInterface`](../modules/Interfaces_WorldGen_WorldGen_types.md#worldgeninterface) |
| `generate` | (`data`: [`GenerateTasks`](../modules/Types_Tasks_types.md#generatetasks), `mode`: ``"generate"`` \| ``"decorate"``, `onDone`: `Function`) => `Promise`\<`void`\> |
| `getBrush` | () => [`WorldGenBrush`](Contexts_Constructor_Tools_WorldGenBrush.WorldGenBrush.md) |
| `setWorldGen` | (`worldGen`: [`WorldGenInterface`](../modules/Interfaces_WorldGen_WorldGen_types.md#worldgeninterface)) => `void` |

#### Defined in

[divinevoxel/foundation/src/Contexts/Constructor/DVEFConstructorCore.ts:21](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/Constructor/DVEFConstructorCore.ts#L21)

___

### instance

▪ `Static` **instance**: [`DVEFConstrucotrCore`](Contexts_Constructor_DVEFConstructorCore.DVEFConstrucotrCore.md)

#### Defined in

[divinevoxel/foundation/src/Contexts/Constructor/DVEFConstructorCore.ts:17](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/Constructor/DVEFConstructorCore.ts#L17)

## Methods

### init

▸ **init**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Overrides

DVEConstructorCore.init

#### Defined in

[divinevoxel/foundation/src/Contexts/Constructor/DVEFConstructorCore.ts:34](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Contexts/Constructor/DVEFConstructorCore.ts#L34)
