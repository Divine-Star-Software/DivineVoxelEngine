export function RegisterVertexFunctions(builder) {
    builder.createFunction("getAnimationType", {
        inputs: [],
        output: "int",
        body: {
            GLSL: `
int index = int(faceData);
return  index & 0xff;`,
        },
    });
    builder.createFunction("animType1", {
        inputs: [
            ["posWorld", "vec4"],
            ["p", "vec3"],
        ],
        output: "vec3",
        body: {
            GLSL: `
if(cuv3.y == 0. && normal.y != 1. && normal.y != -1.)  {
    float heightX = fbm(posWorld.xz * 0.15 + time);
    p.xz += heightX * 0.05;
}
if( cuv3.z == 1. && normal.y != 1. && normal.y != -1.) {
    float heightX = fbm(posWorld.xz * 0.15 + time);
    p.xz -= heightX * 0.06;
}
if(normal.y == 1. ) {
    float heightX = fbm(posWorld.xz * 0.15 + time);
    p.xz += heightX * 0.05;
}
return p;`,
        },
    });
    builder.createFunction("animType2", {
        inputs: [
            ["posWorld", "vec4"],
            ["p", "vec3"],
        ],
        output: "vec3",
        body: {
            GLSL: `
float height = fbm(posWorld.xz * 0.08 + time );
if(normal.z == 1.) {
    p.z += height * 0.05;
} else
if(normal.z == -1.) {
    p.z -= height * 0.05;
} else {
    p.z += height * 0.05; 
}
if(normal.x == 1.) {
    p.x += height * 0.05;
} else
if(normal.x == -1.) {
    p.x -= height * 0.05;
} else {
    p.x += height * 0.05; 
}
return p;`,
        },
    });
    builder.createFunction("animType3", {
        inputs: [
            ["posWorld", "vec4"],
            ["p", "vec3"],
        ],
        output: "vec3",
        body: {
            GLSL: `
float height = fbm(posWorld.xz * 0.08 + time );
p.xz += height * 0.05;
return p;`,
        },
    });
    return ["getAnimationType", "animType1", "animType2", "animType3"];
}
