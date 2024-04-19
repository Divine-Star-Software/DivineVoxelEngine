import { useEffect, useRef, useState } from "react";
import { VoxParser } from "@divinevoxel/magic/index";
import InitDVEM from "@divinevoxel/quantum-renderer/Defaults/Magic/InitDVEMRayMarching";
export function App() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    (async () => {
      if (!ref.current) return;
      const vox = await (await fetch("/monu3.vox")).arrayBuffer();
      console.log("got vox buffer", vox.byteLength);
      const parsed = new VoxParser(vox);

      parsed.parse();
      console.log("VOX PARSED",parsed);
       await InitDVEM({
        casnvas: ref.current,
        parsed, 
      }); 
    })();
  }, []);

  return (
    <>
      <div className="render-canvas-container">
        <canvas ref={ref} />
      </div>
    </>
  );
}
