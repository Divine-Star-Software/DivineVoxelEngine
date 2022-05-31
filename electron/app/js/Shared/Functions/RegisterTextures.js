export function RegisterTexutres(DVER) {
    DVER.textureManager.defineDefaultTexturePath("assets/textures");
    DVER.textureManager.registerTexture("solid", {
        name: "Debug Texture",
        id: "debug",
        frames: 0,
        variations: {
            top: { frames: 0 },
            bottom: { frames: 0 },
            north: { frames: 0 },
            south: { frames: 0 },
            east: { frames: 0 },
            west: { frames: 0 },
        },
    });
    DVER.textureManager.registerTexture("solid", {
        name: "Light Debug Texture",
        id: "light-debug",
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
    });
    DVER.textureManager.registerTexture("solid", {
        name: "Dream Stone Textures",
        id: "dreamstone",
        frames: 0,
        variations: {
            "grassy-top": { frames: 0 },
            "grassy-side": { frames: 0 },
        },
    });
    DVER.textureManager.registerTexture("solid", {
        name: "Dream Stone Pillar",
        id: "dreamstone-pillar",
        frames: 0,
        variations: {
            "side-bottom": { frames: 0 },
            "side-top": { frames: 0 },
            top: { frames: 0 },
        },
    });
    DVER.textureManager.registerTexture("solid", {
        name: "Dream Lanmp Texture",
        id: "dreamlamp",
        frames: 0,
    });
    DVER.textureManager.registerTexture("flora", {
        name: "Dream Grass Texture",
        id: "dreamgrass",
        frames: 0,
    });
    DVER.textureManager.registerTexture("fluid", {
        name: "Liquid Dream Ether Texture",
        id: "liquid-dream-ether",
        frames: 0,
        variations: {
            still: {
                frames: 6,
                animKeys: [1, 2, 3, 4, 5, 6, 5, 4, 3, 2],
                globalFrameTime: 2,
            },
        },
    });
}
