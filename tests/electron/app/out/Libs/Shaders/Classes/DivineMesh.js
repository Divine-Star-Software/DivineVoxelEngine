export class DivineMesh {
    id;
    data = {
        attributes: new Map(),
    };
    constructor(id) {
        this.id = id;
    }
    getAttributeList() {
        return [...this.data.attributes.keys()];
    }
    addAttributes(data) {
        for (const attributes of data) {
            this.data.attributes.set(attributes[0], attributes[1]);
        }
        return this;
    }
    clone(id) {
        const mesh = new DivineMesh(id);
        for (const dataKey in this.data) {
            const data = this.data[dataKey];
            if (data instanceof Map) {
                for (const [key, value] of data) {
                    mesh.data[dataKey].set(key, value);
                }
                continue;
            }
            if (Array.isArray(data)) {
                for (const node of data) {
                    if (!mesh.data[dataKey].includes(node)) {
                        mesh.data[dataKey].push(node);
                    }
                }
            }
        }
        return mesh;
    }
}
