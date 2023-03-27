//objects
import { WorldBounds } from "../../Data/World/WorldBounds.js";
import { WorldGenRegister } from "./Register/WorldGenRegister.js";
//tools
import { WorldGenBrush } from "../Tools/WorldGenBrush.js";
export const WorldGeneration = {
    worldGen: null,
    register: WorldGenRegister,
    worldBounds: WorldBounds,
    _brushes: [],
    setWorldGen(worldGen) {
        this.worldGen = worldGen;
    },
    async generate(data, mode, onDone) {
        if (!this.worldGen) {
            throw new Error(`A World Generator must be set.`);
        }
        const requestsId = WorldGenRegister.registerRequest(data[0]);
        for (const brush of this._brushes) {
            brush.requestsId = requestsId;
        }
        if (mode == "generate") {
            await this.worldGen.generate(data);
        }
        if (mode == "decorate") {
            await this.worldGen.decorate(data);
        }
        const inte = setInterval(() => {
            if (WorldGenRegister.attemptRequestFullFill(requestsId)) {
                onDone();
                clearInterval(inte);
            }
        }, 100);
    },
    getBrush() {
        const brush = new WorldGenBrush();
        this._brushes.push(brush);
        return brush;
    },
};
