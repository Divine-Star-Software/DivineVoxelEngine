import type { DVEShaderBuilder } from "Libs/Shaders/DVEShaderBuilder";
export function RegisterVertexSnippets(builder: typeof DVEShaderBuilder) {
 builder.createSnippet("standard_position", {
  GLSL: `
    vec4 worldPosition = world * vec4(position, 1.0);
    gl_Position = viewProjection * world * vec4(position, 1.0); 
    `,
 });
}
