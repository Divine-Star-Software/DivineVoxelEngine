import { Canvas, Props, events, useFrame, useThree } from "@react-three/fiber";
import InitClassic, {
  NodeSubstanceData,
} from "@divinevoxel/three-renderer/Defaults/Classic/InitDVETRClassic";
import { TextureData } from "@divinevoxel/foundation/Textures/Texture.types";
import { useEffect, useMemo, useRef, useState } from "react";
import { DVEThreeRenderer } from "@divinevoxel/three-renderer/DVEThreeRenderer";
import { DivineVoxelEngineRender } from "@divinevoxel/core/Render/DivineVoxelEngineRender";
import { RecursivePartial } from "@divinevoxel/core";
import { EngineSettingsData } from "@divinevoxel/core/Types/Data/Settings/EngineSettings.types";

interface R3FCanvasProps
  extends Props,
    React.RefAttributes<HTMLCanvasElement> {}
export interface DVEClassicCanvasProps extends R3FCanvasProps {
  textureData: TextureData[];
  textureTypes: string[];
  substances: NodeSubstanceData[];
  onReady?: (DVER: DivineVoxelEngineRender) => void;
  worldWorker: Worker;
  constructorWorkers: Worker[];
  nexusWorker?: Worker | undefined;
  dataWorker?: Worker | undefined;
  engineSettings?: RecursivePartial<EngineSettingsData>;
}

function DVEInit({
  canvasProps,
  setReady,
}: {
  canvasProps: DVEClassicCanvasProps;
  setReady: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const dveRendererRef = useRef<DVEThreeRenderer | null>(null);
  const { scene, camera } = useThree();

  useEffect(() => {
    if (dveRendererRef.current) return;
    (async () => {
      const dver = new DivineVoxelEngineRender();

      const renderer = await InitClassic({
        camera,
        scene,
        textureData: canvasProps.textureData,
        textureTypes: canvasProps.textureTypes,
        substances: canvasProps.substances,
      });
      dveRendererRef.current = renderer;

      await dver.init({
        worldWorker: canvasProps.worldWorker,
        constructorWorkers: canvasProps.constructorWorkers,
        nexusWorker: canvasProps.nexusWorker,
        dataWorker: canvasProps.dataWorker,
        renderer,
        ...canvasProps.engineSettings,
      });
      if (canvasProps.onReady) canvasProps.onReady(dver);
      setReady(true);
    })();
  }, []);
  useFrame(() => {
    if (!dveRendererRef.current) return;
    dveRendererRef.current.scene.beforeRender.notify();
  }, -1);
  return <></>;
}

export default function DVEClassicCanvas(props: DVEClassicCanvasProps) {
  const [ready, setReady] = useState(false);
  const canvasProps = useMemo(() => {
    const canvasProps = { ...props };
    delete (canvasProps as any)["worldWorker"];
    delete (canvasProps as any)["constructorWorkers"];
    delete (canvasProps as any)["engineSettings"];
    delete (canvasProps as any)["nexusWorker"];
    delete (canvasProps as any)["dataWorker"];
    delete (canvasProps as any)["textureData"];
    delete (canvasProps as any)["textureTypes"];
    delete (canvasProps as any)["substances"];
    delete (canvasProps as any)["onReady"];
    delete (canvasProps as any)["children"];
    return canvasProps as R3FCanvasProps;
  }, []);

  return (
    <Canvas {...canvasProps}>
      <DVEInit canvasProps={props} setReady={setReady} />
      {ready && props.children}
    </Canvas>
  );
}
