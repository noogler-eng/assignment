"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const without_1 = require("./without");
const ss = new without_1.ShamirSecretSharing(3, 5);
const secret = 12345612378;
const shares = ss.generateShares(secret);
console.log("Generated Shares:", shares);
// Reconstruct the secret using any 3 of the generated shares
const reconstructedSecret = ss.reconstructSecret(shares.slice(2, 5));
console.log("Reconstructed Secret:", reconstructedSecret);
