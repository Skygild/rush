import { SolanaAdapter } from '../storage/SolanaAdapter';
import { PublicKey } from '@solana/web3.js';

describe('SolanaAdapter', () => {
	let adapter: SolanaAdapter;

	beforeEach(() => {
		adapter = new SolanaAdapter({
			blueprint: 'test_blueprint',
			programId: new PublicKey('So11111111111111111111111111111111111111112'), // Example valid Base58 string
		});
	});

	test('migrate should find World PDA and spawn entities', async () => {
		const worldPDA = await adapter.findWorldPDA();
		const entityPDAs = await adapter.testSpawnEntities(worldPDA);

		expect(worldPDA).toBeInstanceOf(PublicKey);
		expect(entityPDAs).toHaveLength(5); // Assuming 5 entities are spawned
		await expect(adapter.migrate()).resolves.not.toThrow();
	});
});
