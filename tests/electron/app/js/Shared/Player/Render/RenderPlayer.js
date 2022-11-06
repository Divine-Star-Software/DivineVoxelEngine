import { GetPlayerModel, SetUpDefaultCamera } from "../../Babylon/index.js";
import { PlayerStatesIndexes, PlayerStatesValues, } from "../Shared/Player.data.js";
export const GetPlayerPickCube = (DVER, camera, scene, model) => {
    let pickVectorDV = new DataView(new ArrayBuffer(4 * 3 + 3));
    DVER.worldComm.listenForMessage("connect-player-pick", (data) => {
        console.log("got it ");
        pickVectorDV = new DataView(data[1]);
    });
    const cubeMaterial = new BABYLON.StandardMaterial("block");
    cubeMaterial.diffuseColor = new BABYLON.Color3(0.2, 0.2, 0.2);
    cubeMaterial.alpha = 0.3;
    const cube = BABYLON.MeshBuilder.CreateBox("playerblockdisplay", {
        size: 1.1,
    });
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
    window.addEventListener("click", (event) => {
        if (event.button == 2 && event.shiftKey) {
            DVER.worldComm.sendMessage("explode");
            return;
        }
        if (event.button == 2) {
            cameraPickPostion.x = model.position.x;
            cameraPickPostion.y = model.position.y;
            cameraPickPostion.z = model.position.z;
            cameraPickPostion.y += 0.75;
            const camPick = scene.pickWithRay(camera.getForwardRay(10, undefined, cameraPickPostion));
            if (camPick) {
                if (camPick.hit) {
                    if (camPick.pickedMesh && camPick.faceId !== undefined) {
                        let normal = camPick.pickedMesh.getFacetNormal(camPick.faceId);
                        pickVectorDV.setInt8(12, normal.x);
                        pickVectorDV.setInt8(13, normal.y);
                        pickVectorDV.setInt8(14, normal.z);
                    }
                }
            }
            let voxel = localStorage.getItem("voxel");
            voxel = voxel ? voxel : "dve:dreamstone";
            DVER.worldComm.sendMessage("voxel-add", [voxel]);
            cameraPickPostion.setAll(0);
        }
        if (event.button == 0) {
            DVER.worldComm.sendMessage("voxel-remove");
        }
    });
    scene.registerBeforeRender(() => {
        cube.position.x = pickVectorDV.getFloat32(0) + 0.5;
        cube.position.y = pickVectorDV.getFloat32(4) + 0.5;
        cube.position.z = pickVectorDV.getFloat32(8) + 0.5;
    });
    return cube;
};
export const GetRenderPlayer = async (enablePicking, scene, canvas, DVER) => {
    let ready = false;
    let playerPostionArray = new Float32Array();
    DVER.nexusComm.listenForMessage("connect-player-data", (data) => {
        playerPostionArray = new Float32Array(data[1]);
        ready = true;
    });
    const playerCamera = SetUpDefaultCamera(scene, canvas, { x: 0, y: 0.8, z: 0 }, { x: 0, y: 0, z: 0 }, true, false, "playercam");
    playerCamera.attachControl(canvas, true);
    playerCamera.inputs.removeByType("FreeCameraKeyboardMoveInput");
    const playerModel = await GetPlayerModel(scene);
    playerModel.isVisible = false;
    const camNode = new BABYLON.TransformNode("camnode", scene);
    playerCamera.parent = camNode;
    camNode.parent = playerModel;
    DVER.nexusComm.sendMessage("request-player-states", []);
    await DVER.UTIL.createPromiseCheck({
        check: () => ready,
        checkInterval: 1,
    });
    if (enablePicking) {
        GetPlayerPickCube(DVER, playerCamera, scene, playerModel);
    }
    const playerDirectionSAB = new SharedArrayBuffer(4 * 6);
    const playerStatesSAB = new SharedArrayBuffer(PlayerStatesIndexes.total);
    const playerDirection = new Float32Array(playerDirectionSAB);
    const playerStates = new Uint8Array(playerStatesSAB);
    playerStates[PlayerStatesIndexes.movement] = PlayerStatesValues.still;
    playerStates[PlayerStatesIndexes.secondaryMovment] =
        PlayerStatesValues.secondaryStill;
    window.addEventListener("keydown", (event) => {
        if (event.key == "Home") {
            DVER.renderManager.setSunLevel(1);
            DVER.renderManager.updateFogOptions({ color: new BABYLON.Color3(1, 1, 1) });
        }
        if (event.key == "PageUp") {
            DVER.renderManager.setSunLevel(0.8);
            DVER.renderManager.updateFogOptions({
                color: new BABYLON.Color3(0.8, 0.8, 0.8),
            });
        }
        if (event.key == "PageDown") {
            DVER.renderManager.setSunLevel(0.2);
            DVER.renderManager.updateFogOptions({
                color: new BABYLON.Color3(0.2, 0.2, 0.2),
            });
        }
        if (event.key == "End") {
            DVER.renderManager.setSunLevel(0);
            DVER.renderManager.updateFogOptions({ color: new BABYLON.Color3(0, 0, 0) });
        }
        if (event.key == "w" || event.key == "W") {
            playerStates[PlayerStatesIndexes.movement] =
                PlayerStatesValues.walkingForward;
        }
        if (event.key == "s" || event.key == "S") {
            playerStates[PlayerStatesIndexes.movement] =
                PlayerStatesValues.walkingBackward;
        }
        if (event.key == "a" || event.key == "A") {
            playerStates[PlayerStatesIndexes.secondaryMovment] =
                PlayerStatesValues.walkingLeft;
        }
        if (event.key == "d" || event.key == "D") {
            playerStates[PlayerStatesIndexes.secondaryMovment] =
                PlayerStatesValues.walkingRight;
        }
        if (event.key == " ") {
            playerStates[PlayerStatesIndexes.jumping] = 1;
        }
        if (event.key == "Control") {
            playerStates[PlayerStatesIndexes.running] = 1;
        }
    });
    window.addEventListener("keyup", (event) => {
        if (event.key == "w" ||
            event.key == "W" ||
            event.key == "s" ||
            event.key == "S") {
            playerStates[PlayerStatesIndexes.movement] = PlayerStatesValues.still;
        }
        if (event.key == "a" ||
            event.key == "A" ||
            event.key == "d" ||
            event.key == "D") {
            playerStates[PlayerStatesIndexes.secondaryMovment] =
                PlayerStatesValues.secondaryStill;
        }
        if (event.key == " ") {
            playerStates[PlayerStatesIndexes.jumping] = 0;
        }
        if (event.key == "Control") {
            playerStates[PlayerStatesIndexes.running] = 0;
        }
    });
    DVER.nexusComm.sendMessage("connect-player-states", [
        playerDirectionSAB,
        playerStatesSAB,
    ]);
    const playerDataBuffer = new SharedArrayBuffer(4 + 4 * 3 * 3);
    const playerData = new DataView(playerDataBuffer);
    DVER.worldComm.listenForMessage("send-player-server-data", () => {
        DVER.worldComm.sendMessage("player-server-data", [playerDataBuffer]);
    });
    const direction = new BABYLON.Vector3(0, 0, 0);
    const sideDirection = new BABYLON.Vector3(0, 0, 0);
    const xzd = new BABYLON.Vector3(0, 0, 0);
    const cameraRotation = new BABYLON.Vector3(0, 0, 0);
    scene.registerBeforeRender(() => {
        let et = performance.now();
        playerModel.position.x = playerPostionArray[0];
        playerModel.position.y = playerPostionArray[1] - 0.5;
        playerModel.position.z = playerPostionArray[2];
        playerData.setFloat32(4, playerPostionArray[0]);
        playerData.setFloat32(8, playerPostionArray[1]);
        playerData.setFloat32(12, playerPostionArray[2]);
        const camera = scene.activeCamera;
        if (!camera)
            return;
        playerCamera.getDirectionToRef(BABYLON.Vector3.Forward(), direction);
        playerCamera.getDirectionToRef(BABYLON.Vector3.Left(), sideDirection);
        playerDirection[0] = direction.x;
        playerDirection[1] = direction.y;
        playerDirection[2] = direction.z;
        playerData.setFloat32(16, playerDirection[0]);
        playerData.setFloat32(20, playerDirection[1]);
        playerData.setFloat32(24, playerDirection[2]);
        playerData.setFloat32(28, camera.rotation.x);
        playerData.setFloat32(32, camera.rotation.y);
        playerData.setFloat32(26, camera.rotation.z);
        playerDirection[3] = sideDirection.x;
        playerDirection[4] = sideDirection.y;
        playerDirection[5] = sideDirection.z;
        xzd.x = direction.x;
        xzd.z = direction.z;
        xzd.normalize();
        if (playerStates[PlayerStatesIndexes.movement] ==
            PlayerStatesValues.walkingForward) {
            let runFactor = 0.02 * playerStates[PlayerStatesIndexes.running];
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
    return playerModel;
};
