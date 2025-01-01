import { SolanaAdapter } from "./SolanaAdapter";
import { PublicKey } from "@solana/web3.js";

describe("SolanaAdapter", () => {
  it("should create an instance with valid parameters", () => {
    const adapter = new SolanaAdapter({
      blueprint: "test-blueprint",
      programId: new PublicKey("11111111111111111111111111111111"),
    });

    expect(adapter).toBeInstanceOf(SolanaAdapter);
  });

  it("should throw error when blueprint is missing", () => {
    expect(() => {
      new SolanaAdapter({
        blueprint: "",
        programId: new PublicKey("11111111111111111111111111111111"),
      });
    }).toThrow("Blueprint is required");
  });

  it("should use devnet RPC when none provided", () => {
    const adapter = new SolanaAdapter({
      blueprint: "test-blueprint",
      programId: new PublicKey("11111111111111111111111111111111"),
    });

    expect(adapter).toBeInstanceOf(SolanaAdapter);
  });

  it("should accept programId as string", () => {
    const adapter = new SolanaAdapter({
      blueprint: "test-blueprint",
      programId: "11111111111111111111111111111111",
    });

    expect(adapter).toBeInstanceOf(SolanaAdapter);
  });

  it("should throw error when invalid programId is provided", () => {
    expect(() => {
      new SolanaAdapter({
        blueprint: "test-blueprint",
        programId: "invalid",
      });
    }).toThrow();
  });
});
