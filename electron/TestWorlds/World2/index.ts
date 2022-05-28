import {
 SetUpEngine,
 SetUpCanvas,
 SetUpDefaultCamera,
 SetUpDefaultSkybox,
 runRenderLoop,
 SetUpDefaultScene,
} from "../Shared/Babylon/index.js";
import { RunInit, SetUpWorkers } from "../Shared/Create/index.js";
import { DVER } from "../../out/Render/DivineVoxelEngineRender.js";
import { RegisterTexutres } from "../Shared/Functions/RegisterTextures.js";
import { VoxelTemplateSubstanceType } from "../../out/Meta/index.js";

RegisterTexutres(DVER);

const workers = SetUpWorkers(
 import.meta.url,
 "./World/world.js",
 "../Shared/Builder/builder.js",
 "../Shared/Propagators/propagators.js"
);

await DVER.$INIT({
 worldWorker: workers.worldWorker,
 builderWorker: workers.builderWorkers,
 propagationWorker: workers.propagationWorkers,
 lighting: {
  doAO: true,
  doRGBLight: false,
  doSunLight: false,
  autoRGBLight: false,
  autoSunLight: false,
 },
});

const init = async () => {
 const canvas = SetUpCanvas();
 const engine = SetUpEngine(canvas);
 const scene = SetUpDefaultScene(engine);
 const camera = SetUpDefaultCamera(
  scene,
  canvas,
  { x: 15, y: 36, z: 7 },
  { x: 7, y: 30, z: 7 }
 );
 SetUpDefaultSkybox(scene);

 await DVER.$SCENEINIT({ scene: scene });
 DVER.renderManager.setBaseLevel(1);

 runRenderLoop(engine, scene, camera);
};

RunInit(init);

const _3dFlatArray = DVER.UTIL.getFlat3DArray();
const heightByte = DVER.UTIL.getHeightByte();
const testHeightMapSAB = new SharedArrayBuffer(
 DVER.worldBounds.chunkArea * 4 * 2
);
const testHeightMap = new Uint32Array(testHeightMapSAB);

let startValue = heightByte.getStartingHeightMapValue();
let i = testHeightMap.length;
while (i--) {
 testHeightMap[i] = startValue;
}
const x = 0;
const z = 0;
const minY = 50;
const maxY = 100;
const t1 = (substance: VoxelTemplateSubstanceType) => {
 console.log(`test 1 [[[[${substance}]]]]`);
 console.log(heightByte.isSubstanceExposed(substance, x, z, testHeightMap));
 const before = _3dFlatArray.getValue(x, 0, z, testHeightMap);
 console.log(before);
 heightByte.markSubstanceAsExposed(substance, x, z, testHeightMap);
 console.log(heightByte.isSubstanceExposed(substance, x, z, testHeightMap));
 const after = _3dFlatArray.getValue(x, 0, z, testHeightMap);
 console.log(after);
 console.log("==============================");
};
