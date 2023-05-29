export class Scalar {
    value;
    static Between(value, min, max) {
        return value >= min && value <= max;
    }
    constructor(value = 0) {
        this.value = value;
    }
}
