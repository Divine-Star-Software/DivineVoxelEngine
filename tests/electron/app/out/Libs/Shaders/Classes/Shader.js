export class DVEShader {
    id;
    data;
    constructor(id, data) {
        this.id = id;
        this.data = data;
    }
    addUniform(data, forSharer = "shared") {
        if (forSharer == "shared") {
            for (const uniform of data) {
                this.data.sharedUniforms.set(uniform[0], uniform[1]);
            }
            return this;
        }
        if (forSharer == "vertex") {
            for (const uniform of data) {
                this.data.vertexUniforms.set(uniform[0], uniform[1]);
            }
            return this;
        }
        if (forSharer == "frag") {
            for (const uniform of data) {
                this.data.fragxUniforms.set(uniform[0], uniform[1]);
            }
            return this;
        }
        return this;
    }
    addVarying(data) {
        for (const varying of data) {
            this.data.varying.set(varying[0], [varying[1], varying[2]]);
        }
        return this;
    }
    addAttributes(data) {
        for (const attributes of data) {
            this.data.attributes.set(attributes[0], attributes[1]);
        }
        return this;
    }
    addTextures(data) {
        for (const attributes of data) {
            this.data.textures.set(attributes[0], attributes[1]);
        }
        return this;
    }
    addFunctions(id, forSharer = "shared") {
        if (forSharer == "shared") {
            if (Array.isArray(id)) {
                this.data.sharedFunctions.push(...id);
                return this;
            }
            this.data.sharedFunctions.push(id);
            return this;
        }
        if (forSharer == "vertex") {
            if (Array.isArray(id)) {
                this.data.vertexFunctions.push(...id);
                return this;
            }
            this.data.vertexFunctions.push(id);
            return this;
        }
        if (forSharer == "frag") {
            if (Array.isArray(id)) {
                this.data.fragFunctions.push(...id);
                return this;
            }
            this.data.fragFunctions.push(id);
            return this;
        }
        return this;
    }
}
