import { CrystalCompressor } from "../../Libs/CC/index.js";
export const DataFileServer = {
    async loadRegion(location) {
        const message = {
            type: "load-region",
            location: location,
        };
        const response = await fetch("http://127.0.0.1:3000", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(message),
        });
        const text = await response.text();
        const regionArray = new Uint8Array(text.length);
        let length = text.length;
        for (let i = 0; i < length; i++) {
            regionArray[i] = text[i].charCodeAt(0);
        }
        const unCompressed = await CrystalCompressor.decompressArray(regionArray.buffer, "Uint8");
        return unCompressed.buffer;
    },
    async saveRegion(location, buffer) {
        const compressed = await CrystalCompressor.compressArray(new Uint8Array(buffer));
        let regionString = ``;
        let length = compressed.length;
        for (let i = 0; i < length; i++) {
            regionString += String.fromCharCode(compressed[i]);
        }
        const json = JSON.stringify({
            type: "save-region",
            location: location,
        });
        const message = `|${json}|${regionString}`;
        await fetch("http://127.0.0.1:3000", {
            method: "POST",
            body: message,
            headers: { "Content-Type": "dve/region" },
        });
    },
};
