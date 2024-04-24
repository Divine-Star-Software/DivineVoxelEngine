---
id: "Defaults_Foundation_Tools_NodeMeshTool.NodeMeshTool"
title: "Class: NodeMeshTool"
sidebar_label: "NodeMeshTool"
custom_edit_url: null
---

[Defaults/Foundation/Tools/NodeMeshTool](../modules/Defaults_Foundation_Tools_NodeMeshTool.md).NodeMeshTool

## Hierarchy

- `LocationBoundTool`

  ↳ **`NodeMeshTool`**

## Constructors

### constructor

• **new NodeMeshTool**(): [`NodeMeshTool`](Defaults_Foundation_Tools_NodeMeshTool.NodeMeshTool.md)

#### Returns

[`NodeMeshTool`](Defaults_Foundation_Tools_NodeMeshTool.NodeMeshTool.md)

#### Overrides

LocationBoundTool.constructor

#### Defined in

[divinevoxel/babylon-renderer/src/Defaults/Foundation/Tools/NodeMeshTool.ts:18](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Defaults/Foundation/Tools/NodeMeshTool.ts#L18)

## Properties

### location

• **location**: `LocationData`

#### Inherited from

LocationBoundTool.location

#### Defined in

divinevoxel/foundation/dist/Default/Tools/Classes/LocationBoundTool.d.ts:3

___

### texture

• **texture**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `build` | (`textureIdData`: `ConstructorTextureData`, `textureData`: `Uint8ClampedArray`, `onDone`: (`mesh`: ``false`` \| [`EntityTool`](Defaults_Foundation_Tools_EntityTool.EntityTool.md)) => `void`) => `void` |
| `buildAsync` | (`textureIdData`: `ConstructorTextureData`, `textureData`: `Uint8ClampedArray`) => `Promise`\<``false`` \| [`EntityTool`](Defaults_Foundation_Tools_EntityTool.EntityTool.md)\> |

#### Defined in

[divinevoxel/babylon-renderer/src/Defaults/Foundation/Tools/NodeMeshTool.ts:23](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Defaults/Foundation/Tools/NodeMeshTool.ts#L23)

___

### voxel

• **voxel**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `build` | (`voxelData`: `RawVoxelData`, `onDone`: (`mesh`: ``false`` \| [`EntityTool`](Defaults_Foundation_Tools_EntityTool.EntityTool.md)) => `void`) => `void` |
| `dataTool` | `DataTool` |
| `buildAsync` | (`voxelData`: `RawVoxelData`) => `Promise`\<``false`` \| [`EntityTool`](Defaults_Foundation_Tools_EntityTool.EntityTool.md)\> |

#### Defined in

[divinevoxel/babylon-renderer/src/Defaults/Foundation/Tools/NodeMeshTool.ts:68](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Defaults/Foundation/Tools/NodeMeshTool.ts#L68)

## Accessors

### dimension

• `get` **dimension**(): `string`

#### Returns

`string`

#### Inherited from

LocationBoundTool.dimension

#### Defined in

divinevoxel/foundation/dist/Default/Tools/Classes/LocationBoundTool.d.ts:4

• `set` **dimension**(`dimension`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `dimension` | `string` |

#### Returns

`void`

#### Inherited from

LocationBoundTool.dimension

#### Defined in

divinevoxel/foundation/dist/Default/Tools/Classes/LocationBoundTool.d.ts:5

___

### x

• `get` **x**(): `number`

#### Returns

`number`

#### Inherited from

LocationBoundTool.x

#### Defined in

divinevoxel/foundation/dist/Default/Tools/Classes/LocationBoundTool.d.ts:6

• `set` **x**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

#### Inherited from

LocationBoundTool.x

#### Defined in

divinevoxel/foundation/dist/Default/Tools/Classes/LocationBoundTool.d.ts:7

___

### y

• `get` **y**(): `number`

#### Returns

`number`

#### Inherited from

LocationBoundTool.y

#### Defined in

divinevoxel/foundation/dist/Default/Tools/Classes/LocationBoundTool.d.ts:8

• `set` **y**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

#### Inherited from

LocationBoundTool.y

#### Defined in

divinevoxel/foundation/dist/Default/Tools/Classes/LocationBoundTool.d.ts:9

___

### z

• `get` **z**(): `number`

#### Returns

`number`

#### Inherited from

LocationBoundTool.z

#### Defined in

divinevoxel/foundation/dist/Default/Tools/Classes/LocationBoundTool.d.ts:10

• `set` **z**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

#### Inherited from

LocationBoundTool.z

#### Defined in

divinevoxel/foundation/dist/Default/Tools/Classes/LocationBoundTool.d.ts:11

## Methods

### getLocation

▸ **getLocation**(): `LocationData`

#### Returns

`LocationData`

#### Inherited from

LocationBoundTool.getLocation

#### Defined in

divinevoxel/foundation/dist/Default/Tools/Classes/LocationBoundTool.d.ts:13

___

### getXYZ

▸ **getXYZ**(): `Object`

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |
| `z` | `number` |

#### Inherited from

LocationBoundTool.getXYZ

#### Defined in

divinevoxel/foundation/dist/Default/Tools/Classes/LocationBoundTool.d.ts:15

___

### getXYZAsArray

▸ **getXYZAsArray**(): `Vec3Array`

#### Returns

`Vec3Array`

#### Inherited from

LocationBoundTool.getXYZAsArray

#### Defined in

divinevoxel/foundation/dist/Default/Tools/Classes/LocationBoundTool.d.ts:14

___

### setDimension

▸ **setDimension**(`dimensionId`): `this`

#### Parameters

| Name | Type |
| :------ | :------ |
| `dimensionId` | `string` |

#### Returns

`this`

#### Inherited from

LocationBoundTool.setDimension

#### Defined in

divinevoxel/foundation/dist/Default/Tools/Classes/LocationBoundTool.d.ts:12

___

### setLocation

▸ **setLocation**(`location`): `this`

#### Parameters

| Name | Type |
| :------ | :------ |
| `location` | `LocationData` |

#### Returns

`this`

#### Inherited from

LocationBoundTool.setLocation

#### Defined in

divinevoxel/foundation/dist/Default/Tools/Classes/LocationBoundTool.d.ts:22

___

### setXYZ

▸ **setXYZ**(`x`, `y`, `z`): `this`

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |
| `z` | `number` |

#### Returns

`this`

#### Inherited from

LocationBoundTool.setXYZ

#### Defined in

divinevoxel/foundation/dist/Default/Tools/Classes/LocationBoundTool.d.ts:20

___

### setXZ

▸ **setXZ**(`x`, `z`): `this`

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `z` | `number` |

#### Returns

`this`

#### Inherited from

LocationBoundTool.setXZ

#### Defined in

divinevoxel/foundation/dist/Default/Tools/Classes/LocationBoundTool.d.ts:21
