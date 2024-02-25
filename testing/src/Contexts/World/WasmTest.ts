import { DBO } from "@divinestar/binary";
import { DVEKernel } from "@divinevoxel/core/Kernel/DVEKernel";

export async function WasmTest() {
  console.log("TRY INIT");
  await DVEKernel.init();

  console.log(
    "attempt call",
    DVEKernel.bufferToDBO(
      DBO.objectToBuffer({
        SUP: 1,
        SUP1: 2,
        SUP2: 3,
      })
    )
  );
}
