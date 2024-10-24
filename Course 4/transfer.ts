import { transfer, mintTo } from "@solana/spl-token"
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

const destTokenAccount = new PublicKey("3a2s69rZ3XaCVT8hQxPQTjQitwbLdD6pR4zvFh8a6vLz");
const source = new PublicKey("C3DRZ1qRkAXioQFQVS9xGuYvNy3Bi1Lnf93wrT5tpphe");

const sig = await transfer(
	connection,
	user,
	source,
	destTokenAccount,
	user,
	AMOUNT * 10 ** DECIMALS,
);

console.log("Signature: ", sig);
