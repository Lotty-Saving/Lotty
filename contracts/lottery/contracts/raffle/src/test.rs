use super::*;
use soroban_sdk::{
    testutils::{Address as _, Ledger, LedgerInfo},
    Address, Env,
};

fn set_ledger(env: &Env, sequence: u32, timestamp: u64) {
    env.ledger().set(LedgerInfo {
        protocol_version: 23,
        sequence_number: sequence,
        timestamp,
        network_id: [0; 32],
        base_reserve: 0,
        min_persistent_entry_ttl: 4096,
        min_temp_entry_ttl: 16,
        max_entry_ttl: 6_312_000,
    });
}

#[test]
fn pseudo_random_changes_with_nonce() {
    let env = Env::default();
    set_ledger(&env, 42, 1_700_000_000);
    let contract_id = env.register(Raffle, ());
    let client = RaffleClient::new(&env, &contract_id);

    let caller = Address::generate(&env);
    let first = client.generate_pseudo_random(&caller, &1_000);
    let second = client.generate_pseudo_random(&caller, &1_000);

    assert_ne!(first, second, "nonce should change the output");
}

#[test]
fn pseudo_random_is_deterministic_for_same_inputs() {
    let env = Env::default();
    set_ledger(&env, 7, 77);
    let contract_id = env.register(Raffle, ());
    let client = RaffleClient::new(&env, &contract_id);

    let caller = Address::generate(&env);
    let range = 500;

    env.as_contract(&contract_id, || {
        env.storage()
            .persistent()
            .set(&DataKey::Nonce(caller.clone()), &0u64);
    });
    let first = client.generate_pseudo_random(&caller, &range);

    env.as_contract(&contract_id, || {
        env.storage()
            .persistent()
            .set(&DataKey::Nonce(caller.clone()), &0u64);
    });
    let second = client.generate_pseudo_random(&caller, &range);

    assert_eq!(first, second, "same inputs should yield same result");
}