import { Keypair } from "@solana/web3.js";

const keypair = Keypair.generate();

console.log(`Generated keypair!`)

const publicKey = keypair.publicKey.toBase58();
const privateKey = keypair.secretKey;

console.log(`Public key is ${publicKey}`)
console.log(`Secret key is ${privateKey}`)
