import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  Engine,
  Scene,
  FreeCamera,
  Vector3,
  CreateSphere,
  HemisphericLight,
  CreateBox,
  GreasedLineTools,
  CreateGreasedLine,
} from "@babylonjs/core";
import { TopDownCamera } from "./TopDownCamera";
import { RenderNodes } from "../Classes/RednerNodes";
import { WorldMap } from "./WorldMap";
export function WorldMapComponent(props: { nodes: RenderNodes }) {
  const containerRef = useRef<HTMLCanvasElement | null>(null);
  const mapRef = useRef(new WorldMap());
  const [big, setBig] = useState(false);
  const nodes = useRef<{
    engine: Engine;
    scene: Scene;
    camera: TopDownCamera;
  } | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const engine = new Engine(containerRef.current);
    const scene = new Scene(engine);
    const camera = new TopDownCamera(scene);
    const light = new HemisphericLight("", new Vector3(0, 1, 0), scene);
    scene.activeCamera = camera.camera;

    const follow = CreateSphere(
      "",
      {
        diameter: 0.1,
      },
      scene
    );
    const stay = CreateSphere(
      "",
      {
        diameter: 0.1,
      },
      scene
    );
    let lastWidth = 0,
      lastHeight = 0;

    const lines = CreateGreasedLine(
      "",
      {
        points: GreasedLineTools.GetCircleLinePoints(100, 400, 0, 100),
      },
      {
        width: 1,
      },
      scene
    );
    lines.rotation.x = Math.PI / 2;
    lines.parent = follow;
    lines.renderingGroupId = 3;
    engine.runRenderLoop(() => {
      const { width, height } =
        containerRef.current!.parentElement!.getBoundingClientRect();
      if (width != lastWidth || height != lastHeight) {
        console.log("Resize");
        engine.setSize(width, height);

        lastWidth = width;
        lastHeight = height;
        camera._updateRatio();
      }

      follow.position.copyFrom(props.nodes.camera.position);
      follow.position.y = 0;
      camera.camera.setTarget(follow);

      (window as any).camera = camera;
      scene.render();
    });

    nodes.current = {
      engine,
      camera,
      scene,
    };

    mapRef.current.init(scene);
    mapRef.current.updateTiles(["main", 0, 0, 0]);
  }, []);

  return (
    <>
      <div
        onDoubleClick={() => {
          setBig(!big);
        }}
        className="world-map-container"
        style={{
          position: "absolute",
          zIndex: Number.MAX_SAFE_INTEGER,
          width: !big ? "250px" : "100%",
          height: !big ? "250px" : "100%",
          top: 0,
          right: 0,
          padding: 0,
          margin: 0,
        }}
      >
        <canvas
          ref={containerRef}
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </div>
    </>
  );
}
