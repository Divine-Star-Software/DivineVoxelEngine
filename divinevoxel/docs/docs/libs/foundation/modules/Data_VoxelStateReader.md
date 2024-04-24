---
id: "Data_VoxelStateReader"
title: "Module: Data/VoxelStateReader"
sidebar_label: "Data/VoxelStateReader"
sidebar_position: 0
custom_edit_url: null
---

## Variables

### VoxelStateReader

• `Const` **VoxelStateReader**: `Object`

# Voxel Reader
---
Used to decode voxel state data.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `getLevel` | (`stateData`: `number`) => `number` |
| `getLevelState` | (`stateData`: `number`) => `number` |
| `getShapeState` | (`voxelData`: `number`) => `number` |
| `setLevel` | (`stateData`: `number`, `level`: `number`) => `number` |
| `setLevelState` | (`stateData`: `number`, `levelState`: `number`) => `number` |
| `setShapeState` | (`voxelData`: `number`, `shapeState`: `number`) => `number` |

#### Defined in

[divinevoxel/foundation/src/Data/VoxelStateReader.ts:11](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Data/VoxelStateReader.ts#L11)
