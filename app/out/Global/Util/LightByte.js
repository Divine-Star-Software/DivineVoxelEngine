/**# Light Byte
 * ---
 * Used to decode light color info.
 */
export class LightByte {
    setLightValues(values) {
        let value = (0 & ~(0xf << 0)) | (values[0] << 0);
        value = (value & ~(0xf << 4)) | (values[1] << 4);
        value = (value & ~(0xf << 8)) | (values[2] << 8);
        value = (value & ~(0xf << 12)) | (values[3] << 12);
        return value;
    }
    getLightValues(value) {
        return [
            (value & (0x0f << 0)) >> 0,
            (value & (0x0f << 4)) >> 4,
            (value & (0x0f << 8)) >> 8,
            (value & (0x0f << 12)) >> 12,
        ];
    }
    calculateRGBSetLight(n1, n2, n3, n4, n5, n6) {
        let bv = 0;
        let r = 0;
        let g = 0;
        let b = 0;
        if (n1 > 0) {
            const n1r = (n1 & (0x0f << 4)) >> 4;
            if (n1r > r) {
                r = n1r;
            }
            const n1g = (n1 & (0x0f << 8)) >> 8;
            if (n1g > g) {
                g = n1g;
            }
            const n1b = (n1 & (0x0f << 12)) >> 12;
            if (n1b > b) {
                b = n1b;
            }
        }
        if (n2 > 0) {
            const n2r = (n2 & (0x0f << 4)) >> 4;
            if (n2r > r) {
                r = n2r;
            }
            const n2g = (n2 & (0x0f << 8)) >> 8;
            if (n2g > g) {
                g = n2g;
            }
            const n2b = (n2 & (0x0f << 12)) >> 12;
            if (n2b > b) {
                b = n2b;
            }
        }
        if (n3 > 0) {
            const n3r = (n3 & (0x0f << 4)) >> 4;
            if (n3r > r) {
                r = n3r;
            }
            const n3g = (n3 & (0x0f << 8)) >> 8;
            if (n3g > g) {
                g = n3g;
            }
            const n3b = (n3 & (0x0f << 12)) >> 12;
            if (n3b > b) {
                b = n3b;
            }
        }
        if (n4 > 0) {
            const n4r = (n4 & (0x0f << 4)) >> 4;
            if (n4r > r) {
                r = n4r;
            }
            const n4g = (n4 & (0x0f << 8)) >> 8;
            if (n4g > g) {
                g = n4g;
            }
            const n4b = (n4 & (0x0f << 12)) >> 12;
            if (n4b > b) {
                b = n4b;
            }
        }
        if (n5 > 0) {
            const n5r = (n5 & (0x0f << 4)) >> 4;
            if (n5r > r) {
                r = n5r;
            }
            const n5g = (n5 & (0x0f << 8)) >> 8;
            if (n5g > g) {
                g = n5g;
            }
            const n5b = (n5 & (0x0f << 12)) >> 12;
            if (n5b > b) {
                b = n5b;
            }
        }
        if (n6 > 0) {
            const n6r = (n6 & (0x0f << 4)) >> 4;
            if (n6r > r) {
                r = n6r;
            }
            const n6g = (n6 & (0x0f << 8)) >> 8;
            if (n6g > g) {
                g = n6g;
            }
            const n6b = (n6 & (0x0f << 12)) >> 12;
            if (n6b > b) {
                b = n6b;
            }
        }
        if (r <= 0) {
            r = 0;
        }
        else {
            r--;
        }
        if (g <= 0) {
            g = 0;
        }
        else {
            g--;
        }
        if (b <= 0) {
            b = 0;
        }
        else {
            b--;
        }
        bv = (bv & ~(0xf << 4)) | (r << 4);
        bv = (bv & ~(0xf << 8)) | (g << 8);
        bv = (bv & ~(0xf << 12)) | (b << 12);
        return bv;
    }
    calculateRGBUpdateLight(l1, n1, n2, n3, n4, n5, n6) {
        let bv = 0;
        let r = ((l1 & (0x0f << 4)) >> 4) + 1;
        let g = ((l1 & (0x0f << 8)) >> 8) + 1;
        let b = ((l1 & (0x0f << 12)) >> 12) + 1;
        if (n1 > 0) {
            const n1r = (n1 & (0x0f << 4)) >> 4;
            if (n1r > r) {
                r = n1r;
            }
            const n1g = (n1 & (0x0f << 8)) >> 8;
            if (n1g > g) {
                g = n1g;
            }
            const n1b = (n1 & (0x0f << 12)) >> 12;
            if (n1b > b) {
                b = n1b;
            }
        }
        if (n2 > 0) {
            const n2r = (n2 & (0x0f << 4)) >> 4;
            if (n2r > r) {
                r = n2r;
            }
            const n2g = (n2 & (0x0f << 8)) >> 8;
            if (n2g > g) {
                g = n2g;
            }
            const n2b = (n2 & (0x0f << 12)) >> 12;
            if (n2b > b) {
                b = n2b;
            }
        }
        if (n3 > 0) {
            const n3r = (n3 & (0x0f << 4)) >> 4;
            if (n3r > r) {
                r = n3r;
            }
            const n3g = (n3 & (0x0f << 8)) >> 8;
            if (n3g > g) {
                g = n3g;
            }
            const n3b = (n3 & (0x0f << 12)) >> 12;
            if (n3b > b) {
                b = n3b;
            }
        }
        if (n4 > 0) {
            const n4r = (n4 & (0x0f << 4)) >> 4;
            if (n4r > r) {
                r = n4r;
            }
            const n4g = (n4 & (0x0f << 8)) >> 8;
            if (n4g > g) {
                g = n4g;
            }
            const n4b = (n4 & (0x0f << 12)) >> 12;
            if (n4b > b) {
                b = n4b;
            }
        }
        if (n5 > 0) {
            const n5r = (n5 & (0x0f << 4)) >> 4;
            if (n5r > r) {
                r = n5r;
            }
            const n5g = (n5 & (0x0f << 8)) >> 8;
            if (n5g > g) {
                g = n5g;
            }
            const n5b = (n5 & (0x0f << 12)) >> 12;
            if (n5b > b) {
                b = n5b;
            }
        }
        if (n6 > 0) {
            const n6r = (n6 & (0x0f << 4)) >> 4;
            if (n6r > r) {
                r = n6r;
            }
            const n6g = (n6 & (0x0f << 8)) >> 8;
            if (n6g > g) {
                g = n6g;
            }
            const n6b = (n6 & (0x0f << 12)) >> 12;
            if (n6b > b) {
                b = n6b;
            }
        }
        if (r <= 0) {
            r = 0;
        }
        else {
            r--;
        }
        if (g <= 0) {
            g = 0;
        }
        else {
            g--;
        }
        if (b <= 0) {
            b = 0;
        }
        else {
            b--;
        }
        bv = (bv & ~(0xf << 4)) | (r << 4);
        bv = (bv & ~(0xf << 8)) | (g << 8);
        bv = (bv & ~(0xf << 12)) | (b << 12);
        return bv;
    }
    calculateVertexLight(block, air, n1, n2, n3) {
        let blockSunLightLevel = (block & (0x0f << 0)) >> 0;
        let airR = (air & (0x0f << 0)) >> 4;
        let airG = (air & (0x0f << 0)) >> 8;
        let airB = (air & (0x0f << 0)) >> 12;
        let sun = blockSunLightLevel;
        let r = airR;
        let g = airG;
        let b = airB;
        let nSun = (block & (0x0f << 0)) >> 0;
        let nr = (air & (0x0f << 0)) >> 4;
        let ng = (air & (0x0f << 0)) >> 8;
        let nb = (air & (0x0f << 0)) >> 12;
        if (nSun < sun && sun > 0) {
            sun--;
        }
        if (nSun > sun && sun < 15) {
            sun++;
        }
        if (nr < r && r > 0) {
            r--;
        }
        if (nr > r && r < 15) {
            r++;
        }
        if (ng < g && g > 0) {
            g--;
        }
        if (ng > g && g < 15) {
            g++;
        }
        if (nb < b && b > 0) {
            b--;
        }
        if (nb > b && b < 15) {
            b++;
        }
    }
}
