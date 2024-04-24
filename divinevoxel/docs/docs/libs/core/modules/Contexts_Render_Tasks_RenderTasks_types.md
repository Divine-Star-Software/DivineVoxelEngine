---
id: "Contexts_Render_Tasks_RenderTasks_types"
title: "Module: Contexts/Render/Tasks/RenderTasks.types"
sidebar_label: "Contexts/Render/Tasks/RenderTasks.types"
custom_edit_url: null
---

## Type Aliases

### ChunkMeshData

Ƭ **ChunkMeshData**: [substanceType: VoxelTemplateSubstanceType, meshData: [location: LocationData, attributes: DVENodeMeshAttributes]]

#### Defined in

[divinevoxel/core/src/Contexts/Render/Tasks/RenderTasks.types.ts:9](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Contexts/Render/Tasks/RenderTasks.types.ts#L9)

___

### RemoveChunkMeshTasks

Ƭ **RemoveChunkMeshTasks**: [location: LocationData, substanceType: VoxelTemplateSubstanceType]

#### Defined in

[divinevoxel/core/src/Contexts/Render/Tasks/RenderTasks.types.ts:23](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Contexts/Render/Tasks/RenderTasks.types.ts#L23)

___

### RemoveChunksOutsideDistance

Ƭ **RemoveChunksOutsideDistance**: [location: LocationData, distance: number]

#### Defined in

[divinevoxel/core/src/Contexts/Render/Tasks/RenderTasks.types.ts:28](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Contexts/Render/Tasks/RenderTasks.types.ts#L28)

___

### SetChunkMeshTask

Ƭ **SetChunkMeshTask**: [location: LocationData, meshes: (ChunkMeshData \| RemoveChunkTasks)[]]

#### Defined in

[divinevoxel/core/src/Contexts/Render/Tasks/RenderTasks.types.ts:4](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Contexts/Render/Tasks/RenderTasks.types.ts#L4)
