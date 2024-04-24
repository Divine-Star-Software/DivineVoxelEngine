---
id: "Defaults_Foundation_PBR_LevelParticles.LevelParticles"
title: "Class: LevelParticles"
sidebar_label: "LevelParticles"
custom_edit_url: null
---

[Defaults/Foundation/PBR/LevelParticles](../modules/Defaults_Foundation_PBR_LevelParticles.md).LevelParticles

## Constructors

### constructor

• **new LevelParticles**(): [`LevelParticles`](Defaults_Foundation_PBR_LevelParticles.LevelParticles.md)

#### Returns

[`LevelParticles`](Defaults_Foundation_PBR_LevelParticles.LevelParticles.md)

## Properties

### activeParticles

▪ `Static` **activeParticles**: `ParticleSystem` \| `GPUParticleSystem`

#### Defined in

[divinevoxel/babylon-renderer/src/Defaults/Foundation/PBR/LevelParticles.ts:16](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Defaults/Foundation/PBR/LevelParticles.ts#L16)

___

### emitter

▪ `Static` **emitter**: `Mesh`

#### Defined in

[divinevoxel/babylon-renderer/src/Defaults/Foundation/PBR/LevelParticles.ts:15](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Defaults/Foundation/PBR/LevelParticles.ts#L15)

___

### particle

▪ `Static` **particle**: `ParticleSystem` \| `GPUParticleSystem`

#### Defined in

[divinevoxel/babylon-renderer/src/Defaults/Foundation/PBR/LevelParticles.ts:14](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Defaults/Foundation/PBR/LevelParticles.ts#L14)

___

### scene

▪ `Static` **scene**: `Scene`

#### Defined in

[divinevoxel/babylon-renderer/src/Defaults/Foundation/PBR/LevelParticles.ts:18](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Defaults/Foundation/PBR/LevelParticles.ts#L18)

___

### texture

▪ `Static` **texture**: `Texture`

#### Defined in

[divinevoxel/babylon-renderer/src/Defaults/Foundation/PBR/LevelParticles.ts:17](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Defaults/Foundation/PBR/LevelParticles.ts#L17)

## Methods

### \_getParticleSystem

▸ **_getParticleSystem**(): `ParticleSystem` \| `GPUParticleSystem`

#### Returns

`ParticleSystem` \| `GPUParticleSystem`

#### Defined in

[divinevoxel/babylon-renderer/src/Defaults/Foundation/PBR/LevelParticles.ts:44](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Defaults/Foundation/PBR/LevelParticles.ts#L44)

___

### init

▸ **init**(`scene`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `scene` | `Scene` |

#### Returns

`void`

#### Defined in

[divinevoxel/babylon-renderer/src/Defaults/Foundation/PBR/LevelParticles.ts:19](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Defaults/Foundation/PBR/LevelParticles.ts#L19)

___

### start

▸ **start**(`color1`, `color2?`, `colorDead?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `color1` | `Color4` | `undefined` |
| `color2` | `Color4` | `color1` |
| `colorDead` | `Color4` | `color1` |

#### Returns

`void`

#### Defined in

[divinevoxel/babylon-renderer/src/Defaults/Foundation/PBR/LevelParticles.ts:126](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Defaults/Foundation/PBR/LevelParticles.ts#L126)

___

### stop

▸ **stop**(): `void`

#### Returns

`void`

#### Defined in

[divinevoxel/babylon-renderer/src/Defaults/Foundation/PBR/LevelParticles.ts:141](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/babylon-renderer/src/Defaults/Foundation/PBR/LevelParticles.ts#L141)
