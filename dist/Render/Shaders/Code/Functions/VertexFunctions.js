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
    builder.functions.create("dve_crossed_panel_wind_anim", {
        setID: "#dve_vertex",
        inputs: [
            ["posWorld", "vec4"],
            ["p", "vec3"],
        ],
        output: "vec3",
        arguments: {},
        body: {
            GLSL: () => `
 p.xz += fbm(posWorld.xz * 0.15 + time) * 0.05;
return p;`,
        },
    });
    builder.functions.create("dve_panel_wind_anim", {
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
    builder.functions.create("dve_box_wind_anim", {
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
