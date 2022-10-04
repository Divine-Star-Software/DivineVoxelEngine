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
    DVER.textureManager.registerTexture("Item", {
        name: "Debug Texture",
        id: "debug",
        frames: 0,
    });
    DVER.textureManager.registerTexture("Item", {
        name: "Dream Vine Texture",
        id: "dream-vine",
        frames: 0,
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
        name: "Dream Stone",
        id: "dreamstone",
        frames: 0,
        variations: {
            "grassy-top": { frames: 0 },
            "grassy-side": { frames: 0 },
        },
    });
    DVER.textureManager.registerTexture("solid", {
        name: "Dread Stone",
        id: "dreadstone",
        frames: 0,
        variations: {
            "grassy-top": { frames: 0 },
            "grassy-side": { frames: 0 },
        },
    });
    DVER.textureManager.registerTexture("solid", {
        name: "Dream Holder Textures",
        id: "data-holder",
        frames: 0,
        variations: {
            front: { frames: 0 },
        },
    });
    DVER.textureManager.registerTexture("flora", {
        name: "Dream Grass Block",
        id: "dreamgrassblock",
        frames: 0,
        variations: {
            "grassy-top": { frames: 0 },
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
        name: "Dread Stone Pillar",
        id: "dreadstone-pillar",
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
    DVER.textureManager.registerTexture("solid", {
        name: "Dread Lanmp Texture",
        id: "dreadlamp",
        frames: 0,
    });
    DVER.textureManager.registerTexture("solid", {
        name: "Dream Log Texture",
        id: "dream-log",
        frames: 0,
    });
    DVER.textureManager.registerTexture("flora", {
        name: "Dream Grass Texture",
        id: "dreamgrass",
        frames: 0,
    });
    DVER.textureManager.registerTexture("flora", {
        name: "Dread Grass Texture",
        id: "dreadgrass",
        frames: 0,
    });
    DVER.textureManager.registerTexture("flora", {
        name: "Dream Vine Texture",
        id: "dream-vine",
        frames: 0,
    });
    DVER.textureManager.registerTexture("flora", {
        name: "Dream Leafs Texture",
        id: "dream-leafs",
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
    DVER.textureManager.registerTexture("fluid", {
        name: "Liquid Dread Ether Texture",
        id: "liquid-dread-ether",
        frames: 0,
        variations: {
            still: {
                frames: 6,
                animKeys: [1, 2, 3, 4, 5, 6, 5, 4, 3, 2],
                globalFrameTime: 2,
            },
        },
    });
    DVER.textureManager.registerTexture("fluid", {
        name: "Foam",
        id: "foam",
        frames: 0,
        variations: {
            bottom: { frames: 0 },
            top: { frames: 0 },
            left: { frames: 0 },
            right: { frames: 0 },
            cbl: { frames: 0 },
            cblbr: { frames: 0 },
            cblbrtl: { frames: 0 },
            cblbrtr: { frames: 0 },
            cbltltr: { frames: 0 },
            cbr: { frames: 0 },
            cbrtl: { frames: 0 },
            cbrtltr: { frames: 0 },
            cbrtr: { frames: 0 },
            ctl: { frames: 0 },
            ctlbr: { frames: 0 },
            ctltr: { frames: 0 },
            ctr: { frames: 0 },
            lb: { frames: 0 },
            lr: { frames: 0 },
            lrb: { frames: 0 },
            lrbt: { frames: 0 },
            lrt: { frames: 0 },
            lt: { frames: 0 },
            ltb: { frames: 0 },
            rb: { frames: 0 },
            rt: { frames: 0 },
            rtb: { frames: 0 },
            tb: { frames: 0 },
        },
        overlay: true,
    });
}
