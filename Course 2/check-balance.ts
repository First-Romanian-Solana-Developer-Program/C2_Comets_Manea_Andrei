import "dotenv/config"

import { 
	Connection, 
	LAMPORTS_PER_SOL, 
	PublicKey, 
	clusterApiUrl 
} from "@solana/web3.js"

import { airdropIfRequired } from "@solana-developers/helpers";

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

console.log("Connected to devnet", connection.rpcEndpoint); 

const andreiPublicKey = new PublicKey("AWQMKHsAyurTZ8B2648kBKv6EK6qK3s1Tn9AE7RqKr6R");
const balanceInLamports = await connection.getBalance(andreiPublicKey);

console.log("Done! Andrei's balance in Lamports is:", balanceInLamports);
console.log("Airdropping 1 SOL to Andrei...");

await airdropIfRequired(
	connection,
	andreiPublicKey,
	1 * LAMPORTS_PER_SOL,
	0.5 * LAMPORTS_PER_SOL,
);

const balanceAfter = await connection.getBalance(andreiPublicKey);
console.log("Balance after is:", balanceAfter);


