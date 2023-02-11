export function RegisterVertexFunctions(builder) {
    builder.functions.create("getAnimationType", {
        setID: "#dve_vertex",
        inputs: [],
        output: "int",
        arguments: {},
        body: {
            GLSL: () => `
int index = int(faceData);
return  index & 0xff;`,
        },
    });
    builder.functions.create("animType1", {
        setID: "#dve_vertex",
        inputs: [
            ["posWorld", "vec4"],
            ["p", "vec3"],
        ],
        output: "vec3",
        arguments: {},
        body: {
            GLSL: () => `
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
    builder.functions.create("animType2", {
        setID: "#dve_vertex",
        inputs: [
            ["posWorld", "vec4"],
            ["p", "vec3"],
        ],
        output: "vec3",
        arguments: {},
        body: {
            GLSL: () => `
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
    builder.functions.create("animType3", {
        setID: "#dve_vertex",
        inputs: [
            ["posWorld", "vec4"],
            ["p", "vec3"],
        ],
        output: "vec3",
        arguments: {},
        body: {
            GLSL: () => `
float height = fbm(posWorld.xz * 0.08 + time );
p.xz += height * 0.05;
return p;`,
        },
    });
}
