import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  Transaction,
  SystemProgram,
  PublicKey,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import { useState } from "react";

export function SendSolanaForm() {
  const [amount, setAmount] = useState(0);
  const [destination, setDestination] = useState("");
  const { connection } = useConnection();
  const { publicKey, signTransaction, sendTransaction } = useWallet();

  function handleChangeAmount(event) {
    setAmount(event.target.value);
  }

  function handleChangeDestination(event) {
    setDestination(event.target.value);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!connection || !publicKey) {
      console.error("Wallet unnavailable");
      return;
    }

    // console.log("Amount: ", amount);
    // console.log("Destination: ", destination);
    const tx = new Transaction();
    const instruction = SystemProgram.transfer({
      fromPubkey: publicKey,
      toPubkey: new PublicKey(destination),
      lamports: amount * LAMPORTS_PER_SOL,
    });

    tx.add(instruction);

    const blockhash = await connection.getLatestBlockhash();

    tx.recentBlockhash = blockhash.blockhash;

    tx.feePayer = publicKey;

    const signedTransaction = await signTransaction(tx);

    const signature = await sendTransaction(signedTransaction, connection);

    console.log("SOL sent to: ", destination, ": ", signature);
  }
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="amount">Amount</label>
      <input
        type="number"
        id="amount"
        name="amount"
        onChange={handleChangeAmount}
      />

      <label htmlFor="dest">Destination</label>
      <input
        type="text"
        id="dest"
        name="dest"
        onChange={handleChangeDestination}
      />
      <input type="submit" value="Submit" />
    </form>
  );
}
