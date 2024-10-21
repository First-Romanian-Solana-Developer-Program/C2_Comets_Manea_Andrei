import "dotenv/config"
import { 
	getKeypairFromEnvironment, 
	getExplorerLink,
} from "@solana-developers/helpers"
import { Connection, clusterApiUrl, PublicKey } from "@solana/web3.js"
import { getOrCreateAssociatedTokenAccount } from "@solana/spl-token"

const DECIMALS = 6;
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

const user = getKeypairFromEnvironment("SECRET_KEY");

console.log("User account loaded:", user.publicKey.toBase58());

const tokenMint = new PublicKey("EC8ZvyV6WgdPAz6bqh7jkKNoAyoHnM5haiuPRhbh9s6R");
const destPubkey = new PublicKey("8RGSTN6on6hVvsAYyqoZEvh8Kpi4nycKVNkvWEwiUbxk");

const destTokenAccount = await getOrCreateAssociatedTokenAccount(
	connection,
	user,
	tokenMint,
	user.publicKey,
);

console.log("Token account created: ", destTokenAccount.address.toBase58());

const link = getExplorerLink(
	"address",
	destTokenAccount.address.toBase58(),
	"devnet",
);

console.log("Created token account: ", link);
