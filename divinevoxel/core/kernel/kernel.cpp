#include <variant>
#include <iostream>
#include <string>
#include <cstdio>
#include "./DVEKernelBridge.hpp"
#include "./libs/dbo/DBO.hpp"
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
        int locationBufferSize,
        void *stateBuffer,
        int stateBufferSize,
        void *voxelIdsBuffer,
        int voxelIdsBufferSize,
        void *voxelLightBuffer,
        int voxelLightBufferSize,
        void *voxelStateBuffer,
        int voxelStateBufferSize,
        void *voxelSecondaryIdBuffer,
        int voxelSecondaryIdBufferSize)
    {
        /*         DVEBridge::SYNC_CHUNK(
                    DVEBridge::DBO_TO_LOCATION(DVEBridge::sabToDataView(locationBuffer, locationBufferSize)),
                    DVEBridge::sabToDataUint8Array(stateBuffer, stateBufferSize),
                    DVEBridge::sabToDataUint16Array(voxelIdsBuffer, voxelIdsBufferSize),
                    DVEBridge::sabToDataUint16Array(voxelLightBuffer, voxelLightBufferSize),
                    DVEBridge::sabToDataUint16Array(voxelStateBuffer, voxelStateBufferSize),
                    DVEBridge::sabToDataUint16Array(voxelSecondaryIdBuffer, voxelSecondaryIdBufferSize)); */
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
        Binary::DataView *view = DVEBridge::sabToDataView(buffer, size);
        DBO::Object dbo;
        printf("%s %i %s %zu \n", "start parse| passed size", size, " data view size ", view->size());
        auto object = dbo.bufferToDBO.create(view);
        printf("%s \n", object->toString().c_str());
    }

    void sabTest(uint16_t *array, int length)
    {
        printf("%s %i %s \n", "start sab test", length);
        for (int i = 0; i < length; i++)
        {
            printf("%zu -> %hu \n", i, array[i]);
            array[i] = 128;
            printf("UPDATED %zu -> %hu \n", i, array[i]);
        }
    }
    void sabTestO(void *buffer, size_t length)
    {
        printf("%s %i %s \n", "start sab test", length);
        std::vector<uint16_t> bufferVector(static_cast<uint16_t *>(buffer), static_cast<uint16_t *>(buffer) + length);
        for (size_t i = 0; i < length; ++i)
        {
            printf("%zu -> %hu \n", i, bufferVector[i]);

            bufferVector[i] = 128;
            printf("UPDATED %zu -> %hu \n", i, bufferVector[i]);
        }
    }
}
