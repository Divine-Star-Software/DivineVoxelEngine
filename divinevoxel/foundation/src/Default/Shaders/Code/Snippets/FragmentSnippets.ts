import type { URIShaderBuilder } from "@divinestar/uri/Shaders/URIShaderBuilder";
export function RegisterFragmentSnippets(builder: typeof URIShaderBuilder) {
 builder.snippets.create({
  id: "standard_color",
  body: {
   GLSL: () => /* glsl */`
  vec4 rgb = getBaseColor(vec2(0.,0.));
 // rgb = vec4(1.,1.,1.,1.);
  rgb = getColor(rgb);
  rgb = getAO(rgb);
  vec4 mixLight = getLight(rgb);
  vec3 finalColor = doFog(mixLight);

  FragColor = vec4(finalColor.rgb , rgb.a );



  if (FragColor.a < 0.05) { 
    discard;
  }
  #ifdef INSTANCES
  FragColor = vec4(1.,1.,1.,1.);
  #endif     
  `,
  },
 });
 builder.snippets.create({
  id: "skybox_frag",
  body: {
   GLSL: () => /* glsl */`
vec3 c = vFogColor.rgb;
c.r -= .2;
c.g -= .2;
c.b -= .2;
vec4 skyboxColor = vec4(c.rgb,1);
vec3 finalColor = doFog(skyboxColor);
FragColor = vec4(finalColor.rgb,1);
  `,
  },
 });
}
