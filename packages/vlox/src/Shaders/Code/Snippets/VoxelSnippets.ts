import type { URIShaderBuilder } from "@amodx/uri/Shaders/URIShaderBuilder";
export function RegisterVoxelSnippets(builder: typeof URIShaderBuilder) {
  builder.snippets.create({
    id: "#dve_solid_vertex",
    body: {
      GLSL: () => `@standard_position`,
    },
  });
  builder.snippets.create({
    id: "#dve_solid_frag",
    body: {
      GLSL: () => `@standard_color`,
    },
  });
  builder.snippets.create({
    id: "#dve_transparent_vertex",
    body: {
      GLSL: () => `@standard_position`,
    },
  });
  builder.snippets.create({
    id: "#dve_transparent_frag",
    body: {
      GLSL: () => `@standard_transparent_color`,
    },
  });
  builder.snippets.create({
    id: "#dve_glow_vertex",
    body: {
      GLSL: () => `@standard_position`,
    },
  });
  builder.snippets.create({
    id: "#dve_glow_frag",
    body: {
      GLSL: () => `@standard_color`,
    },
  });

  builder.snippets.create({
    id: "#dve_flora_vertex",
    body: {
      GLSL: () => /* glsl */ `vec3 p = position;

#ifdef INSTANCES
      mat4 finalWorld = mat4(world0,world1,world2,world3); 

      vDistance = 0.;


      finalWorld[3].xyz += worldOrigin.xyz;
      gl_Position = viewProjection *   finalWorld * vec4(position, 1.0);  
#endif      
#ifndef INSTANCES
    vec4 worldPosition = world * vec4(p , 1.0);

    if(doEffects == 1.){

        if(VOXEL[1].y == 1.) {
          p.xz = dve_crossed_panel_wind_anim(worldPosition, p).xz;
        }
        if(VOXEL[1].y == 2.) {
          p.xz = dve_flat_panel_wind_anim(worldPosition, p).xz;
        }
        if(VOXEL[1].y == 3.) {
          p.xz = dve_cube_wind_anim(worldPosition, p).xz;
        }
      }
   
    gl_Position = viewProjection * world * vec4(p, 1.0); 
#endif

#ifdef THREE 
gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
#endif

  `,
    },
  });
  builder.snippets.create({
    id: "#dve_flora_frag",
    body: {
      GLSL: () => `@standard_color`,
    },
  });
  builder.snippets.create({
    id: "#dve_liquid_vertex",
    body: {
      GLSL: () => /* glsl */ `
  vFlow = 0.;
  if(VOXEL[1].y == 1.) {
    vFlow = -1.;
  }
  if(VOXEL[1].y == 2.) {
    vFlow = 1.;
  }


#ifdef INSTANCES
  mat4 finalWorld = mat4(world0,world1,world2,world3); 

  vDistance = 0.;


  finalWorld[3].xyz += worldOrigin.xyz;
  gl_Position = viewProjection *   finalWorld * vec4(position, 1.0);  
#endif  

#ifndef INSTANCESw
  vec3 p = position;
  vec4 worldPosition = world * vec4(p , 1.0);
  
  if(doEffects == 1.){
  float height = fbm(worldPosition.xz * 0.08 + time * .01);
    p.y += (height * 0.03) - .05;
   }
  
  gl_Position = viewProjection * world * vec4(p, 1.0); 
#endif

#ifdef THREE 
gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
#endif

  `,
    },
  });
  builder.snippets.create({
    id: "#dve_liquid_frag",
    body: {
      GLSL: () => /* glsl */ `
  vec4 rgb = getBaseColor(vec2(0.,time * .01 * -4. * vFlow));
  rgb = getColor(rgb);
  vec4 mixLight = getLight(rgb);
  vec3 finalColor = doFog(mixLight);
  FragColor = vec4(finalColor.rgb ,.7 );`,
    },
  });
}
