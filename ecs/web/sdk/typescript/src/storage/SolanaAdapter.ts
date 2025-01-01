import {
	PublicKey,
	Keypair,
	Connection,
	Transaction,
	TransactionInstruction,
} from "@solana/web3.js";
import { Entity } from "../core/types/types";
import { StoragePort } from "./StoragePort";

export class SolanaAdapter implements StoragePort {
	private blueprint: string;
	private programId: PublicKey;
	private sessionKeypair: Keypair = Keypair.generate();
	private rpcUrl: string;
	private connection!: Connection;

	/**
	 * Creates a new Solana Storage Adapter instance
	 * @param {Object} config - Configuration object
	 * @param {string} config.blueprint - The blueprint identifier
	 * @param {PublicKey | string} config.programId - The program public key
	 * @param {string} [config.rpcUrl] - Optional RPC URL (defaults to devnet)
	 */
	constructor(config: {
		blueprint: string;
		programId: PublicKey | string;
		rpcUrl?: string;
	}) {
		if (!config.blueprint) {
			throw new Error("Blueprint is required");
		}

		this.blueprint = config.blueprint;
		this.programId = new PublicKey(config.programId);
		this.rpcUrl = config.rpcUrl || "https://api.devnet.solana.com";
		this.initializeConnection();
	}

	/**
	 * Initializes the Solana connection
	 */
	private initializeConnection(): void {
		if (!this.rpcUrl) {
			throw new Error("RPC URL is required");
		}
		this.connection = new Connection(this.rpcUrl);
	}

	public async migrate(): Promise<void> {
		// Migration logic
	}

	public async create(): Promise<void> {
		// Create the entity
	}

	public async get() {
		// Gets The entity
	}

	public async set() {
		// Sets the entity
	}

	public async delete() {
		// Deletes the entity
	}
}
