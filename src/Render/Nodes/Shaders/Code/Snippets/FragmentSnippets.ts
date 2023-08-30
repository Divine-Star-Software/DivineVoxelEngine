import type { DivineShaderBuilder } from "divine-shaders";
export function RegisterFragmentSnippets(builder: typeof DivineShaderBuilder) {
 builder.snippets.create({
  id: "standard_color",
  body: {
   GLSL: () => /* glsl */`
  vec4 rgb = getBaseColor(vec2(0.,0.));
 if (rgb.a < 0.5) { 
    discard;
  }
  rgb = getColor(rgb);
  rgb = getAO(rgb);
  vec4 mixLight = getLight(rgb);
  vec3 finalColor = doFog(mixLight);
  FragColor = vec4(finalColor.rgb , rgb.w );
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
