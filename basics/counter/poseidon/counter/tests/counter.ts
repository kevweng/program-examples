import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Counter } from "../target/types/counter";
import { assert } from "chai";

describe("counter", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Counter as Program<Counter>;
  const counterState = anchor.web3.PublicKey.findProgramAddressSync(
    [anchor.utils.bytes.utf8.encode("counter")],
    program.programId
  )[0];
  it("Create and initialize counter", async () => {
    const tx = await program.methods
      .initialize()
      .accounts({
        state: counterState,
        user: program.provider.publicKey,
      })
      .rpc();
    console.log("Your transaction signature", tx);

    const counterStateAccount = await program.account.counterState.fetch(
      counterState
    );
    assert.ok(counterStateAccount.counter.eq(new anchor.BN(0)));
  });

  it("Increment counter", async () => {
    const tx = await program.methods
      .increment()
      .accounts({ state: counterState })
      .rpc();
    console.log("Your transaction signature", tx);

    const counterStateAccount = await program.account.counterState.fetch(
      counterState
    );
    assert.ok(counterStateAccount.counter.eq(new anchor.BN(1)));
  });
});
