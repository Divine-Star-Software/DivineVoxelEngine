import { Vector3Like } from "@amodx/math";
import { DivineVoxelEngineRender } from "@divinevoxel/vlox/Contexts/Render";
import { TickInterval } from "@divinevoxel/vlox/Util/TickInterval";
import { WorldSpaces } from "@divinevoxel/vlox/World/WorldSpaces";

export class DebugGenMap {
  private _onDispose: (() => void) | null = null;
  constructor(public DVER: DivineVoxelEngineRender) {}
  init(
    followPosition: Vector3Like,
    followDirection: Vector3Like,
    dimension = 0
  ) {
    const container = document.createElement("div");
    container.style.position = "absolute";
    container.style.zIndex = "200";
    container.style.width = "250px";
    container.style.height = "250px";
    container.style.top = "0";
    container.style.left = "0";
    container.style.padding = "0";
    container.style.margin = "0";
    container.style.color = "white";
    document.body.append(container);

    const canvas = document.createElement("canvas");
    canvas.style.width = "250px";
    canvas.style.height = "250px";
    canvas.width = 250;
    canvas.height = 250;
    canvas.style.position = "relative";
    canvas.style.zIndex = "250";
    container.appendChild(canvas);

    const debugTextContainer = document.createElement("div");
    debugTextContainer.style.backgroundColor = "rgba(0,0,0,.1)";
    debugTextContainer.style.width = "250px";

    const positionText = document.createElement("pre");
    debugTextContainer.appendChild(positionText);

    container.appendChild(debugTextContainer);

    const offscreen = canvas.transferControlToOffscreen();

    this.DVER.threads.world.runTask("set-debug-map-canvas", offscreen, [
      offscreen,
    ]);
    const formatVector = (key: string, vector: Vector3Like, round = false) => {
      return `[ ${key} ] x: ${round ? vector.x.toFixed(2) : vector.x} y: ${round ? vector.y.toFixed(2) : vector.y} z: ${round ? vector.z.toFixed(2) : vector.z}`;
    };
    const sectorPosition = Vector3Like.Create();
    const sectionPosition = Vector3Like.Create();
    const voxelPosition = Vector3Like.Create();

    const interval = new TickInterval(() => {
      this.DVER.threads.world.runTask("update-debug-map-position", [
        followPosition.x,
        followPosition.y,
        followPosition.z,
      ]);

      Vector3Like.Copy(sectorPosition, followPosition);
      Vector3Like.Copy(sectionPosition, followPosition);
      Vector3Like.Copy(voxelPosition, followPosition);
      Vector3Like.FloorInPlace(voxelPosition);
      WorldSpaces.sector.transformPosition(sectorPosition);
      WorldSpaces.section.transformPosition(sectionPosition);
      WorldSpaces.voxel.transformPosition(voxelPosition);

      positionText.innerText = [
        formatVector("world", followPosition, true),
        formatVector("sector", sectorPosition),
        formatVector("section", sectionPosition),
        formatVector("voxel", voxelPosition),
        `[ section index ] ${WorldSpaces.section.getIndex(sectionPosition.x, sectionPosition.y, sectionPosition.z)}`,
        `[ voxel index ] ${WorldSpaces.voxel.getIndex(voxelPosition.x, voxelPosition.y, voxelPosition.z)}`,
      ].join("\n");
    }, 200);
    interval.start();
    /* 
    this._onDispose = () => {
      interval.stop();
      engine.dispose();
      container.remove();
    }; */
  }

  dispose() {
    if (this._onDispose) this.dispose();
    this._onDispose = null;
  }
}
