"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gf256_add = exports.gf256_mul = exports.GF256_LOG = exports.GF256_EXP = void 0;
// Generate the multiplication and logarithm tables for GF(256)
exports.GF256_EXP = [];
exports.GF256_LOG = [];
const generator = 0x03; // Primitive element in GF(256)
let x = 1;
for (let i = 0; i < 256; i++) {
    exports.GF256_EXP[i] = x;
    exports.GF256_LOG[x] = i;
    x <<= 1;
    if (x & 0x100) {
        x ^= 0x1b;
    }
}
// Multiplication in GF(256)
function gf256_mul(a, b) {
    if (a === 0 || b === 0)
        return 0;
    return exports.GF256_EXP[(exports.GF256_LOG[a] + exports.GF256_LOG[b]) % 255];
}
exports.gf256_mul = gf256_mul;
// Addition in GF(256) is XOR
function gf256_add(a, b) {
    return a ^ b;
}
exports.gf256_add = gf256_add;
