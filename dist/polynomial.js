"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GF_1 = require("./GF");
function generatePolynomial(secret, threshold) {
    const coefficients = [secret];
    for (let i = 1; i < threshold; i++) {
        coefficients.push(Math.floor(Math.random() * 256));
    }
    return coefficients;
}
function evaluatePolynomial(coefficients, x) {
    let y = 0;
    for (let i = coefficients.length - 1; i >= 0; i--) {
        y = (0, GF_1.gf256_mul)(y, x);
        y = (0, GF_1.gf256_add)(y, coefficients[i]);
    }
    return y;
}
function shareSecret(secret, totalShares, threshold) {
    const coefficients = generatePolynomial(secret, threshold);
    const shares = [];
    for (let i = 1; i <= totalShares; i++) {
        shares.push({ x: i, y: evaluatePolynomial(coefficients, i) });
    }
    return shares;
}
function lagrangeInterpolation(shares, atX = 0) {
    let secret = 0;
    for (let i = 0; i < shares.length; i++) {
        let numerator = 1;
        let denominator = 1;
        for (let j = 0; j < shares.length; j++) {
            if (i !== j) {
                numerator = (0, GF_1.gf256_mul)(numerator, (0, GF_1.gf256_add)(atX, shares[j].x));
                denominator = (0, GF_1.gf256_mul)(denominator, (0, GF_1.gf256_add)(shares[i].x, shares[j].x));
            }
        }
        const value = (0, GF_1.gf256_mul)(shares[i].y, (0, GF_1.gf256_mul)(numerator, gf256_log_inv(denominator)));
        secret = (0, GF_1.gf256_add)(secret, value);
    }
    return secret;
}
function gf256_log_inv(a) {
    if (a === 0)
        throw new Error("Cannot invert zero in GF(256)");
    return GF_1.GF256_EXP[255 - GF_1.GF256_LOG[a]];
}
const secret = 123; // Example private key
const totalShares = 5;
const threshold = 3;
const shares = shareSecret(secret, totalShares, threshold);
console.log("Generated Shares:");
shares.forEach(share => console.log(`x: ${share.x}, y: ${share.y}`));
// Test reconstruction with a valid subset of shares (3 out of 5)
const recoveredSecret = lagrangeInterpolation(shares.slice(0, 3));
console.log("Recovered Secret:", recoveredSecret);
