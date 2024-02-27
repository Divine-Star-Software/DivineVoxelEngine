#ifndef DVEKernelBridge_Module
#define DVEKernelBridge_Module
#include "./DVE/DVEKernel.hpp"
#include "./libs/dbo/DBO.hpp"

DBO dbo;
DVEKernel DVE;

class DVEBridge
{

public:
    static VoxelLocation DBO_TO_LOCATION(std::vector<uint8_t> *buffer)
    {
        DataView *view = new DataView(buffer);
        auto object = dbo.bufferToDBO.create(view);
        auto array = object->array();
        return VoxelLocation(
            array->at(0)->string(),
            array->at(1)->float32(),
            array->at(2)->float32(),
            array->at(3)->float32());
    }

    /**
     PROPAGATION
    */

    static void PROPAGATION_RUN_WORLD_SUN_LIGHT(VoxelLocation location)
    {
        DVE.propagation->illumanation->runWorldSun(location);
    }
    static void PROPAGATION_REMOVE_RGB_LIGHT(VoxelLocation location)
    {
        DVE.propagation->illumanation->rgbRemove(location);
    }
    static void PROPAGATION_UPDATE_RGB_LIGHT(VoxelLocation location)
    {
        DVE.propagation->illumanation->rgbUpdate(location);
    }
    static void PROPAGATION_REMOVE_SUN_LIGHT(VoxelLocation location)
    {
        DVE.propagation->illumanation->sunRemove(location);
    }
    static void PROPAGATION_UPDATE_SUN_LIGHT(VoxelLocation location)
    {
        DVE.propagation->illumanation->sunUpdate(location);
    }
    /**
     VOXELS
    */
    static void SYNC_VOXEL_PALETTE(
        std::unordered_map<uint16_t, std::string> voxelPalette,
        std::unordered_map<std::string, uint16_t> voxelPaletteMap)
    {
        DVE.data->voxels->voxelPalette->setData(voxelPalette, voxelPaletteMap);
    }
    static void SYNC_VOXEL_TAGS()
    {
    }
    static void SYNC_VOXEL_SUBSTANCE_PALETTE(
        std::unordered_map<uint16_t, std::string> voxelSubstancePalette,
        std::unordered_map<std::string, uint16_t> voxelSubstancePaletteMap)
    {
        DVE.data->voxels->voxelSubstancePalette->setData(voxelSubstancePalette, voxelSubstancePaletteMap);
    }
    static void SYNC_VOXEL_SUBSTANCE_TAGS()
    {
    }
    /**
     WORLD DATA
    */

    static void SYNC_CHUNK(
        VoxelLocation location,
        std::vector<uint8_t> *stateBuffer,
        std::vector<uint16_t> *voxelIds,
        std::vector<uint16_t> *voxelLight,
        std::vector<uint16_t> *voxelState,
        std::vector<uint16_t> *voxelSecondaryIds)
    {
        Chunk *newChunk = new Chunk(stateBuffer, voxelIds, voxelLight, voxelState, voxelSecondaryIds);
        DVE.data->world->addChunk(location, newChunk);
    }
    static void UN_SYNC_CHUNK(VoxelLocation location)
    {
        DVE.data->world->removeChunk(location);
    }
    static void SYNC_CHUNK_TAGS()
    {
    }

    static void SYNC_COLUMN(VoxelLocation location, std::vector<uint8_t> *stateBuffer)
    {
        Column *newColumn = new Column(stateBuffer);
        DVE.data->world->addColumn(location, newColumn);
    }
    static void UN_SYNC_COLUMN(VoxelLocation location)
    {
        DVE.data->world->removeColumn(location);
    }
    static void SYNC_COLUMN_TAGS()
    {
    }

    static void SYNC_REGION(VoxelLocation location, std::vector<uint8_t> *stateBuffer)
    {
        Region *newRegion = new Region(stateBuffer);
        DVE.data->world->addRegion(location, newRegion);
    }
    static void UN_SYNC_REGION(VoxelLocation location)
    {
        DVE.data->world->removeRegion(location);
    }
    static void SYNC_REGION_TAGS()
    {
    }
};

#endif