---
id: "DVEBRFOManger.DVEBRFOManager"
title: "Class: DVEBRFOManager"
sidebar_label: "DVEBRFOManager"
custom_edit_url: null
---

[DVEBRFOManger](../modules/DVEBRFOManger.md).DVEBRFOManager

## Hierarchy

- `DVEFOManager`

  ↳ **`DVEBRFOManager`**

## Constructors

### constructor

• **new DVEBRFOManager**(`scene`): [`DVEBRFOManager`](DVEBRFOManger.DVEBRFOManager.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `scene` | [`DVEBRScene`](Scene_DVEBRScene.DVEBRScene.md) |

#### Returns

[`DVEBRFOManager`](DVEBRFOManger.DVEBRFOManager.md)

#### Overrides

DVEFOManager.constructor

#### Defined in

[divinevoxel/babylon-renderer/src/DVEBRFOManger.ts:15](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/DVEBRFOManger.ts#L15)

## Properties

### activeCamera

• **activeCamera**: ``null`` \| `TransformNode` = `null`

#### Defined in

[divinevoxel/babylon-renderer/src/DVEBRFOManger.ts:9](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/DVEBRFOManger.ts#L9)

___

### activeNode

• **activeNode**: ``null`` \| `TransformNode` = `null`

#### Defined in

[divinevoxel/babylon-renderer/src/DVEBRFOManger.ts:10](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/DVEBRFOManger.ts#L10)

___

### onOriginSet

• **onOriginSet**: `Function`[] = `[]`

#### Defined in

[divinevoxel/babylon-renderer/src/DVEBRFOManger.ts:11](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/DVEBRFOManger.ts#L11)

___

### scene

• **scene**: [`DVEBRScene`](Scene_DVEBRScene.DVEBRScene.md)

#### Inherited from

DVEFOManager.scene

#### Defined in

[divinevoxel/babylon-renderer/src/DVEBRFOManger.ts:15](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/DVEBRFOManger.ts#L15)

___

### uriNode

• **uriNode**: [`DVEBRNode`](Meshes_DVEBRNode.DVEBRNode.md)

#### Defined in

[divinevoxel/babylon-renderer/src/DVEBRFOManger.ts:13](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/DVEBRFOManger.ts#L13)

## Methods

### getActiveNode

▸ **getActiveNode**(): ``null`` \| `URINode`\<`TransformNode`\>

#### Returns

``null`` \| `URINode`\<`TransformNode`\>

#### Overrides

DVEFOManager.getActiveNode

#### Defined in

[divinevoxel/babylon-renderer/src/DVEBRFOManger.ts:22](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/DVEBRFOManger.ts#L22)

___

### registerOnOriginSet

▸ **registerOnOriginSet**(`run`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `run` | (`node`: `TransformNode`) => `void` |

#### Returns

`void`

#### Defined in

[divinevoxel/babylon-renderer/src/DVEBRFOManger.ts:19](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/DVEBRFOManger.ts#L19)

___

### setOriginCenter

▸ **setOriginCenter**(`scene`, `object`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `scene` | `Scene` |
| `object` | `Object` |
| `object.position` | `Vector3` |

#### Returns

`void`

#### Defined in

[divinevoxel/babylon-renderer/src/DVEBRFOManger.ts:27](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/DVEBRFOManger.ts#L27)
