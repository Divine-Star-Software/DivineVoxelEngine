import fs from "fs/promises";
const functions = [
  "bufferToDBO",
  "DVE_BRIDGE_RUN_WORLD_SUN_LIGHT",
  "DVE_BRIDGE_REMOVE_RGB_LIGHT",
  "DVE_BRIDGE_UPDATE_RGB_LIGHT",
  "DVE_BRIDGE_REMOVE_SUN_LIGHT",
  "DVE_BRIDGE_UPDATE_SUN_LIGHT",
  "DVE_BRIDGE_SYNC_VOXEL_TAGS",
  "DVE_BRIDGE_SYNC_VOXEL_PALETTE",
  "DVE_BRIDGE_SYNC_VOXEL_SUBSTANCE_PALETTE",
  "DVE_BRIDGE_SYNC_VOXEL_SUBSTANCE_TAGS",
  "DVE_BRIDGE_SYNC_CHUNK_TAGS",
  "DVE_BRIDGE_SYNC_CHUNK",
  "DVE_BRIDGE_UN_SYNC_CHUNK",
  "DVE_BRIDGE_SYNC_COLUMN_TAGS",
  "DVE_BRIDGE_SYNC_COLUMN",
  "DVE_BRIDGE_UN_SYNC_COLUMN",
  "DVE_BRIDGE_SYNC_REGION_TAGS",
  "DVE_BRIDGE_SYNC_REGION",
  "DVE_BRIDGE_UN_SYNC_REGION",
].map((_) => `_${_}`);

const flags = [
  `-s EXPORTED_FUNCTIONS=${functions.join(",")}`,
  "-s EXPORTED_RUNTIME_METHODS=ccall,cwrap",
  "-s MODULARIZE=1",
  "-s EXPORT_NAME='DVEKernelWASM'",
  "-s DISABLE_EXCEPTION_CATCHING=0",
  "-s SHARED_MEMORY=1",
  "-s USE_PTHREADS=1",
];

const compileScript = /* sh  */ `
    INCLUDE_DIRS=$(find ./libs -type d | sed 's/^/-I/')
    emcc $(find ./ -name '*.cpp')  -o kernel.js $INCLUDE_DIRS ${flags.join(" ")}
    cp ./kernel.js ../src/Kernel/kernel.js
    cp ./kernel.wasm ../../../testing/static/kernel.wasm
    `;

fs.writeFile("./compile.sh", compileScript);
