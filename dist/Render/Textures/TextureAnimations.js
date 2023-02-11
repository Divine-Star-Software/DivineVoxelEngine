export const TextureAnimationCreator = {
    createAnimations(texture) {
        for (const [key, segment] of texture.textureSegments) {
            const animaitonUniform = [];
            let i = 0;
            for (const anim of segment.animationsMap) {
                animaitonUniform[anim[0]] = anim[0];
                let keyCounts = [];
                const animTime = segment.animationTimes[i];
                if (animTime.length == 1) {
                    for (let k = 0; k < anim.length; k++) {
                        keyCounts.push(animTime[0]);
                    }
                }
                else {
                    keyCounts = segment.animationTimes[i];
                }
                segment.animations.push({
                    uniformIndex: anim[0],
                    keys: anim,
                    currentFrame: 0,
                    currentCount: 0,
                    keyCounts: keyCounts,
                });
                i++;
            }
            segment.animationUniforID =
                `${texture.id}_${key}_texture_animations`.replace("#", "");
            segment.varyingID = `${texture.id}_${key}_texture_varying`.replace("#", "");
            const functionName = `get_${texture.id}_${key}_texture_animation_frame`.replace("#", "");
            texture.shader.addUniform([
                [segment.animationUniforID, "float", animaitonUniform.length + 1],
            ]);
            if (segment.mode == "sampler") {
                texture.shader.addFunction(functionName, "vertex", {
                    inputs: [["uv", "float"]],
                    output: "float",
                    arguments: {},
                    body: {
                        GLSL: () => `    int index =  int(uv); 
        float aUV = ${segment.animationUniforID}[index];
        if(aUV != 0.){
            return aUV;
        }
        return uv;`,
                    },
                });
                texture.shader.addVarying([
                    {
                        id: segment.varyingID,
                        type: "vec3",
                        body: {
                            GLSL: () => `${segment.varyingID} = ${segment.attributeID};
       ${segment.varyingID}.z = ${functionName}(${segment.varyingID}.z);
       `,
                        },
                    },
                ]);
            }
            if (segment.mode == "overlay") {
                texture.shader.addFunction(functionName, "vertex", {
                    inputs: [],
                    output: "vec4",
                    arguments: {
                        attributeID: segment.attributeID,
                    },
                    body: {
                        GLSL: (args) => `
        vec4 frames = vec4(0., 0., 0., 0.);

        int index =  int(${args.attributeID}.x); 
        frames.x = ${segment.animationUniforID}[index];
        if(frames.x != 0.){
            frames.x = ${segment.attributeID}.x;
        }

        index =  int(${args.attributeID}.y); 
        frames.y = ${segment.animationUniforID}[index];
        if(frames.y != 0.){
            frames.y = ${segment.attributeID}.y;
        }

        index =  int(${args.attributeID}.z); 
        frames.z = ${segment.animationUniforID}[index];
        if(frames.z != 0.){
            frames.z = ${args.attributeID}.z;
        }

        index =  int(${args.attributeID}.w); 
        frames.w = ${segment.animationUniforID}[index];
        if(frames.w != 0.){
            frames.w = ${args.attributeID}.w;
        }

        return frames;`,
                    },
                });
                texture.shader.addVarying([
                    {
                        id: segment.varyingID,
                        type: "vec4",
                        body: {
                            GLSL: () => `${segment.varyingID} = ${functionName}();`,
                        },
                    },
                ]);
            }
            for (let i = 0; i < animaitonUniform.length; i++) {
                if (!animaitonUniform[i]) {
                    animaitonUniform[i] = 0;
                }
            }
            segment.animationUniform = new Float32Array(animaitonUniform);
        }
    },
};
