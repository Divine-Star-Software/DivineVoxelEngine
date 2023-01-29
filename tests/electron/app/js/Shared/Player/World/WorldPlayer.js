import { VoxelMath } from "../../../../out/Math/VoxelMath.js";
import { PlayerData } from "../Shared/PlayerData.js";
import { PlayerTags } from "../Shared/PlayerTags.js";
export const WorldPlayer = async (DVEW) => {
    let playerDataReady = false;
    DVEW.nexusComm.listenForMessage("connect-player-tags", (data) => {
        PlayerData.$INIT(PlayerTags, data);
        playerDataReady = true;
    });
    DVEW.nexusComm.sendMessage("request-player-tags", []);
    await DVEW.UTIL.createPromiseCheck({
        check: () => {
            if (!playerDataReady) {
                DVEW.nexusComm.sendMessage("request-player-tags", []);
            }
            return playerDataReady;
        },
        checkInterval: 1,
    });
    const worldPlayerObject = {
        playerDataBuffer: new SharedArrayBuffer(1),
        data: new DataView(new ArrayBuffer(1)),
        position: new Float32Array(),
        onAdd: [],
        onRemove: [],
        onExplode: [],
        onUpdate: [],
    };
    const dataTool = DVEW.getDataTool();
    const brush = DVEW.getBrush();
    DVEW.parentComm.listenForMessage("voxel-add", async (data) => {
        let x = PlayerData.pick.position.x + PlayerData.pick.normal.x;
        let y = PlayerData.pick.position.y + PlayerData.pick.normal.y;
        let z = PlayerData.pick.position.z + PlayerData.pick.normal.z;
        if (!dataTool.loadInAt(x, y, z))
            return;
        if (dataTool.isRenderable())
            return;
        await brush.setId(data[1]).setXYZ(x, y, z).paintAndAwaitUpdate();
        DVEW.parentComm.runTasks("play-sound", ["voxel-place", data[1], x, y, z]);
        const raw = brush.getRaw();
        worldPlayerObject.onAdd.forEach((_) => _(raw, x, y, z));
    });
    DVEW.parentComm.listenForMessage("voxel-remove", async () => {
        let x = PlayerData.pick.position.x;
        let y = PlayerData.pick.position.y;
        let z = PlayerData.pick.position.z;
        if (!dataTool.loadInAt(x, y, z))
            return;
        if (dataTool.isRenderable()) {
            const id = dataTool.getStringId();
            DVEW.parentComm.runTasks("play-sound", ["voxel-break", id, x, y, z]);
            await brush.setXYZ(x, y, z).eraseAndAwaitUpdate();
        }
        worldPlayerObject.onRemove.forEach((_) => _(x, y, z));
    });
    DVEW.parentComm.listenForMessage("explode", () => {
        let x = PlayerData.pick.position.x;
        let y = PlayerData.pick.position.y;
        let z = PlayerData.pick.position.z;
        brush.setXYZ(x, y, z).explode();
        worldPlayerObject.onExplode.forEach((_) => _(x, y, z, 6));
        DVEW.parentComm.runTasks("play-sound", ["explode", x, y, z]);
    });
    const start = {
        x: 0,
        y: 0,
        z: 0,
    };
    const end = {
        x: 0,
        y: 0,
        z: 0,
    };
    const reachDistance = 10;
    setInterval(() => {
        worldPlayerObject.onUpdate.forEach((_) => _());
        start.x = PlayerData.position.x;
        start.y = PlayerData.position.y + PlayerData.eyeLevel;
        start.z = PlayerData.position.z;
        end.x = PlayerData.direction.x * reachDistance + start.x;
        end.y = PlayerData.direction.y * reachDistance + start.y;
        end.z = PlayerData.direction.z * reachDistance + start.z;
        const voxels = VoxelMath.visitAll(start, end);
        let foundVoxel = false;
        for (let i = 0; i < voxels.length; i += 3) {
            const x = voxels[i];
            const y = voxels[i + 1];
            const z = voxels[i + 2];
            if (!dataTool.loadInAt(x, y, z))
                continue;
            if (dataTool.isRenderable()) {
                PlayerData.pick.position.x = x;
                PlayerData.pick.position.y = y;
                PlayerData.pick.position.z = z;
                foundVoxel = true;
                break;
            }
        }
        if (!foundVoxel)
            PlayerData.pick.position.set(0, 0, 0);
    }, 12);
    return worldPlayerObject;
};
