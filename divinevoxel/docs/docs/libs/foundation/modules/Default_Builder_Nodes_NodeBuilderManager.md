---
id: "Default_Builder_Nodes_NodeBuilderManager"
title: "Module: Default/Builder/Nodes/NodeBuilderManager"
sidebar_label: "Default/Builder/Nodes/NodeBuilderManager"
sidebar_position: 0
custom_edit_url: null
---

## Variables

### NodeBuilderManager

• `Const` **NodeBuilderManager**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `builders` | `Map`\<`string`, [`NodeBuilder`](../classes/Default_Builder_Nodes_Classes_NodeBuilder.NodeBuilder.md)\> |
| `buildNode` | (`data`: [`BuildNodeMesh`](Default_Builder_Tasks_BuidlerTasks_types.md#buildnodemesh)) => ``false`` \| [[`SetNodeMesh`](Default_Builder_Tasks_BuidlerTasks_types.md#setnodemesh), `ArrayBuffer`[]] |
| `registerBuilder` | (`builder`: [`NodeBuilder`](../classes/Default_Builder_Nodes_Classes_NodeBuilder.NodeBuilder.md)) => `void` |

#### Defined in

[divinevoxel/foundation/src/Default/Builder/Nodes/NodeBuilderManager.ts:7](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Default/Builder/Nodes/NodeBuilderManager.ts#L7)
