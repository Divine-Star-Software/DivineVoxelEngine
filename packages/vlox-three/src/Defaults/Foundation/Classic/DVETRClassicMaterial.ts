import {
  Matrix,
  Vector2,
  Vector3,
  Scene,
  Vector4,
  DoubleSide,
  ShaderMaterialParameters,
  Matrix4,
  Matrix3,
  ShaderMaterial,
  GLSL3,
  BackSide,
} from "three";
import { TextureManager } from "@divinevoxel/foundation/Textures/TextureManager.js";
import { URIShader } from "@amodx/uri/Shaders/Classes/URIShader.js";
import {
  URIMaterial,
  URIMaterialData,
} from "@amodx/uri/Materials/URIMaterial.js";
import { DVETRScene } from "../../../Scene/DVETRScene.js";
import { URIScene } from "@amodx/uri/Scenes/URIScene.js";
import { URITexture } from "@amodx/uri/Textures/URITexture.js";
import { DefaultMaterialManager } from "../DefaultMaterialManager";

type DVETRClassicMaterialBaseData = {
  textureTypeId: string;
  shaderId: string;
};

export type DVETRClassicMaterialData = URIMaterialData<
  DVETRScene,
  DVETRClassicMaterialBaseData
>;

export class DVEBRClassicMaterial extends URIMaterial<
  DVETRScene,
  DVETRClassicMaterialBaseData,
  ShaderMaterial
> {
  scene: Scene;

  shader: URIShader;

  afterCreate: ((material: ShaderMaterial) => void)[] = [];
  constructor(public id: string, public data: DVETRClassicMaterialData) {
    super();
  }

  createMaterial(scene: Scene): ShaderMaterial | false {
    this.scene = scene;
    this._create(this.data);
    return this._material;
  }

  _create(data: DVETRClassicMaterialData): ShaderMaterial {
    const type = TextureManager.getTextureType(
      data.data.textureTypeId ? data.data.textureTypeId : this.id
    );

    if (!type && data.data.textureTypeId) {
      throw new Error(
        `Could find the texture type for material ${this.id}. Texture typeid:  ${data.data.textureTypeId}`
      );
    }
    const shader = DefaultMaterialManager.shaders.register.get(
      data.data.shaderId
    );

    if (!shader) {
      throw new Error(
        `Could find the shader for material ${this.id}. Shader id:  ${data.data.shaderId}`
      );
    }
    if (type) type.addToShader(shader);
    const threeShader = shader.clone("three");

    threeShader.data.vertexUniforms.delete("cameraPosition");
    threeShader.data.sharedUniforms.delete("cameraPosition");
    threeShader.data.mesh.data.attributes.delete("position");
    threeShader.data.mesh.data.attributes.delete("normal");

    threeShader.compile("");
    this.shader = threeShader;
    const uniforms: ShaderMaterialParameters["uniforms"] = {};
    //   console.log(threeShader.compiled,threeShader.data,shader.data);
    for (const [key, [id, type]] of threeShader.getUniformDataList()) {
      if (key == "cameraPosition") continue;
      if (type == "ignore") continue;
      if (type == "float") {
        uniforms[key] = {
          value: 0,
        };
        continue;
      }
      if (type == "vec2") {
        uniforms[key] = {
          value: new Vector2(0, 0),
        };
        continue;
      }
      if (type == "vec3") {
        uniforms[key] = {
          value: new Vector3(0, 0, 0),
        };
        continue;
      }
      if (type == "vec4") {
        uniforms[key] = {
          value: new Vector4(0, 0, 0, 0),
        };
        continue;
      }
      if (type == "mat3") {
        uniforms[key] = {
          value: new Matrix3(),
        };
        continue;
      }
      if (type == "mat4") {
        uniforms[key] = {
          value: new Matrix4(),
        };
        continue;
      }
    }
    const vertexShader = `
    void main() {
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
    `;

    const fragmentShader = `

    out vec4 FragColor;  
    void main() {
      FragColor = vec4(1.0, 0.0, 0.0, 1.0); // Red color
    }
    `;
    const shaderMaterial = new ShaderMaterial({
      vertexShader: threeShader.compiled.vertex,
      fragmentShader: threeShader.compiled.fragment,
      //  blendAlpha: data.alphaBlending ? 1 : 0,
      //   alphaTest: data.alphaTesting ? 1 : 0,
      side: BackSide,
      fog: true,
      glslVersion: GLSL3,
      defines: {
        THREE: 1,
      },
    });
    this._material = shaderMaterial;

    shaderMaterial.wireframe = true;
    if (data.alphaBlending) {
      //   shaderMaterial.separateCullingPass = true;
      shaderMaterial.side = DoubleSide;
      //  shaderMaterial.forceDepthWrite = true;
      //   shaderMaterial.needDepthPrePass = true;
    }

    if (type) type.addToMaterial(this);
    shaderMaterial.depthWrite;
    this.setVector3("worldOrigin", 0, 0, 0);

    if (data.mipMapBias) {
      this.setNumber("mipMapBias", data.mipMapBias);
    }

    this.afterCreate.forEach((_) => _(this._material));
    return this._material;
  }
  _setUnfirom(uniform: string, value: any) {
    if (!this._material.uniforms[uniform])
      this._material.uniforms[uniform] = { value: 0 as any };
    this._material.uniforms[uniform].value = value;
  }
  setTextureArray(
    samplerId: string,
    sampler: URITexture<URIScene<any>, any>[]
  ): void {
    this._setUnfirom(
      samplerId,
      sampler.map((_) => _._texture)
    );
  }
  setTexture(samplerId: string, sampler: URITexture<URIScene<any>, any>): void {
    this._setUnfirom(samplerId, sampler._texture);
  }
  setNumber(uniform: string, value: number): void {
    this._setUnfirom(uniform, value);
  }
  setNumberArray(uniform: string, value: ArrayLike<number>): void {
    this._setUnfirom(uniform, value);
  }
  setVector2(uniform: string, x: number, y: number): void {
    this._setUnfirom(uniform, new Vector2(x, y));
  }
  setVector3(uniform: string, x: number, y: number, z: number): void {
    this._setUnfirom(uniform, new Vector3(x, y, z));
  }
  setVector4(
    uniform: string,
    x: number,
    y: number,
    z: number,
    w: number
  ): void {
    this._setUnfirom(uniform, new Vector4(x, y, z, w));
  }
  setMatrix<MatrixType = Matrix>(uniform: string, matrix: MatrixType): void {
    this._material.uniforms[uniform].value = matrix;
    this._setUnfirom(uniform, matrix);
  }
}
