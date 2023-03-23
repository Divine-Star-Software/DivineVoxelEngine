import { QuadVertexes } from "../Types";
export declare class QuadVertexData {
    vetexes: Record<QuadVertexes, number>;
    getAsArray(): number[];
    setVertex(vertex: QuadVertexes, value: number): void;
    addToVertex(vertex: QuadVertexes, value: number): void;
    subtractFromVertex(vertex: QuadVertexes, value: number): void;
    getVertex(vertex: QuadVertexes): number;
    setAll(value: number): void;
    set(v1: number, v2: number, v3: number, v4: number): void;
    setFromQuadData(vertexData: QuadVertexData): void;
    addAll(value: number): void;
    add(v1: number, v2: number, v3: number, v4: number): void;
    subtractAll(value: number): void;
    subtract(v1: number, v2: number, v3: number, v4: number): void;
    isEqualTo(v1: number, v2: number, v3: number, v4: number): boolean;
    isAllEqualTo(value: number): boolean;
    isGreaterThan(v1: number, v2: number, v3: number, v4: number): boolean;
    isAllGreaterThan(value: number): boolean;
    isLessThan(v1: number, v2: number, v3: number, v4: number): boolean;
    isAllLessThan(value: number): boolean;
    forEach(run: (vertex: QuadVertexes, value: number) => void): void;
}
