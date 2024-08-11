export class ShamirSecretSharing {
    private threshold: number;
    private totalShares: number;

    constructor(threshold: number, totalShares: number) {
        this.threshold = threshold;
        this.totalShares = totalShares;
    }

    // Generate random coefficients for the polynomial
    private generateCoefficients(secret: number): number[] {
        const coefficients = [secret];
        for (let i = 1; i < this.threshold; i++) {
            coefficients.push(Math.floor(Math.random() * 256)); // Random coefficients
        }
        return coefficients;
    }

    // Function to generate shares
    generateShares(secret: number): [number, number][] {
        const coefficients = this.generateCoefficients(secret);

        // Initialize shares
        const shares: [number, number][] = [];
        for (let x = 1; x <= this.totalShares; x++) {
            let y = coefficients[0];
            for (let j = 1; j < this.threshold; j++) {
                y += coefficients[j] * Math.pow(x, j);
            }
            shares.push([x, y]);
        }
        return shares;
    }

    // Function to reconstruct the secret from shares
    reconstructSecret(shares: [number, number][]): number {
        let secret = 0;

        for (let i = 0; i < shares.length; i++) {
            let [xi, yi] = shares[i];
            let li = 1;

            for (let j = 0; j < shares.length; j++) {
                if (i !== j) {
                    let [xj, _] = shares[j];
                    li *= xj / (xj - xi);
                }
            }

            secret += yi * li;
        }

        return Math.round(secret);
    }
}