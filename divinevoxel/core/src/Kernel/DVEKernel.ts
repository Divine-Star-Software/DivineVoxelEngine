import { DVEKernelWASM } from "./kernel.js";

interface DVEKernelModule {
  ccall(
    name: string,
    returnType: string,
    argumentTypes: string[],
    argument: any[]
  ): any;
}
function arrayBufferToSharedArrayBuffer(
  arrayBuffer: ArrayBuffer
): SharedArrayBuffer {
  const sharedArrayBuffer = new SharedArrayBuffer(arrayBuffer.byteLength);
  const sharedArray = new Uint8Array(sharedArrayBuffer);
  const array = new Uint8Array(arrayBuffer);
  sharedArray.set(array);
  return sharedArrayBuffer;
}
export class DVEKernel {
  static module: DVEKernelModule;

  static bufferToDBO(buffer: ArrayBuffer) {
    console.log("STARTERING PARSE IN JS", buffer);

    try {
      return DVEKernel.module.ccall(
        "bufferToDBO", // name of C function
        "number", // return type
        ["array", "number"], // argument types
        [
          new Uint8Array(arrayBufferToSharedArrayBuffer(buffer)),
          buffer.byteLength,
        ]
      );
    } catch (error) {
      console.log("caught error");
      console.error(error);
    }
  }

  static init() {
    console.log("attempt get module");
    console.log(DVEKernelWASM);
    return new Promise(async (resolve) => {
      const module = await DVEKernelWASM();
      console.log("got the mdoule", module);
      DVEKernel.module = module;
      resolve(true);
    });
  }
}
