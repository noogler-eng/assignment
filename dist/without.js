"use strict";
class ShamirsAlgoritm {
    constructor(threshold, totalShare) {
        this.threshold = threshold;
        this.totalShare = totalShare;
    }
    // Function to generate shares
    fetchingAllShare(secret) {
        const coefficients = [secret];
        // Generate random coefficients for the polynomial
        for (let i = 1; i < this.threshold; i++) {
            coefficients.push(Math.floor(Math.random() * 100)); // Random integer coefficients
        }
        console.log("Generated Coefficients:", coefficients);
        // Initialize shares
        const shares = [];
        for (let x = 1; x <= this.totalShare; x++) {
            let y = coefficients[0];
            for (let j = 1; j < this.threshold; j++) {
                y += coefficients[j] * Math.pow(x, j);
            }
            shares.push([x, y]);
        }
        console.log("Generated Shares: ", shares);
        return shares;
    }
    // Function to reconstruct the secret from shares
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
                    li *= xj / (xj - xi);
                }
            }
            secret += yi * li;
        }
        console.log("Reconstructed Secret:", secret);
        return Math.round(secret); // Round to nearest integer
    }
}
// Create an instance of ShamirsAlgoritm with a 3/5 threshold
const sa = new ShamirsAlgoritm(3, 5);
// Fetch all shares for a secret value of 123
const shares = sa.fetchingAllShare(123456789987);
// Reconstruct the secret using any 3 of the generated shares
const reconstructed = sa.reconstruct(shares.slice(0, 3));
console.log("Reconstructed Secret: ", reconstructed);
