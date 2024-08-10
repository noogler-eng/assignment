"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GF256 = void 0;
class GF256 {
    static initialize() {
        if (this.initialized)
            return;
        const primitive = 0x11b; // x^8 + x^4 + x^3 + x + 1
        let x = 1;
        for (let i = 0; i < 256; i++) {
            this.exp[i] = x;
            this.log[x] = i;
            x <<= 1;
            if (x & 0x100) {
                x ^= primitive;
            }
        }
        for (let i = 256; i < 512; i++) {
            this.exp[i] = this.exp[i - 256];
        }
        this.initialized = true;
    }
    static add(a, b) {
        const result = a ^ b;
        console.log(`Add: ${a} + ${b} = ${result}`);
        return result;
    }
    static subtract(a, b) {
        const result = a ^ b;
        console.log(`Subtract: ${a} - ${b} = ${result}`);
        return result;
    }
    static multiply(a, b) {
        if (a === 0 || b === 0)
            return 0;
        const result = this.exp[(this.log[a] + this.log[b]) % 255];
        console.log(`Multiply: ${a} * ${b} = ${result}`);
        return result;
    }
    static divide(a, b) {
        if (b === 0)
            throw new Error("Division by zero");
        if (a === 0)
            return 0;
        const result = this.exp[(this.log[a] + 255 - this.log[b]) % 255];
        console.log(`Divide: ${a} / ${b} = ${result}`);
        return result;
    }
}
exports.GF256 = GF256;
GF256.exp = [];
GF256.log = [];
GF256.initialized = false;
