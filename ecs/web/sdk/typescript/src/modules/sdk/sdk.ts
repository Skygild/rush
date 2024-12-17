import { TSSDKParams } from "../../types";
import { Solana } from "../storage";
import { Keypair, PublicKey } from "@solana/web3.js";
import bs58 from "bs58";

/**
 * RushSDK class that provides SDK functionality for interacting with Solana.
 */
export class RushSDK {
  // Important variables
  private keypair: Keypair;
  private storage: Solana;

  /**
   * Constructs the RushSDK instance.
   * If a secret key is provided, initializes with that keypair.
   * Otherwise, generates a new keypair using the createKeypair function.
   */
  constructor({ rpc_url, program_id, blueprint_path, secret_key }: TSSDKParams) {
    // Initialization of the instance
    if (secret_key) {
      this.keypair = Keypair.fromSecretKey(secret_key); // Create a key pair using the provided secret key
    } else {
      console.log("No secret key provided. Generating a new keypair.");
      this.keypair = this.Signin(); // Generate a new keypair if no secret key is provided
    }

    const programIdKey = new PublicKey(program_id);

    this.storage = new Solana({
      blueprint: blueprint_path,
      program_id: programIdKey,
      rpc_url,
      signer: this.keypair,
    });
  }

  /**
   * Generates a new Solana Keypair and returns it.
   * @returns {Keypair} A new Solana Keypair.
   */
  private Signin(): Keypair {
    const keypair = Keypair.generate();
    console.log("New Keypair Created:");
    console.log("Public Key:", keypair.publicKey.toBase58());
    console.warn("Secret Key generated.",keypair.secretKey);
    return keypair;
  }
}

// Example usage Test
if (require.main === module) {
  const sdk = new RushSDK({
    rpc_url: 'https://api.mainnet-beta.solana.com', 
    program_id: 'test', 
    blueprint_path: 'test', 
  });
  console.log("Public Key:", sdk.keypair.publicKey.toBase58());
  console.log("Secret Key ", sdk.keypair.secretKey);
}
