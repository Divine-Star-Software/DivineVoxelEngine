export const CreateGUI = (DVER) => {
    let divFps = document.getElementById("fps");
    let position = document.getElementById("position");
    let chunkPosition = document.getElementById("chunk-position");
    let gui = document.getElementById("gui");
    let opetionsMenu = document.getElementById("opetionsMenu");
    const guiState = {
        active: true,
        opetionsMenuActive: false,
        noPointerLock: false,
    };
    window.addEventListener("keydown", (event) => {
        if (event.key == "F1") {
            if (!gui || !opetionsMenu)
                return;
            guiState.active = !guiState.active;
            if (guiState.active) {
                guiState.noPointerLock = false;
                gui.style.display = "block";
                opetionsMenu.style.display = "none";
            }
            else {
                gui.style.display = "none";
            }
        }
        if (event.key == "F2") {
            if (!gui || !opetionsMenu)
                return;
            guiState.opetionsMenuActive = !guiState.opetionsMenuActive;
            if (guiState.opetionsMenuActive) {
                guiState.noPointerLock = true;
                document.exitPointerLock();
                opetionsMenu.style.display = "block";
                gui.style.display = "none";
            }
            else {
                guiState.noPointerLock = false;
                opetionsMenu.style.display = "none";
            }
        }
        if (event.key == "F7") {
            if (!DVER)
                return;
            //@ts-ignore
            const scene = DVER.render.getScene();
            if (!scene.debugLayer.isVisible()) {
                document.exitPointerLock();
                guiState.noPointerLock = true;
                scene.debugLayer.show();
            }
            else {
                guiState.noPointerLock = false;
                scene.debugLayer.hide();
            }
        }
    });
    window.addEventListener("click", (event) => {
        if (guiState.noPointerLock) {
            document.exitPointerLock();
        }
    });
    return (engine, positionWatch) => {
        //@ts-ignore
        divFps.innerHTML = engine.getFps().toFixed() + " fps";
        //@ts-ignore
        position.innerHTML = `${positionWatch.position.x.toFixed(2)} ${positionWatch.position.y.toFixed(2)} ${positionWatch.position.z.toFixed(2)}`;
        if (DVER) {
            const pos = DVER.data.spaces.chunk.getPositionXYZ(positionWatch.position.x, positionWatch.position.y, positionWatch.position.z);
            //@ts-ignore
            chunkPosition.innerHTML = `chunk: x: ${pos.x} y: ${pos.y} z: ${pos.z}`;
        }
    };
};
