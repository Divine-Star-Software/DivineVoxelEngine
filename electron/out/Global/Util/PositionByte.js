/**# PositionByte
 * ---
 * Handles encoding a 32 bit float with a voxel space posiiton.
 */
export const PositionByte = {
    _poisiton: {
        x: 0,
        y: 0,
        z: 0,
    },
    getY(byteData) {
        return (byteData & 0xff0000) >> 16;
    },
    getPosition(byteData) {
        this._poisiton.x = byteData & 0xff;
        this._poisiton.z = (byteData & 0xff00) >> 8;
        this._poisiton.y = (byteData & 0xff0000) >> 16;
        return this._poisiton;
    },
    setPosition(x, y, z) {
        let ez = x | (z << 8);
        return ez | (y << 16);
    },
    setPositionUseObj(positionObj) {
        let ez = positionObj.x | (positionObj.z << 8);
        return ez | (positionObj.y << 16);
    },
};
