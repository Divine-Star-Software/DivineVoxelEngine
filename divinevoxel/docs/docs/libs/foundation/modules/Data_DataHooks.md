---
id: "Data_DataHooks"
title: "Module: Data/DataHooks"
sidebar_label: "Data/DataHooks"
sidebar_position: 0
custom_edit_url: null
---

## Variables

### DataHooks

• `Const` **DataHooks**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `chunk` | \{ `onGetAsync`: `AsyncPipeline`\<\{ `chunk`: ``null`` \| [`Chunk`](../classes/Data_World_Classes_Chunk.Chunk.md) ; `location`: `LocationData`  }\> ; `onGetSync`: `Pipeline`\<\{ `chunk`: ``null`` \| [`Chunk`](../classes/Data_World_Classes_Chunk.Chunk.md) ; `location`: `LocationData`  }\> ; `onNew`: `Observable`\<`LocationData`\> ; `onRemove`: `Observable`\<`LocationData`\>  } |
| `chunk.onGetAsync` | `AsyncPipeline`\<\{ `chunk`: ``null`` \| [`Chunk`](../classes/Data_World_Classes_Chunk.Chunk.md) ; `location`: `LocationData`  }\> |
| `chunk.onGetSync` | `Pipeline`\<\{ `chunk`: ``null`` \| [`Chunk`](../classes/Data_World_Classes_Chunk.Chunk.md) ; `location`: `LocationData`  }\> |
| `chunk.onNew` | `Observable`\<`LocationData`\> |
| `chunk.onRemove` | `Observable`\<`LocationData`\> |
| `column` | \{ `onGetAsync`: `AsyncPipeline`\<\{ `column`: ``null`` \| [`Column`](../classes/Data_World_Classes_Column.Column.md) ; `location`: `LocationData`  }\> ; `onGetSync`: `Pipeline`\<\{ `column`: ``null`` \| [`Column`](../classes/Data_World_Classes_Column.Column.md) ; `location`: `LocationData`  }\> ; `onNew`: `Observable`\<`LocationData`\> ; `onRemove`: `Observable`\<`LocationData`\>  } |
| `column.onGetAsync` | `AsyncPipeline`\<\{ `column`: ``null`` \| [`Column`](../classes/Data_World_Classes_Column.Column.md) ; `location`: `LocationData`  }\> |
| `column.onGetSync` | `Pipeline`\<\{ `column`: ``null`` \| [`Column`](../classes/Data_World_Classes_Column.Column.md) ; `location`: `LocationData`  }\> |
| `column.onNew` | `Observable`\<`LocationData`\> |
| `column.onRemove` | `Observable`\<`LocationData`\> |
| `dimension` | \{ `onRegisterDimension`: `Pipeline`\<[`DimensionData`](Data_Types_DimensionData_types.md#dimensiondata)\>  } |
| `dimension.onRegisterDimension` | `Pipeline`\<[`DimensionData`](Data_Types_DimensionData_types.md#dimensiondata)\> |
| `paint` | \{ `onAddToRGBUpdate`: `Observable`\<`LocationData`\> ; `onRichVoxelPaint`: `Observable`\<[id: string, location: LocationData]\>  } |
| `paint.onAddToRGBUpdate` | `Observable`\<`LocationData`\> |
| `paint.onRichVoxelPaint` | `Observable`\<[id: string, location: LocationData]\> |
| `region` | \{ `onGetAsync`: `AsyncPipeline`\<\{ `location`: `LocationData` ; `region`: ``null`` \| [`Region`](../classes/Data_World_Classes_Region.Region.md)  }\> ; `onGetSync`: `Pipeline`\<\{ `location`: `LocationData` ; `region`: ``null`` \| [`Region`](../classes/Data_World_Classes_Region.Region.md)  }\> ; `onNew`: `Observable`\<`LocationData`\> ; `onRemove`: `Observable`\<`LocationData`\>  } |
| `region.onGetAsync` | `AsyncPipeline`\<\{ `location`: `LocationData` ; `region`: ``null`` \| [`Region`](../classes/Data_World_Classes_Region.Region.md)  }\> |
| `region.onGetSync` | `Pipeline`\<\{ `location`: `LocationData` ; `region`: ``null`` \| [`Region`](../classes/Data_World_Classes_Region.Region.md)  }\> |
| `region.onNew` | `Observable`\<`LocationData`\> |
| `region.onRemove` | `Observable`\<`LocationData`\> |
| `settingsSynced` | `Observable`\<`EngineSettingsData`\> |

#### Defined in

[divinevoxel/foundation/src/Data/DataHooks.ts:8](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/foundation/src/Data/DataHooks.ts#L8)
