#include <variant>
#include <iostream>
#include <string>
#include <cstdio>
#include "./libs/binary/DataView.hpp"
#include "./libs/dbo/DBO.hpp"

#include "./DVEKernelBridge.hpp"

// data sync

extern "C"
{
    /*
    TASKS
    */
    void DVE_BRIDGE_RUN_WORLD_SUN_LIGHT(void *locationBuffer)
    {
    }
    void DVE_BRIDGE_REMOVE_RGB_LIGHT(void *locationBuffer)
    {
    }
    void DVE_BRIDGE_UPDATE_RGB_LIGHT(void *locationBuffer)
    {
    }
    void DVE_BRIDGE_REMOVE_SUN_LIGHT(void *locationBuffer)
    {
    }
    void DVE_BRIDGE_UPDATE_SUN_LIGHT(void *locationBuffer)
    {
    }
    /*
    VOXELS
    */
    void DVE_BRIDGE_SYNC_VOXEL_TAGS(void *tagDataBuffer, void *tagBuffer)
    {
    }
    void DVE_BRIDGE_SYNC_VOXEL_PALETTE(void *paletteBuffer, void *paletteMapBuffer)
    {
    }
    void DVE_BRIDGE_SYNC_VOXEL_SUBSTANCE_PALETTE(void *paletteBuffer, void *paletteMapBuffer)
    {
    }
    void DVE_BRIDGE_SYNC_VOXEL_SUBSTANCE_TAGS(void *tagDataBuffer, void *tagBuffer)
    {
    }

    /*
    CHUNKS
    */
    void DVE_BRIDGE_SYNC_CHUNK_TAGS(void *tagDataBuffer, void *tagBuffer)
    {
    }
    void DVE_BRIDGE_SYNC_CHUNK(
        void *locationBuffer,
        void *stateBuffer,
        void *voxelIdsBuffer,
        void *voxelLightBuffer,
        void *voxelStateBuffer,
        void *voxelSecondaryIdBuffer)
    {
    }
    void DVE_BRIDGE_UN_SYNC_CHUNK(void *locationBuffer)
    {
    }

    /*
    COLUMNS
    */
    void DVE_BRIDGE_SYNC_COLUMN_TAGS(void *tagDataBuffer, void *tagBuffer)
    {
    }
    void DVE_BRIDGE_SYNC_COLUMN(void *locationBuffer, void *stateBuffer)
    {
    }
    void DVE_BRIDGE_UN_SYNC_COLUMN(void *locationBuffer)
    {
    }

    /*
    REGIONS
    */
    void DVE_BRIDGE_SYNC_REGION_TAGS(void *tagDataBuffer, void *tagBuffer)
    {
    }
    void DVE_BRIDGE_SYNC_REGION(void *locationBuffer, void *stateBuffer)
    {
    }
    void DVE_BRIDGE_UN_SYNC_REGION(void *locationBuffer)
    {
    }

    void bufferToDBO(void *buffer, int size)
    {
        Binary::DataView *view = sabToDataView(buffer, size);
        DBO::Object dbo;
        auto object = dbo.bufferToDBO.create(view);
        printf("%s\n", object->toString().c_str());
    }
    Binary::DataView *sabToDataView(void *buffer, int size)
    {
        std::vector<uint8_t> bufferVector(static_cast<uint8_t *>(buffer), static_cast<uint8_t *>(buffer) + size);
        Binary::DataView *view = new Binary::DataView(bufferVector);
        return view;
    }
}
