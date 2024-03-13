export function arrayBufferToSharedArrayBuffer(
  arrayBuffer: ArrayBuffer
): SharedArrayBuffer {
  const sharedArrayBuffer = new SharedArrayBuffer(arrayBuffer.byteLength);
  const sharedArray = new Uint8Array(sharedArrayBuffer);
  const array = new Uint8Array(arrayBuffer);
  sharedArray.set(array);
  return sharedArrayBuffer;
}
