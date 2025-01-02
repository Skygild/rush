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
		let worldPDA: PublicKey;
		try {
			worldPDA = await this.findWorldPDA();
		} catch (error) {
			console.error("Error finding World PDA:", error);
			throw new Error("Failed to find World PDA");
		}

		// Logic to spawn entities
		const entityPDAs = await this.spawnEntities(worldPDA);
		console.log("Entities spawned:", entityPDAs);
	}

	public async findWorldPDA(): Promise<PublicKey> {
		// Logic to derive the World PDA
		const seeds = [Buffer.from(this.blueprint)];
		return (await PublicKey.findProgramAddress(seeds, this.programId))[0];
	}

public async testSpawnEntities(worldPDA: PublicKey): Promise<PublicKey[]> {
    return await this.spawnEntities(worldPDA);
}

private async spawnEntities(worldPDA: PublicKey): Promise<PublicKey[]> {
		// Logic to create entity PDAs
		const entityPDAs: PublicKey[] = [];
		// Example logic to create multiple entity PDAs
		for (let i = 0; i < 5; i++) {
			const seeds = [Buffer.from(this.blueprint), Buffer.from(i.toString())];
			const entityPDA = (await PublicKey.findProgramAddress(seeds, this.programId))[0];
			entityPDAs.push(entityPDA);
		}
		return entityPDAs;
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
