export async function ReigsterSounds(DAE) {
    await DAE.effects.preloadReverbBuffers(["Vaneev/Block Inside"]);
    DAE.sfx.registerSFX([
        {
            path: "./assets/audio/sfx/electric-gong.wav",
            id: "explode",
            channel: "sfx",
            is3dSound: true,
            varations: [
                {
                    playBackRate: 0.8,
                    effects: {
                        reverb: {
                            builtIn: "Vaneev/Block Inside",
                            level: 1.2,
                        },
                    },
                },
            ],
            _3dSoundData: {
                rolloffFactor: 1,
            },
        },
    ]);
    DAE.sfx.registerSFX([
        {
            path: "./assets/audio/sfx/item-pickup.wav",
            id: "place",
            channel: "sfx",
            is3dSound: true,
            _3dSoundData: {
                rolloffFactor: 1,
            },
            varations: [
                {
                    playBackRate: 0.3,
                },
                {
                    playBackRate: 0.5,
                },
            ],
        },
    ]);
    DAE.music.registerMusicTracks([
        {
            channel: "music",
            id: "main",
            loop: true,
            level: 0.3,
            path: "./assets/audio/music/morning-star.mp3",
        },
    ]);
}
