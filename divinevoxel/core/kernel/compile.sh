INCLUDE_DIRS=$(find ./libs -type d | sed 's/^/-I/')
emcc $(find ./ -name '*.cpp')  -o kernel.js $INCLUDE_DIRS -s EXPORTED_FUNCTIONS=_bufferToDBO -s EXPORTED_RUNTIME_METHODS=ccall,cwrap  -s MODULARIZE=1 -s EXPORT_NAME='DVEKernelWASM' -s DISABLE_EXCEPTION_CATCHING=0  -s SHARED_MEMORY=1 -s USE_PTHREADS=1
echo 'export' | cat - kernel.js > temp && mv temp kernel.js
cp ./kernel.js ../src/Kernel/kernel.js
cp ./kernel.wasm ../../../testing/static/kernel.wasm