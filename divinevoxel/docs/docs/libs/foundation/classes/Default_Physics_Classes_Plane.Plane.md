---
id: "Default_Physics_Classes_Plane.Plane"
title: "Class: Plane"
sidebar_label: "Plane"
custom_edit_url: null
---

[Default/Physics/Classes/Plane](../modules/Default_Physics_Classes_Plane.md).Plane

## Constructors

### constructor

• **new Plane**(): [`Plane`](Default_Physics_Classes_Plane.Plane.md)

#### Returns

[`Plane`](Default_Physics_Classes_Plane.Plane.md)

## Properties

### dimensions

• **dimensions**: `Vector3`

#### Defined in

[divinevoxel/foundation/src/Default/Physics/Classes/Plane.ts:5](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Physics/Classes/Plane.ts#L5)

___

### normal

• **normal**: `Vector3`

#### Defined in

[divinevoxel/foundation/src/Default/Physics/Classes/Plane.ts:6](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Physics/Classes/Plane.ts#L6)

## Methods

### lineToPlane

▸ **lineToPlane**(`line`): `number`

# Line To Plane

#### Parameters

| Name | Type |
| :------ | :------ |
| `line` | [`Line`](Default_Physics_Classes_Line.Line.md) |

#### Returns

`number`

a value between 0 and 1.

1 meaning there was no collision
and 0.5 meaning there was collision at the halfway mark of the bouding box.

#### Defined in

[divinevoxel/foundation/src/Default/Physics/Classes/Plane.ts:20](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Physics/Classes/Plane.ts#L20)

___

### update

▸ **update**(`dimensions`, `normal`): [`Plane`](Default_Physics_Classes_Plane.Plane.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `dimensions` | `Vector3` |
| `normal` | `Vector3` |

#### Returns

[`Plane`](Default_Physics_Classes_Plane.Plane.md)

#### Defined in

[divinevoxel/foundation/src/Default/Physics/Classes/Plane.ts:8](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Physics/Classes/Plane.ts#L8)
