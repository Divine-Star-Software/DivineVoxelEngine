export const CreateGUI = (DVER) => {
    let divFps = document.getElementById("fps");
    let position = document.getElementById("position");
    let chunkPosition = document.getElementById("chunk-position");
    return (engine, positionWatch) => {
        //@ts-ignore
        divFps.innerHTML = engine.getFps().toFixed() + " fps";
        //@ts-ignore
        position.innerHTML = `${positionWatch.position.x.toFixed(2)} ${positionWatch.position.y.toFixed(2)} ${positionWatch.position.z.toFixed(2)}`;
        if (DVER) {
            //@ts-ignore
            chunkPosition.innerHTML = DVER.UTIL
                .getWorldBounds()
                .getChunkKeyFromPosition(positionWatch.position.x, positionWatch.position.y, positionWatch.position.z);
        }
    };
};
