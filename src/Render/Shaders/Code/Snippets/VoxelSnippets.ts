import type { DivineShaderBuilder } from "divine-shaders";
export function RegisterVoxelSnippets(builder: typeof DivineShaderBuilder) {
 builder.snippets.create( {
  id: "#dve_solid_vertex",
  body: {
   GLSL: () => `@standard_position`,
  },
 });
 builder.snippets.create( {
  id: "#dve_solid_frag",
  body: {
   GLSL: () => `@standard_color`,
  },
 });
 builder.snippets.create( {
  id: "#dve_flora_vertex",
  body: {
   GLSL: () => `vec3 p = position;
  vec4 worldPosition = world * vec4(p , 1.0);

  if(doEffects == 1.){
    if(vDistance < 50.) {
      if(VOXEL[1].y == 1.) {
        p.xz = dve_crossed_panel_wind_anim(worldPosition, p).xz;
      }
      if(VOXEL[1].y == 2.) {
        p.xz = dve_panel_wind_anim(worldPosition, p).xz;
      }
      if(VOXEL[1].y == 3.) {
        p.xz = dve_box_wind_anim(worldPosition, p).xz;
      }
    }
  }
  gl_Position = viewProjection * world * vec4(p, 1.0); `,
  },
 });
 builder.snippets.create({
  id: "#dve_flora_frag",
  body: {
   GLSL: () => `@standard_color`,
  },
 });
 builder.snippets.create( {
  id: "#dve_liquid_vertex",
  body: {
   GLSL: () => `
  vFlow = 0.;
  if(VOXEL[1].y == 1.) {
    vFlow = 1.;
  }
  if(VOXEL[1].y == 2.) {
    vFlow = -1.;
  }
  
  vec3 p = position;
  vec4 worldPosition = world * vec4(p , 1.0);
  if(doEffects == 1.){
  float height = fbm(worldPosition.xz * 0.08 + time);
    p.y += (height * 0.03) - .05;
   }
  
  gl_Position = viewProjection * world * vec4(p, 1.0); `,
  },
 });
 builder.snippets.create( {
  id: "#dve_liquid_frag",
  body: {
   GLSL: () => `
  vec4 rgb = getBaseColor(vec2(0.,time * -4. * vFlow));
  rgb = getColor(rgb);
  vec4 mixLight = getLight(rgb);
  vec3 finalColor = doFog(mixLight);
  FragColor = vec4(finalColor.rgb , .6 );`,
  },
 });
 builder.snippets.create({
  id: "#dve_magma_vertex",
  body: {
   GLSL: () => `@standard_position`,
  },
 });
 builder.snippets.create({
  id: "#dve_magma_frag",
  body: {
   GLSL: () => `"@#dve_liquid_frag`,
  },
 });
}
