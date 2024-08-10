"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Galosis_1 = require("./Galosis");
class ShamirsAlgoritm {
    constructor(threshold, totalShare) {
        this.threshold = threshold;
        this.totalShare = totalShare;
    }
    fetchingAllShare(secret) {
        const coefficients = [secret];
        // Generate random coefficients for the polynomial
        for (let i = 1; i < this.threshold; i++) {
            coefficients.push(Math.floor(Math.random() * 256));
        }
        // Initialize shares
        const shares = [];
        for (let x = 1; x <= this.totalShare; x++) {
            let y = coefficients[0];
            let x_pow = 1; // x^0 = 1
            for (let j = 1; j < this.threshold; j++) {
                x_pow = Galosis_1.GF256.multiply(x_pow, x); // x^j in GF(256)
                y = Galosis_1.GF256.add(y, Galosis_1.GF256.multiply(coefficients[j], x_pow));
            }
            shares.push([x, y]);
        }
        return shares;
    }
    reconstruct(shares) {
        if (shares.length < this.threshold) {
            throw new Error("Insufficient shares to reconstruct the secret");
        }
        let secret = 0;
        for (let i = 0; i < shares.length; i++) {
            const [xi, yi] = shares[i];
            let li = 1;
            for (let j = 0; j < shares.length; j++) {
                if (i !== j) {
                    const [xj] = shares[j];
                    // Ensure we correctly subtract in GF(256)
                    const denominator = Galosis_1.GF256.subtract(xj, xi);
                    if (denominator === 0) {
                        throw new Error("Error: denominator is zero in Lagrange interpolation.");
                    }
                    console.log(Galosis_1.GF256.multiply(li, Galosis_1.GF256.divide(xj, denominator)));
                    li = Galosis_1.GF256.multiply(li, Galosis_1.GF256.divide(xj, denominator));
                }
            }
            console.log(yi, li);
            console.log(Galosis_1.GF256.multiply(yi, li));
            secret = Galosis_1.GF256.add(secret, Galosis_1.GF256.multiply(yi, li));
        }
        console.log('\n');
        return secret;
    }
}
// Initialize GF256
Galosis_1.GF256.initialize();
// Create an instance of ShamirsAlgoritm with a 3/5 threshold
const sa = new ShamirsAlgoritm(3, 5);
// Fetch all shares for a secret value of 123
const shares = sa.fetchingAllShare(123);
console.log("Generated Shares: ", shares);
// Reconstruct the secret using any 3 of the generated shares
const reconstructed = sa.reconstruct(shares.slice(0, 3));
console.log("Reconstructed Secret: ", reconstructed);
