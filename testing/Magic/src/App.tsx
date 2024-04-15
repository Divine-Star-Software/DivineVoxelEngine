import { useEffect, useRef, useState } from "react";
import { VoxParser } from "@divinevoxel/magic/index";
import { RayPipeline } from "@divinevoxel/quantum-renderer/Pipelines/Ray/RayPipeline";
export function App() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    (async () => {
      if (!ref.current) return;
      const vox = await (await fetch("/nature.vox")).arrayBuffer();
      console.log("got vox buffer", vox.byteLength);
      const parsed = new VoxParser(vox);
      parsed.parse();

      const rayPipeLine = new RayPipeline(ref.current);

      await rayPipeLine.init();

      const { voxelGrid, voxelLookUpTable } = parsed.getGPUData();
      console.log("got voxel data",voxelGrid,voxelLookUpTable)
      rayPipeLine.rayScene.setBuffers(voxelLookUpTable,voxelGrid);

      rayPipeLine.render();
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
