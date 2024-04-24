---
id: "Data_Settings_EngineSettings"
title: "Module: Data/Settings/EngineSettings"
sidebar_label: "Data/Settings/EngineSettings"
sidebar_position: 0
custom_edit_url: null
---

## Variables

### EngineSettings

• `Const` **EngineSettings**: `Object`

# Engine Settings
---
Handles common settings for all contexts

#### Type declaration

| Name | Type |
| :------ | :------ |
| `enviorment` | `string` |
| `settings` | [`EngineSettingsData`](Types_EngineSettings_types.md#enginesettingsdata) |
| `__syncWithObjects` | () => `void` |
| `doFlow` | () => `boolean` |
| `doLight` | () => `boolean` |
| `doRGBPropagation` | () => `boolean` |
| `doSunPropagation` | () => `boolean` |
| `getSettings` | () => [`EngineSettingsData`](Types_EngineSettings_types.md#enginesettingsdata) |
| `getSettingsCopy` | () => `any` |
| `isClient` | () => `boolean` |
| `isServer` | () => `boolean` |
| `richDataEnabled` | () => `boolean` |
| `saveWorldData` | () => `boolean` |
| `syncChunkInDataThread` | () => `boolean` |
| `syncChunkInFXThread` | () => `boolean` |
| `syncChunkInRichWorldThread` | () => `boolean` |
| `syncChunksInNexusThread` | () => `boolean` |
| `syncSettings` | (`data`: [`EngineSettingsData`](Types_EngineSettings_types.md#enginesettingsdata)) => `void` |
| `syncWithWorldBounds` | (`worldBounds`: \{ `bounds`: \{ `MaxX`: `number` = Infinity; `MaxY`: `number` = 256; `MaxZ`: `number` = Infinity; `MinX`: `number` = -Infinity; `MinY`: `number` = 0; `MinZ`: `number` = -Infinity } ; `setWorldBounds`: (`minX`: `number`, `maxX`: `number`, `minZ`: `number`, `maxZ`: `number`, `minY`: `number`, `maxY`: `number`) => `void`  }) => `void` |

#### Defined in

[divinevoxel/core/src/Data/Settings/EngineSettings.ts:10](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Data/Settings/EngineSettings.ts#L10)
