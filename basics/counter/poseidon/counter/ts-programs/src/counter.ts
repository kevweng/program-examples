import {
  Account,
  Pubkey,
  Result,
  i64,
  u8,
  Signer,
} from "@solanaturbine/poseidon";

export default class Counter {
  static PROGRAM_ID = new Pubkey(
    "31nkast5V8Xx7uyZDQSqfQPqNzHhFXxP9LAXm88MTJNM"
  );

  initialize(state: CounterState, user: Signer): Result {
    state.derive(["counter"]).init();
    state.counter = new i64(0);
  }
  increment(state: CounterState): Result {
    state.derive(["counter"]);
    state.counter = state.counter.add(1);
  }
}

export interface CounterState extends Account {
  counter: i64;
  bump: u8;
}
