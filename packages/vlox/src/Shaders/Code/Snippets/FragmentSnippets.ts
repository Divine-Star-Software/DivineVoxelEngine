import type { URIShaderBuilder } from "@amodx/uri/Shaders/URIShaderBuilder";
export function RegisterFragmentSnippets(builder: typeof URIShaderBuilder) {
  builder.snippets.create({
    id: "white",
    body: {
     GLSL: () => /* glsl */`
    FragColor = vec4(1. );
    `,
    },
   });
   builder.snippets.create({
    id: "normal",
    body: {
     GLSL: () => /* glsl */`
 
    vec3 baseColor = vec3(
        abs(vNormal.x),  
        abs(vNormal.y),  
        abs(vNormal.z)   
    );
    vec3 tint = vec3(0.0, 0.0, 0.0);
    if (vNormal.x < 0.0) {
        tint.x = 0.5;
    }
    if (vNormal.y < 0.0) {
        tint.y = 0.5;
    }
    if (vNormal.z < 0.0) {
        tint.z = 0.5;
    }
    vec3 finalColor = baseColor - tint;
    FragColor = vec4(finalColor, 1.0);
    `,
    },
   });
   builder.snippets.create({
    id: "standard_color_only",
    body: {
     GLSL: () => /* glsl */`
  vec4 rgb = getBaseColor(vec2(0.,0.));

    FragColor = rgb;
    if (FragColor.a < 0.5) { 
      discard;
    }
    `,
    },
   });
  builder.snippets.create({
    id: "standard_color_ao_only",
    body: {
     GLSL: () => /* glsl */`
  
   
  
    vec4 rgb = vec4(1.);
  
    rgb = getAO(rgb);
  
    FragColor = vec4(rgb.rgb , rgb.a );
  
    if (FragColor.a < 0.5) { 
      discard;
    }
    `,
    },
   });
   builder.snippets.create({
    id: "standard_color_light_only",
    body: {
     GLSL: () => /* glsl */`
    vec4 rgb = vec4(1.);
    vec4 mixLight = getLight(rgb);
    FragColor = mixLight;
    if (FragColor.a < 0.5) { 
      discard;
    }
    `,
    },
   });
   builder.snippets.create({
    id: "standard_color_ao_and_light_only",
    body: {
     GLSL: () => /* glsl */`
 vec4 rgb = vec4(1.);

rgb = getAO(rgb);
vec4 mixLight = getLight(rgb);
vec3 finalColor = doFog(mixLight);
FragColor = vec4(finalColor.rgb , rgb.a );

if (FragColor.a < 0.5) { 
  discard;
}

    `,
    },
   });
 builder.snippets.create({
  id: "standard_color",
  body: {
   GLSL: () => /* glsl */`
vec4 rgb = getBaseColor(vec2(0.,0.));

  rgb = getAO(rgb);
  rgb = getColor(rgb); 
  vec4 mixLight = getLight(rgb);
  vec3 finalColor = doFog(mixLight);

  FragColor = vec4(finalColor.rgb , rgb.a );

  if (FragColor.a < 0.5) { 
    discard;
  }

  `,
  },
 });
 builder.snippets.create({
  id: "standard_transparent_color",
  body: {
   GLSL: () => /* glsl */`
vec4 rgb = getBaseColor(vec2(0.,0.));

  rgb = getAO(rgb);
  rgb = getColor(rgb); 
  vec4 mixLight = getLight(rgb);
  vec3 finalColor = doFog(mixLight);

  FragColor = vec4(finalColor.rgb , rgb.a );

  if (FragColor.a < 0.01) { 
    discard;
  }

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
