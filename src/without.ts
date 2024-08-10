export class ShamirsAlgoritm {
    private threshold: number;
    private totalShare: number;

    constructor(threshold: number, totalShare: number) {
        this.threshold = threshold;
        this.totalShare = totalShare;
    }

    // Function to generate shares
    fetchingAllShare(secret: bigint): [bigint, bigint][] {
        const coefficients: bigint[] = [secret];

        // Generate random coefficients for the polynomial
        for (let i = 1; i < this.threshold; i++) {
            coefficients.push(BigInt(Math.floor(Math.random() * 100))); // Random integer coefficients
        }

        console.log("Generated Coefficients:", coefficients);

        // Initialize shares
        const shares: [bigint, bigint][] = [];
        for (let x = 1n; x <= BigInt(this.totalShare); x++) {
            let y = coefficients[0];

            for (let j = 1; j < this.threshold; j++) {
                y += coefficients[j] * x ** BigInt(j);
            }

            shares.push([x, y]);
        }
        console.log("Generated Shares: ", shares);
        return shares;
    }

    // Function to reconstruct the secret from shares
    reconstruct(shares: [bigint, bigint][]): bigint {
        if (shares.length < this.threshold) {
            throw new Error("Insufficient shares to reconstruct the secret");
        }

        let secret = 0n;

        for (let i = 0; i < shares.length; i++) {
            const [xi, yi] = shares[i];
            let li = 1n;

            for (let j = 0; j < shares.length; j++) {
                if (i !== j) {
                    const [xj] = shares[j];
                    li *= xj / (xj - xi); // Adjust to handle `bigint`
                }
            }

            secret += yi * li;
        }

        console.log("Reconstructed Secret:", secret);
        return secret;
    }
}

// Example usage
// const sa = new ShamirsAlgoritm(3, 5);

// // Fetch all shares for a secret value of 123456789987
// const secretValue = 123456789987n;
// const shares = sa.fetchingAllShare(secretValue);
// console.log("Shares:", shares);

// // Reconstruct the secret using any 3 of the generated shares
// const reconstructedSecret = sa.reconstruct(shares.slice(0, 3));
// console.log("Reconstructed Secret:", reconstructedSecret.toString());

