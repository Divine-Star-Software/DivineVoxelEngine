import { BinaryObject } from "@amodx/binary";

export async function compressBinaryObject(object: any): Promise<ArrayBuffer> {
  const compressedArrayBuffer = await new Response(
    new Blob([BinaryObject.objectToBuffer(object)])
      .stream()
      .pipeThrough(new CompressionStream("gzip"))
  ).arrayBuffer();
  return compressedArrayBuffer;
}

export async function expandBinaryObject<T = any>(
  buffer: ArrayBuffer | Uint8Array,
  useSharedMemory = false
): Promise<T> {
  const decompressedBuffer = await new Response(
    new Blob([buffer]).stream().pipeThrough(new DecompressionStream("gzip"))
  ).arrayBuffer();
  BinaryObject.setUseSharedMemory(useSharedMemory);
  const object = BinaryObject.bufferToObject<T>(decompressedBuffer);
  BinaryObject.setUseSharedMemory(false);
  return object;
}
