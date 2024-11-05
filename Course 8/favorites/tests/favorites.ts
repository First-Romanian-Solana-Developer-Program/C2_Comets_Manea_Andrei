import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Favorites } from "../target/types/favorites";

import { assert } from "chai";
import web3 = anchor.web3;

describe("favorites", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const user = (provider.wallet as achor.Wallet).payer;
  const program = anchor.workspace.Favorites as Program<Favorites>;

  before(async () => {
  	const balance = await provider.connection.getBalance(user.publicKey);
  	const balanceInSOL = balance / web3.LAMPORTS_PER_SOL;
  	const formattedBalance = new Intl.NumberFormat().format(balanceInSOL);
  	console.log('Balance in SOL: ', formattedBalance);
  })

  it("It is initialized!", async () => {
  	const tx = await program.methods.initialize().rpc();
  	console.log('Your transaction signature is: ', tx);
  })

  it("Save a user's favourites to the blockchain!", async () => {
  	const favouriteNumber = new anchor.BN(23);
  	const favouriteColor = "purple";
  	const favouriteHobbies = ["skiing", "skydiving", "biking"];

  	await program.methods
  		.setFavourites(favouriteNumber, favouriteColor, favouriteHobbies)
  		.signers([user])
  		.rpc();

  	const favouritesPdaAndBump = web3.PublicKey.findProgramAddressSync(
  		[Buffer.from("favourites"), user.publicKey.toBuffer()],
  		program.programId
  	);
  	
	const favouritesPda = favouritesPdaAndBump[0];
  	const dataFromPda = await program.account.favourites.fetch(favouritesPda);

  	assert.equal(dataFromPda.number.toString(), favouriteNumber.toString());
  	assert.equal(dataFromPda.color, favouriteColor);
  	assert.deepEqual(dataFromPda.hobbies, favouriteHobbies);
  });

  it("Prevent unauthorized users from writing to another user's favorites", async () => {
  	const unauthorizedUser = anchor.web3.Keypair.generate();

  	try {
  		await program.methods
  			.setFavourites(new anchor.BN(100), "green", ["gardening"])
  			.signers([unauthorizedUser])
  			.rpc();
  	} catch (error) {
  		const errorMessage = (error as Error).message;
  		assert.isTrue(errorMessage.includes("unknown signer"));
  	}
  })
});
