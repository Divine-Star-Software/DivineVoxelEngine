#ifndef DVEKernelBridge_Module
#define DVEKernelBridge_Module
#include "./DVE/Kernel.hpp"
#include "./libs/dbo/DBO.hpp"
static const DVE::Kernel &kernel = DVE::Kernel::getInstance();
class DVEBridge
{

public:
    static DBO::Object dbo;
    static Binary::DataView *sabToDataView(void *buffer, int size)
    {
        std::vector<uint8_t> bufferVector(static_cast<uint8_t *>(buffer), static_cast<uint8_t *>(buffer) + size);
        Binary::DataView *view = new Binary::DataView(bufferVector);
        return view;
    }
    static std::vector<uint8_t> *sabToDataUint8Array(void *buffer, int size)
    {
        std::vector<uint8_t> *bufferVector = new std::vector<uint8_t>(static_cast<uint8_t *>(buffer), static_cast<uint8_t *>(buffer) + size);
        return bufferVector;
    }
    static std::vector<uint16_t> *sabToDataUint16Array(void *buffer, int size)
    {
        std::vector<uint16_t> *bufferVector = new std::vector<uint16_t>(static_cast<uint16_t *>(buffer), static_cast<uint16_t *>(buffer) + size);
        return bufferVector;
    }
    static DVE::VoxelLocation DBO_TO_LOCATION(Binary::DataView *view)
    {
        auto object = dbo.bufferToDBO.create(view);
        auto array = object->array();
        return DVE::VoxelLocation(
            array->at(0)->string(),
            array->at(1)->float32(),
            array->at(2)->float32(),
            array->at(3)->float32());
    }

    static void CREATE_CHUNK_TEMPLATE(DVE::VoxelLocation location)
    {
    }

    static void PROPAGATION_RUN_WORLD_SUN_LIGHT(DVE::VoxelLocation location)
    {
        //  kernel.propagation.illumanation.runWorldSun(location);
    }
    static void PROPAGATION_REMOVE_RGB_LIGHT(DVE::VoxelLocation location)
    {
        //    kernel.propagation.illumanation.rgbRemove(location);
    }
    static void PROPAGATION_UPDATE_RGB_LIGHT(DVE::VoxelLocation location)
    {
        //    kernel.propagation.illumanation.rgbUpdate(location);
    }
    static void PROPAGATION_REMOVE_SUN_LIGHT(DVE::VoxelLocation location)
    {
        ////    kernel.propagation.illumanation.sunRemove(location);
    }
    static void PROPAGATION_UPDATE_SUN_LIGHT(DVE::VoxelLocation location)
    {
        //    kernel.propagation.illumanation.sunUpdate(location);
    }

    static void SYNC_VOXEL_PALETTE(
        std::unordered_map<uint16_t, std::string> voxelPalette,
        std::unordered_map<std::string, uint16_t> voxelPaletteMap)
    {
        //     kernel.data.voxels.voxelPalette.setData(voxelPalette, voxelPaletteMap);
    }
    static void SYNC_VOXEL_TAGS()
    {
    }
    static void SYNC_VOXEL_SUBSTANCE_PALETTE(
        std::unordered_map<uint16_t, std::string> voxelSubstancePalette,
        std::unordered_map<std::string, uint16_t> voxelSubstancePaletteMap)
    {
        //    kernel.data.voxels.voxelSubstancePalette.setData(voxelSubstancePalette, voxelSubstancePaletteMap);
    }
    static void SYNC_VOXEL_SUBSTANCE_TAGS()
    {
    }

    static void SYNC_CHUNK(
        DVE::VoxelLocation location,
        std::vector<uint8_t> *stateBuffer,
        std::vector<uint16_t> *voxelIds,
        std::vector<uint16_t> *voxelLight,
        std::vector<uint16_t> *voxelState,
        std::vector<uint16_t> *voxelSecondaryIds)
    {
        DVE::Chunk *newChunk = new DVE::Chunk(stateBuffer, voxelIds, voxelLight, voxelState, voxelSecondaryIds);
        //   kernel.data.world.addChunk(location, newChunk);
    }
    static void UN_SYNC_CHUNK(DVE::VoxelLocation location)
    {
        //   kernel.data.world.removeChunk(location);
    }
    static void SYNC_CHUNK_TAGS()
    {
    }

    static void SYNC_COLUMN(DVE::VoxelLocation location, std::vector<uint8_t> *stateBuffer)
    {
        DVE::Column *newColumn = new DVE::Column(stateBuffer);
        //   kernel.data.world.addColumn(location, newColumn);
    }
    static void UN_SYNC_COLUMN(DVE::VoxelLocation location)
    {
        //    kernel.data.world.removeColumn(location);
    }
    static void SYNC_COLUMN_TAGS()
    {
    }

    static void SYNC_REGION(DVE::VoxelLocation location, std::vector<uint8_t> *stateBuffer)
    {
        DVE::Region *newRegion = new DVE::Region(stateBuffer);
        //   kernel.data.world.addRegion(location, newRegion);
    }
    static void UN_SYNC_REGION(DVE::VoxelLocation location)
    {
        //     kernel.data.world.removeRegion(location);
    }
    static void SYNC_REGION_TAGS()
    {
    }
};

#endif