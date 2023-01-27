import { LightData } from "../../../../out/Data/Light/LightByte.js";
export const GetAnalyzerCubeRender = (DVER, positionLock) => {
    const cubeMaterial = new BABYLON.StandardMaterial("block");
    cubeMaterial.diffuseColor = new BABYLON.Color3(1, 0.0, 0);
    cubeMaterial.alpha = 0.6;
    const cube = BABYLON.MeshBuilder.CreateBox("playerblockdisplay", {
        size: 1.1,
    });
    cube.parent = DVER.render.fo.activeNode;
    //\cube.parent = DVER.render.worldOrigin;
    cube.material = cubeMaterial;
    cube.enableEdgesRendering();
    cube.edgesWidth = 0.3;
    cube.edgesColor = new BABYLON.Color4(0, 0, 0, 0.8);
    const debugCube = {
        _pos: {
            x: 0,
            y: 0,
            z: 0,
        },
        setXYZ(x, y, z) {
            this._pos.x = x >> 0;
            this._pos.y = y >> 0;
            this._pos.z = z >> 0;
            cube.position.x = this._pos.x + 0.5;
            cube.position.y = this._pos.y + 0.5;
            cube.position.z = this._pos.z + 0.5;
            return this;
        },
        setPositonToLock() {
            if (positionLock) {
                this.setXYZ(positionLock.position.x, positionLock.position.y, positionLock.position.z);
                return this;
            }
        },
        requestData() {
            DVER.worldComm.sendMessage("get-data", [
                this._pos.x,
                this._pos.y,
                this._pos.z,
            ]);
            return this;
        },
    };
    window.addEventListener("keydown", (ev) => {
        if (ev.key == "q") {
            debugCube.setPositonToLock();
        }
        if (ev.key == "e") {
            debugCube.requestData();
        }
        if (ev.key == "ArrowUp") {
            debugCube.setXYZ(debugCube._pos.x, debugCube._pos.y + 1, debugCube._pos.z);
        }
        if (ev.key == "ArrowDown") {
            debugCube.setXYZ(debugCube._pos.x, debugCube._pos.y - 1, debugCube._pos.z);
        }
        if (!ev.shiftKey) {
            if (ev.key == "ArrowLeft") {
                debugCube.setXYZ(debugCube._pos.x - 1, debugCube._pos.y, debugCube._pos.z);
            }
            if (ev.key == "ArrowRight") {
                debugCube.setXYZ(debugCube._pos.x + 1, debugCube._pos.y, debugCube._pos.z);
            }
        }
        if (ev.shiftKey) {
            if (ev.key == "ArrowLeft") {
                debugCube.setXYZ(debugCube._pos.x, debugCube._pos.y, debugCube._pos.z - 1);
            }
            if (ev.key == "ArrowRight") {
                debugCube.setXYZ(debugCube._pos.x, debugCube._pos.y, debugCube._pos.z + 1);
            }
        }
    });
    return debugCube;
};
export const GetAnalyzerCubeWorld = (DVEW) => {
    const dataTool = DVEW.getDataTool();
    DVEW.parentComm.listenForMessage("get-data", (data) => {
        const x = data[1];
        const y = data[2];
        const z = data[3];
        if (!dataTool.loadInAt(x, y, z)) {
            console.log(`No data at: ${x} ${y} ${z}`);
            return false;
        }
        const l = dataTool.getLight();
        let logData = `%c|||||||||||||||||||||||||||||
# Data For ${x} ${y} ${z}   
|||||||||||||||||||||||||||||
> raw : ${dataTool.data.raw}
> id: ${dataTool.getId()}
> string id: ${dataTool.getStringId()}
> state: ${dataTool.getState()}
> shape state: ${dataTool.getShapeState()}
> level: ${dataTool.getLevel()}
> level state: ${dataTool.getLevelState()}
> light value: ${l}
> s: ${LightData.getS(l)}
> r: ${LightData.getR(l)}
> g: ${LightData.getG(l)}
> b: ${LightData.getB(l)}
> material: ${dataTool.getMaterial()}
> collider: ${dataTool.getCollider()}
|||||||||||||||||||||||||||||
`;
        console.log(logData, "color:cyan;font-wieght:bold;");
    });
};
