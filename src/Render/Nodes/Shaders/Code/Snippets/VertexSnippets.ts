import type { DivineShaderBuilder } from "divine-shaders";
export function RegisterVertexSnippets(builder: typeof DivineShaderBuilder) {
 builder.snippets.create({
  id: "standard_position",
  body: {
   GLSL: () => `
#ifdef INSTANCES
      mat4 finalWorld = mat4(world0,world1,world2,world3); 

      vDistance = 0.;
      mipMapLevel = 0.;

      finalWorld[3].xyz += worldOrigin.xyz;
      gl_Position = viewProjection *   finalWorld * vec4(position, 1.0);  
#endif      
#ifndef INSTANCES
      vec4 worldPosition = world * vec4(position, 1.0);
      gl_Position = viewProjection * world * vec4(position, 1.0); 
#endif

    `,
  },
 });
}
