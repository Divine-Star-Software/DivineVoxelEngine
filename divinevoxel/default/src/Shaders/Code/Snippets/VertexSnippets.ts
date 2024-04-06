import type { DivineShaderBuilder } from "@divinestar/shaders";
export function RegisterVertexSnippets(builder: typeof DivineShaderBuilder) {
 builder.snippets.create({
  id: "standard_position",
  body: {
   GLSL: () => /* glsl */`
#ifdef INSTANCES
      mat4 finalWorld = mat4(world0,world1,world2,world3); 

      vDistance = distance(cameraPOS , finalWorld[3].xyz );
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
