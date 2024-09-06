import DVEClassicCanvas from "@divinevoxel/react-three/Defaults/Classic/DVEClassicCanvas";
import { OrbitControls } from "@react-three/drei";

const worldWorker = new Worker(new URL("./Contexts/World/", import.meta.url), {
  type: "module",
});

const constructorWorkers: Worker[] = [];
for (let i = 0; i < navigator.hardwareConcurrency - 1; i++) {
  constructorWorkers.push(
    new Worker(new URL("./Contexts/Constructor/", import.meta.url), {
      type: "module",
    })
  );
}
export function App() {
  return (
    <>
      <DVEClassicCanvas
        camera={{ position: [50, 70, 0] }}
        onReady={(DVER) => {
          DVER.worldComm.runTasks("start-world", []);
        }}
        textureTypes={[]}
        substances={[]}
        worldWorker={worldWorker}
        constructorWorkers={constructorWorkers}
        textureData={[
          {
            type: "#dve_solid",
            id: "dve_debug_box",
            frames: 0,
            variations: {
              up: { frames: 0 },
              down: { frames: 0 },
              north: { frames: 0 },
              south: { frames: 0 },
              east: { frames: 0 },
              west: { frames: 0 },
            },
          },
          {
            type: "#dve_solid",
            id: "dve_light_debug",
            frames: 0,
            variations: {
              "light-level-0": { frames: 0 },
              "light-level-1": { frames: 0 },
              "light-level-2": { frames: 0 },
              "light-level-3": { frames: 0 },
              "light-level-4": { frames: 0 },
              "light-level-5": { frames: 0 },
              "light-level-6": { frames: 0 },
              "light-level-7": { frames: 0 },
              "light-level-8": { frames: 0 },
              "light-level-9": { frames: 0 },
              "light-level-10": { frames: 0 },
              "light-level-11": { frames: 0 },
              "light-level-12": { frames: 0 },
              "light-level-13": { frames: 0 },
              "light-level-14": { frames: 0 },
              "light-level-15": { frames: 0 },
            },
          },
          {
            type: "#dve_solid",
            id: "dve_dream_stone",
            frames: 0,
            variations: {
              "grassy-up": { frames: 0 },
              "grassy-side": { frames: 0 },
            },
          },
          {
            type: "#dve_solid",
            id: "dve_dread_stone",
            frames: 0,
            variations: {
              "grassy-up": { frames: 0 },
              "grassy-side": { frames: 0 },
            },
          },
          {
            type: "#dve_solid",
            id: "dve_data_holder",
            frames: 0,
            variations: {
              front: { frames: 0 },
            },
          },
          {
            type: "#dve_flora",
            id: "dve_dream_grass_block",
            frames: 0,
            variations: {
              "grassy-up": { frames: 0 },
            },
          },
          {
            type: "#dve_solid",
            id: "dve_dream_stone_pillar",
            frames: 0,
            variations: {
              "side-down": { frames: 0 },
              "side-up": { frames: 0 },
              up: { frames: 0 },
            },
          },
          {
            type: "#dve_solid",
            id: "dve_dread_stone_pillar",
            frames: 0,
            variations: {
              "side-down": { frames: 0 },
              "side-up": { frames: 0 },
              up: { frames: 0 },
            },
          },
          {
            type: "#dve_solid",
            id: "dve_dream_lamp",
            frames: 0,
          },
          {
            type: "#dve_solid",
            id: "dve_dread_lamp",
            frames: 0,
          },
          {
            type: "#dve_solid",
            id: "dve_dream_log",
            frames: 0,
          },
          {
            type: "#dve_flora",
            id: "dve_dream_grass",
            frames: 0,
          },
          {
            type: "#dve_solid",
            id: "dve_dread_grass",
            frames: 0,
          },
          {
            type: "#dve_flora",
            id: "dve_dream_vine",
            frames: 0,
          },
          {
            type: "#dve_flora",
            id: "dve_dream_leaves",
            frames: 0,
          },
          {
            type: "#dve_liquid",
            id: "dve_liquid_dream_ether",
            frames: 0,
            variations: {
              still: {
                frames: 6,
                animKeys: [1, 2, 3, 4, 5, 6, 5, 4, 3, 2],
                globalFrameTime: 2,
              },
            },
          },
          {
            type: "#dve_liquid",
            id: "dve_liquid_dread_ether",
            frames: 0,
            variations: {
              still: {
                frames: 6,
                animKeys: [1, 2, 3, 4, 5, 6, 5, 4, 3, 2],
                globalFrameTime: 2,
              },
            },
          },
          {
            type: "#dve_liquid",
            id: "foam",
            frames: 0,
            variations: {
              up: { frames: 0 },
              "corner-up-right": { frames: 0 },
              "corner-up-left": { frames: 0 },
              "corner-up-left-up-right": { frames: 0 },
              down: { frames: 0 },
              "corner-down-right": { frames: 0 },
              "corner-down-left": { frames: 0 },
              "corner-down-left-down-right": { frames: 0 },
              right: { frames: 0 },
              left: { frames: 0 },
            },

            segment: "overlay",
          },
        ]}
      >
        <ambientLight intensity={0.5} />
        <mesh position={[0, 70, 0]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="royalblue" />
        </mesh>
        <OrbitControls  target={[0,50,0]}/>
      </DVEClassicCanvas>
    </>
  );
}
