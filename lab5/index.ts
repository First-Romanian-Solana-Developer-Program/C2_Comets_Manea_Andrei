import { Connection } from "@solana/web3.js";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import { Metaplex, keypairIdentity, irysStorage } from "@metaplex-foundation/js";
import "dotenv/config";

const nftData = {
	name: "SDP Coole Nft",
	symbol: "SDP",
	description: "This is a cool NFT from Solana Developers Program Romania",
	imgPath: "./solana.png",
};

async function main() {
	const connection = new Connection("https://api.devnet.solana.com");

	const keypair = getKeypairFromEnvironment("SECRET_KEY");

	console.log('Keypair loaded: ${keypair.publicKey.toBase58()}');

	const metaplex = Metaplex.make(connection)
		.use(keypairIndentity(keypair))
		.use(
			irysStorage({
				address: "https://devnet.bundlr.network",
				providerUrl: "https://devnet.solana.com",
				timeout: 60000,
			}),
		);

	console.log("Metaplex loaded!");
	
	const uri = await uploadMetadata(metaplex, nftData);
	console.log("Off-chain image + metadata");
	
	const nft = await createNft(metaplex, uri, nftData);
}

main().then(() => console.log("Hooray!"));
