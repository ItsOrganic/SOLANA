import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import * as Web3 from "@solana/web3.js"
import { FC } from "react";
import styles from '../styles/PingButton.module.css'
import { send } from "process";

const PROGRAM_ID = new Web3.PublicKey("ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa")
const PROGRAM_DATA_PUBLIC_KEY = new Web3.PublicKey("Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod")

export const PingButton: FC = () => {
	const { connection } = useConnection();
	const {publicKey, sendTransaction } = useWallet();

	const onClick = () => {
		if(!connection || !publicKey){
			alert("Connect to the wallet ")
			return 
		}
		const transaction = new Web3.Transaction()
		const instruction = new Web3.TransactionInstruction({
			keys: [
				{
					pubkey: PROGRAM_DATA_PUBLIC_KEY,
					isSigner: false,
					isWritable: true
				},
			],
			programId: PROGRAM_ID,
		});
		transaction.add(instruction)
		sendTransaction(transaction, connection)
		.then(sig => {
			console.log('Explorer');
		})

	}
	return (
		<div className={styles.buttonConainer} onClick={onClick}>
			<button className={styles.button}>Ping</button>
		</div>
	)
}