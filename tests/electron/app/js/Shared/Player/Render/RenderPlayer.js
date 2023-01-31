import { InitalizeAudio } from "../../../Shared/Audio/init.js";
import { GetPlayerModel, SetUpDefaultCamera } from "../../Babylon/index.js";
import { PlayerStatesValues } from "../Shared/Player.data.js";
import { PlayerData } from "../Shared/PlayerData.js";
import { PlayerTags } from "../Shared/PlayerTags.js";
/*
PICK CUBE
*/
export const GetPlayerPickCube = (DVER, camera, scene) => {
    const cubeMaterial = new BABYLON.StandardMaterial("block");
    cubeMaterial.diffuseColor = new BABYLON.Color3(0.2, 0.2, 0.2);
    cubeMaterial.alpha = 0.3;
    const cube = BABYLON.MeshBuilder.CreateBox("playerblockdisplay", {
        size: 1.1,
    });
    cube.parent = DVER.render.fo.activeNode;
    cube.isPickable = true;
    cube.material = cubeMaterial;
    cube.enableEdgesRendering();
    cube.edgesWidth = 0.3;
    cube.edgesColor = new BABYLON.Color4(0, 0, 0, 0.8);
    cube.convertToFlatShadedMesh();
    cube.updateFacetData();
    const positions = cube.getVerticesData(BABYLON.VertexBuffer.PositionKind);
    const indicies = cube.getIndices();
    const calculatedNormals = [];
    BABYLON.VertexData.ComputeNormals(positions, indicies, calculatedNormals);
    cube.setVerticesData(BABYLON.VertexBuffer.NormalKind, calculatedNormals);
    const cameraPickPostion = new BABYLON.Vector3();
    const states = {
        place: false,
        break: false,
    };
    window.addEventListener("mousedown", (event) => {
        if (event.button == 2 && event.shiftKey) {
            DVER.worldComm.sendMessage("explode");
            return;
        }
        if (event.button == 2) {
            states.place = true;
            addV();
        }
        if (event.button == 0) {
            states.break = true;
            breakV();
        }
    });
    window.addEventListener("mouseup", (event) => {
        if (event.button == 2) {
            states.place = false;
        }
        if (event.button == 0) {
            states.break = false;
        }
    });
    const addV = () => {
        cameraPickPostion.x = 0;
        cameraPickPostion.y = PlayerData.eyeLevel;
        cameraPickPostion.z = 0;
        const camPick = scene.pickWithRay(camera.getForwardRay(10, undefined, cameraPickPostion));
        if (camPick) {
            if (camPick.hit) {
                if (camPick.pickedMesh && camPick.faceId !== undefined) {
                    let normal = camPick.pickedMesh.getFacetNormal(camPick.faceId);
                    PlayerData.pick.normal.x = normal.x;
                    PlayerData.pick.normal.y = normal.y;
                    PlayerData.pick.normal.z = normal.z;
                }
            }
        }
        let voxel = localStorage.getItem("voxel");
        voxel = voxel ? voxel : "dve_dreamstone";
        DVER.worldComm.sendMessage("voxel-add", [voxel]);
        cameraPickPostion.setAll(0);
    };
    const breakV = () => {
        DVER.worldComm.sendMessage("voxel-remove");
    };
    setInterval(() => { }, 100);
    scene.registerBeforeRender(() => {
        cube.position.x = PlayerData.pick.position.x + 0.5;
        cube.position.y = PlayerData.pick.position.y + 0.5;
        cube.position.z = PlayerData.pick.position.z + 0.5;
    });
    return cube;
};
/*
PLAYER
*/
export const GetRenderPlayer = async (enablePicking, scene, canvas, DVER) => {
    const DAE = await InitalizeAudio();
    let playerDataReady = false;
    DVER.nexusComm.listenForMessage("connect-player-tags", (data) => {
        PlayerData.$INIT(PlayerTags, data);
        playerDataReady = true;
    });
    DVER.nexusComm.sendMessage("request-player-tags", []);
    window.data = PlayerData;
    await DVER.UTIL.createPromiseCheck({
        check: () => {
            if (!playerDataReady) {
                DVER.nexusComm.sendMessage("request-player-tags", []);
            }
            return playerDataReady;
        },
        checkInterval: 1,
    });
    PlayerData.eyeLevel = 0.7;
    const playerCamera = SetUpDefaultCamera(scene, canvas, { x: 0, y: PlayerData.eyeLevel, z: 0 }, { x: 0, y: 0, z: 0 }, true, false, "playercam");
    playerCamera.attachControl(canvas, true);
    playerCamera.inputs.removeByType("FreeCameraKeyboardMoveInput");
    const playerModel = await GetPlayerModel(scene);
    playerModel.isVisible = false;
    const camNode = new BABYLON.TransformNode("camnode", scene);
    playerCamera.parent = camNode;
    camNode.parent = playerModel;
    const oriign = new BABYLON.Vector3();
    scene.onBeforeActiveMeshesEvaluationObservable.add(() => {
        oriign.x = PlayerData.position.x;
        oriign.y = PlayerData.position.y;
        oriign.z = PlayerData.position.z;
    });
    DVER.render.fo.setOriginCenter(scene, { position: oriign });
    if (enablePicking) {
        GetPlayerPickCube(DVER, playerCamera, scene);
    }
    PlayerData.states.movement = PlayerStatesValues.still;
    PlayerData.states.secondaryMovement = PlayerStatesValues.secondaryStill;
    const sceneTool = DVER.getSceneTool();
    window.addEventListener("keydown", (event) => {
        if (event.key == "Home") {
            sceneTool.levels.setSun(1).fog.setColor(1);
        }
        if (event.key == "PageUp") {
            sceneTool.levels.setSun(0.8).fog.setColor(0.8);
        }
        if (event.key == "PageDown") {
            sceneTool.levels.setSun(0.2).fog.setColor(0.2);
        }
        if (event.key == "End") {
            sceneTool.levels.setSun(0).fog.setColor(0);
        }
        if (event.key == "w" || event.key == "W") {
            PlayerData.states.movement = PlayerStatesValues.walkingForward;
        }
        if (event.key == "s" || event.key == "S") {
            PlayerData.states.movement = PlayerStatesValues.walkingBackward;
        }
        if (event.key == "a" || event.key == "A") {
            PlayerData.states.secondaryMovement = PlayerStatesValues.walkingLeft;
        }
        if (event.key == "d" || event.key == "D") {
            PlayerData.states.secondaryMovement = PlayerStatesValues.walkingRight;
        }
        if (event.key == " ") {
            PlayerData.states.jumping = 1;
        }
        if (event.key == "Control") {
            PlayerData.states.running = 1;
        }
    });
    window.addEventListener("keyup", (event) => {
        if (event.key == "w" ||
            event.key == "W" ||
            event.key == "s" ||
            event.key == "S") {
            PlayerData.states.movement = PlayerStatesValues.still;
        }
        if (event.key == "a" ||
            event.key == "A" ||
            event.key == "d" ||
            event.key == "D") {
            PlayerData.states.secondaryMovement = PlayerStatesValues.secondaryStill;
        }
        if (event.key == " ") {
            PlayerData.states.jumping = 0;
        }
        if (event.key == "Control") {
            PlayerData.states.running = 0;
        }
    });
    const direction = new BABYLON.Vector3(0, 0, 0);
    const sideDirection = new BABYLON.Vector3(0, 0, 0);
    const xzd = new BABYLON.Vector3(0, 0, 0);
    const cameraRotation = new BABYLON.Vector3(0, 0, 0);
    scene.registerBeforeRender(() => {
        let et = performance.now();
        playerModel.position.setAll(0);
        const position = PlayerData.position;
        const camera = scene.activeCamera;
        if (!camera)
            return;
        playerCamera.getDirectionToRef(BABYLON.Vector3.Forward(), direction);
        playerCamera.getDirectionToRef(BABYLON.Vector3.Left(), sideDirection);
        PlayerData.direction.set(direction.x, direction.y, direction.z);
        PlayerData.sideDirection.set(sideDirection.x, sideDirection.y, sideDirection.z);
        const rotation = camera.rotation;
        PlayerData.rotation.set(rotation.x, rotation.y, rotation.z);
        DAE.space.setListenerPosition(position.x, position.y, position.z);
        DAE.space.setListenerDirection(direction.x * -1, direction.y, direction.z * -1);
        xzd.x = direction.x;
        xzd.z = direction.z;
        xzd.normalize();
        if (PlayerData.states.movement == PlayerStatesValues.walkingForward) {
            let runFactor = 0.02 * PlayerData.states.running;
            let factor = 0.008 + runFactor;
            let yd = Math.abs(direction.y) > 0.5 ? 0 : 1;
            cameraRotation.x =
                Math.cos(et / 100) * factor * Number(xzd.x.toFixed(1)) * yd;
            cameraRotation.z =
                Math.cos(et / 100) * factor * Number(xzd.z.toFixed(1)) * yd;
            cameraRotation.y = Math.abs(Math.sin(et / 100)) * factor;
        }
        else {
            cameraRotation.scaleInPlace(0.5);
        }
        camNode.rotation = BABYLON.Vector3.Lerp(cameraRotation, camNode.rotation, 0.25);
    });
    let currentMaterial = "none";
    DVER.nexusComm.listenForMessage("set-material", (data) => {
        currentMaterial = data[1];
    });
    let lastSFX = "";
    let t = performance.now();
    setInterval(() => {
        const maxDelta = PlayerData.is.running ? 400 : 800;
        if (PlayerData.is.walking && PlayerData.is.onGround) {
            let delta = performance.now() - t;
            if (delta <= maxDelta)
                return;
            t = performance.now();
            if (currentMaterial == "none")
                currentMaterial = "stone";
            lastSFX = DAE.sfx.play(`walking-${currentMaterial}`, {
                _3dSoundPosition: {
                    x: PlayerData.position.x,
                    y: PlayerData.position.y,
                    z: PlayerData.position.z,
                },
                playBackRate: PlayerData.is.running ? 1.5 : 1,
            });
        }
        else {
            if (currentMaterial == "none")
                return;
            DAE.sfx.stopSpecific(`walking-${currentMaterial}`, lastSFX);
        }
    }, 100);
    //DAE.music.play("dream-ambience");
    return playerModel;
};
