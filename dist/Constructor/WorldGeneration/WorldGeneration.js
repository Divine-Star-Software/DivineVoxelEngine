//objects
import { WorldBounds } from "../../Data/World/WorldBounds.js";
import { GetConstructorBrush } from "../../Constructor/Tools/Brush/ConstructorBrush.js";
import { WorldGenRegister } from "./Register/WorldGenRegister.js";
export const WorldGeneration = {
    worldGen: null,
    register: WorldGenRegister,
    worldBounds: WorldBounds,
    _brushes: [],
    setWorldGen(worldGen) {
        this.worldGen = worldGen;
    },
    generate(data, onDone) {
        if (!this.worldGen) {
            throw new Error(`A World Generator must be set.`);
        }
        const [dimension, x, y, z] = data[0];
        const genData = data[1];
        const requestsId = WorldGenRegister.registerRequest(dimension, x, y, z);
        for (const brush of this._brushes) {
            brush.requestsId = requestsId;
        }
        this.worldGen.generate(dimension, x, y, z, genData);
        const inte = setInterval(() => {
            if (WorldGenRegister.attemptRequestFullFill(requestsId)) {
                onDone();
                clearInterval(inte);
            }
        }, 100);
    },
    getBrush() {
        const brush = GetConstructorBrush();
        this._brushes.push(brush);
        return brush;
    },
};
