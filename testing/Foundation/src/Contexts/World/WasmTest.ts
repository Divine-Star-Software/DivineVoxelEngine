import { BinaryObject } from "@divinestar/binary";
import {
  DVEKernel,
  DVEKernelFunctions,
} from "@divinevoxel/foundation/Kernel/DVEKernel";

export async function WasmTest() {
  console.log("TRY INIT");
  await DVEKernel.init();
  const buffer = BinaryObject.objectToBuffer({
    SUP: 1,
    SUP1: 2,
    SUP2: new Uint32Array(20).fill(Math.random() * 100),
    other: [
      { SUP: 1, SUP1: 2, SUP2: new Uint32Array(20).fill(Math.random() * 100) },
    ],
  });
  console.log(new Uint8Array(buffer));
  console.log(BinaryObject.bufferToObject(buffer));

  const testBuffer = new SharedArrayBuffer(20 * 2);
  const testArray = new Uint16Array(testBuffer);
  testArray.fill(255);

  let test: number[]  = [];
  testArray.forEach((_)=>test.push(_))
  console.log("before test array buffer", test);
  /*   for (let i = 0; i < testArray.length; i++) {
    testArray[i] = (Math.random() * 10_000) >> 0;
  } */
  DVEKernel.call(DVEKernelFunctions.SABTest,new Uint8Array(testBuffer), testArray.length);

  test= [];
  testArray.forEach((_)=>test.push(_))
  console.log("after test array buffer", [...test]);

  console.log(testArray);
}
