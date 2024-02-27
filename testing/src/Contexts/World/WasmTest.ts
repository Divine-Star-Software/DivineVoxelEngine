import { DBO } from "@divinestar/binary";
import { DVEKernel } from "@divinevoxel/core/Kernel/DVEKernel";

function binaryTest() {
  const buffer = new ArrayBuffer(8);

  const view = new DataView(buffer);

  view.setUint32(0, 20, true);

  console.log(
    "BINARY TEST",
    view.getUint32(0, true),
    new Uint8Array(buffer),
    new Float32Array(buffer)
  );
  for (let i = 0; i < view.byteLength; i++) {
    console.log(i + " -> " + view.getUint8(i));
  }
}

export async function WasmTest() {
  console.log("TRY INIT");
  binaryTest();
  await DVEKernel.init();
  const buffer = DBO.objectToBuffer({
    SUP: 1,
    SUP1: 2,
    SUP2: new Uint32Array(20).fill(Math.random() * 100),
    other: [
      { SUP: 1, SUP1: 2, SUP2: new Uint32Array(20).fill(Math.random() * 100) },
    ],
  });
  console.log(new Uint8Array(buffer));
  console.log(DBO.bufferToObject(buffer));

  console.log("attempt call", DVEKernel.bufferToDBO(buffer));
}
