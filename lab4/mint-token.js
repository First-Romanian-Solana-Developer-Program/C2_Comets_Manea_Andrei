import { createMint, mintTo } from "@solana/spl-token"
import "dotenv/config"
import { getOrCreateAssociatedTokenAccount } from "@solana/spl-token"
import {
	getKeypairFromEnvironment,
	getExplorerLink,
} from "@solana-developers/helpers"
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js"

const AMOUNT = 9;
const DECIMALS = 6;
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

const user = getKeypairFromEnvironment("SECRET_KEY");

const tokenMint = new PublicKey("EC8ZvyV6WgdPAz6bqh7jkKNoAyoHnM5haiuPRhbh9s6R");
const destTokenAccount = new PublicKey("C3DRZ1qRkAXioQFQVS9xGuYvNy3Bi1Lnf93wrT5tpphe");

const sig = await mintTo(
	connection,
	user,
	tokenMint,
	destTokenAccount,
	user,
	AMOUNT * 10 ** DECIMALS,
);

console.log("Signature: ", sig);
