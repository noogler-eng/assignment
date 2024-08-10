"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const without_1 = require("./without");
const sa = new without_1.ShamirsAlgoritm(3, 5);
function getSecretKeyFromUser(key) {
    const shares = sa.fetchingAllShare(key);
    console.log('shares: ', shares);
    const reconstructed = sa.reconstruct(shares.slice(0, 3));
    console.log("Reconstructed Secret: ", reconstructed);
    return reconstructed;
}
const key = getSecretKeyFromUser(stringToNumber("0x0db6adab06fF57252E2d6364ce6CCcC554320c9c" + "  "));
console.log('key: ', key);
const secretKey = bigIntToString(key);
console.log('secretKey:', secretKey);
function stringToNumber(str) {
    let result = 0n;
    for (let i = 0; i < str.length; i++) {
        result = result * 256n + BigInt(str.charCodeAt(i));
    }
    return result;
}
function bigIntToString(num) {
    // Check if the number is negative
    const isNegative = num < 0n;
    let absNum = isNegative ? -num : num;
    // Convert BigInt to a string representation
    let result = '';
    while (absNum > 0n) {
        const byteValue = Number(absNum % 256n);
        result = String.fromCharCode(byteValue) + result;
        absNum = absNum / 256n;
    }
    // If result is empty, it means num was zero
    if (result === '') {
        result = '0';
    }
    // Add negative sign if needed
    if (isNegative) {
        result = result;
    }
    return result.slice(0, 42);
}
