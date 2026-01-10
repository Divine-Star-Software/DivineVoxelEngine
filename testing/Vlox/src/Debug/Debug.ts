import { BinaryObject } from "@amodx/binary";
import { Compressor } from "@amodx/core/Compression/Compression";
import { CacheManager } from "@divinevoxel/vlox/Cache/CacheManager";
import { GUI } from "dat.gui";
import { SceneDebug } from "./SceneDebug";
import { DVEBabylonRenderer } from "@divinevoxel/vlox-babylon/Renderer/DVEBabylonRenderer";
export function Debug(renderer: DVEBabylonRenderer) {
  const gui = new GUI();

  const Debug = {};
  const actions = {
    async downloadCache() {
      const data = BinaryObject.objectToBuffer(CacheManager.getCachedData());
      const compressed = await Compressor.core.compressArrayBuffer(data);
      const blob = new Blob([compressed], {});
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "dve-cache.bin";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    },
  };
  const debugFolder = gui.addFolder("Debug");
  debugFolder.add(actions, "downloadCache");
  debugFolder.open();
  SceneDebug(gui,renderer);
}
