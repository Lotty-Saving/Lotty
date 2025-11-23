#![no_std]
#![allow(clippy::too_many_arguments)]

use soroban_sdk::{
    auth::{ContractContext, InvokerContractAuthEntry, SubContractInvocation},
    contract, contractclient, contractevent, contractimpl, contracttype, panic_with_error, Address,
    Bytes, BytesN, Env, IntoVal, Symbol, Vec,
};

use soroban_sdk::{token, String};

const TICKET_PRICE_XLM: i128 = 10_0000000; // 10 XLM (7 decimals)

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub enum DataKey {
    Admin,
    Token,
    Vault,
    Ticket(u32),
    TicketCount,
    TotalPrincipal,
    TotalShares,
    Nonce(Address),
}

#[contractevent]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct WinEvent {
    #[topic]
    pub winner: Address,
    pub interest: i128,
}

#[contractevent]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct RandomEvent {
    #[topic]
    pub caller: Address,
    pub nonce: u64,
    pub seed_hash: BytesN<32>,
    pub range: u64,
    pub result: u64,
}

#[contractclient(name = "DeFindexVaultClient")]
pub trait DeFindexVault {
    fn deposit(env: Env, amounts: Vec<i128>, min_amounts: Vec<i128>, from: Address, invest: bool);
    fn withdraw(env: Env, shares: i128, from: Address, receiver: Address) -> Vec<i128>;
    fn balance(env: Env, user: Address) -> i128;
    fn total_assets(env: Env) -> i128;
    fn total_supply(env: Env) -> i128;
}

#[contract]
pub struct Raffle;

#[derive(Clone, Copy, Debug, Eq, PartialEq)]
#[repr(u32)]
pub enum Error {
    NotInitialized,
    AlreadyInitialized,
    InvalidAmount,
    NoTickets,
    NoInterest,
    VaultError,
}

impl From<Error> for soroban_sdk::Error {
    fn from(error: Error) -> Self {
        soroban_sdk::Error::from_contract_error(error as u32)
    }
}

#[contractimpl]
impl Raffle {
    pub fn init(env: Env, admin: Address, token: Address, vault: Address) {
        if env.storage().persistent().has(&DataKey::Admin) {
            panic_with_error!(&env, Error::AlreadyInitialized);
        }

        env.storage().persistent().set(&DataKey::Admin, &admin);
        env.storage().persistent().set(&DataKey::Token, &token);
        env.storage().persistent().set(&DataKey::Vault, &vault);
        env.storage().persistent().set(&DataKey::TicketCount, &0u32);
        env.storage().persistent().set(&DataKey::TotalPrincipal, &0i128);
        env.storage().persistent().set(&DataKey::TotalShares, &0i128);
    }

    pub fn deposit_and_buy(env: Env, user: Address, amount: i128) {
        ensure_initialized(&env);
        user.require_auth();

        if amount < TICKET_PRICE_XLM || amount % TICKET_PRICE_XLM != 0 {
            panic_with_error!(&env, Error::InvalidAmount);
        }

        let tickets = (amount / TICKET_PRICE_XLM) as u32;
        if tickets == 0 {
            panic_with_error!(&env, Error::InvalidAmount);
        }

        let token_addr = env
            .storage()
            .persistent()
            .get::<_, Address>(&DataKey::Token)
            .unwrap();
        let vault_addr = env
            .storage()
            .persistent()
            .get::<_, Address>(&DataKey::Vault)
            .unwrap();

        let token_client = token::Client::new(&env, &token_addr);
        let contract_addr = env.current_contract_address();

        token_client.transfer(&user, &contract_addr, &amount);

        let allowance_ttl = env.ledger().sequence() + 10_000u32;
        token_client.approve(&contract_addr, &vault_addr, &amount, &allowance_ttl);

        let vault_client = DeFindexVaultClient::new(&env, &vault_addr);
        let shares_before = vault_client.balance(&contract_addr);
        let mut amounts = Vec::new(&env);
        amounts.push_back(amount);
        let mut min_amounts = Vec::new(&env);
        min_amounts.push_back(amount);

        authorize_vault_deposit(
            &env,
            &vault_addr,
            &token_addr,
            &contract_addr,
            &amounts,
            &min_amounts,
            false,
            amount,
            &vault_addr,
        );
        vault_client.deposit(&amounts, &min_amounts, &contract_addr, &false);
        let shares_after = vault_client.balance(&contract_addr);
        let minted_shares = shares_after - shares_before;
        if minted_shares <= 0 {
            panic_with_error!(&env, Error::VaultError);
        }

        let total_shares = get_i128(&env, DataKey::TotalShares) + minted_shares;
        set_i128(&env, DataKey::TotalShares, total_shares);

        let total_principal = get_i128(&env, DataKey::TotalPrincipal) + amount;
        set_i128(&env, DataKey::TotalPrincipal, total_principal);

        mint_tickets(&env, user, tickets);
    }

    pub fn harvest(env: Env) -> Address {
        ensure_initialized(&env);
        let admin = env
            .storage()
            .persistent()
            .get::<_, Address>(&DataKey::Admin)
            .unwrap();
        admin.require_auth();

        let ticket_count = get_u32(&env, DataKey::TicketCount);
        if ticket_count == 0 {
            panic_with_error!(&env, Error::NoTickets);
        }

        let random = Self::generate_pseudo_random(env.clone(), admin.clone(), ticket_count as u64);
        let winner_index = random as u32;
        let winner = env
            .storage()
            .persistent()
            .get::<_, Address>(&DataKey::Ticket(winner_index))
            .unwrap();

        let interest = calculate_interest(&env);
        if interest <= 0 {
            panic_with_error!(&env, Error::NoInterest);
        }

        let shares_to_burn = preview_shares(&env, interest);
        if shares_to_burn <= 0 {
            panic_with_error!(&env, Error::VaultError);
        }

        let vault_addr = env
            .storage()
            .persistent()
            .get::<_, Address>(&DataKey::Vault)
            .unwrap();
        let vault_client = DeFindexVaultClient::new(&env, &vault_addr);

        let contract_addr = env.current_contract_address();
        vault_client.withdraw(&shares_to_burn, &contract_addr, &winner);

        let total_shares = get_i128(&env, DataKey::TotalShares) - shares_to_burn;
        set_i128(
            &env,
            DataKey::TotalShares,
            core::cmp::max(total_shares, 0),
        );

        let principal = get_i128(&env, DataKey::TotalPrincipal);
        let raffle_assets = get_raffle_assets(&env);
        if raffle_assets < principal {
            set_i128(&env, DataKey::TotalPrincipal, raffle_assets);
        }

        WinEvent {
            winner: winner.clone(),
            interest,
        }
        .publish(&env);

        winner
    }

    pub fn get_ticket_count(env: Env) -> u32 {
        get_u32(&env, DataKey::TicketCount)
    }

    pub fn get_total_principal_view(env: Env) -> i128 {
        get_i128(&env, DataKey::TotalPrincipal)
    }

    pub fn get_total_shares_view(env: Env) -> i128 {
        get_i128(&env, DataKey::TotalShares)
    }

    /// Pseudo-random number generator intended for demos/tests only.
    ///
    /// ⚠️ This is *not* cryptographically secure. Do not use it for real-money
    /// lotteries or games of chance—use a VRF or external oracle instead.
    pub fn generate_pseudo_random(env: Env, caller: Address, range: u64) -> u64 {
        if range == 0 {
            return 0;
        }

        let nonce = next_nonce(&env, &caller);
        let ledger = env.ledger();

        let mut seed = Bytes::new(&env);
        append_u64(&mut seed, ledger.timestamp());
        append_u64(&mut seed, ledger.sequence() as u64);
        append_u64(&mut seed, nonce);

        let caller_str: String = caller.to_string();
        seed.append(&caller_str.to_bytes());

        let hash = env.crypto().sha256(&seed);
        let hash_bytes = hash.to_array();
        let mut reduced = [0u8; 8];
        reduced.copy_from_slice(&hash_bytes[..8]);
        let result = u64::from_be_bytes(reduced) % range;

        RandomEvent {
            caller: caller.clone(),
            nonce,
            seed_hash: hash.to_bytes(),
            range,
            result,
        }
        .publish(&env);

        result
    }
}

fn ensure_initialized(env: &Env) {
    if !env.storage().persistent().has(&DataKey::Admin) {
        panic_with_error!(env, Error::NotInitialized);
    }
}

fn get_u32(env: &Env, key: DataKey) -> u32 {
    env.storage()
        .persistent()
        .get(&key)
        .unwrap_or(0u32)
}

fn set_u32(env: &Env, key: DataKey, value: u32) {
    env.storage().persistent().set(&key, &value);
}

fn get_i128(env: &Env, key: DataKey) -> i128 {
    env.storage()
        .persistent()
        .get(&key)
        .unwrap_or(0i128)
}

fn set_i128(env: &Env, key: DataKey, value: i128) {
    env.storage().persistent().set(&key, &value);
}

fn mint_tickets(env: &Env, user: Address, tickets: u32) {
    let mut ticket_count = get_u32(env, DataKey::TicketCount);
    for _ in 0..tickets {
        env.storage()
            .persistent()
            .set(&DataKey::Ticket(ticket_count), &user);
        ticket_count += 1;
    }
    set_u32(env, DataKey::TicketCount, ticket_count);
}

fn calculate_interest(env: &Env) -> i128 {
    let principal = get_i128(env, DataKey::TotalPrincipal);
    let raffle_assets = get_raffle_assets(env);
    let mut interest = raffle_assets - principal;
    if interest < 0 {
        interest = 0;
    }
    interest
}

fn get_raffle_assets(env: &Env) -> i128 {
    let vault_addr = env
        .storage()
        .persistent()
        .get::<_, Address>(&DataKey::Vault)
        .unwrap();

    let vault_client = DeFindexVaultClient::new(env, &vault_addr);
    let total_assets = vault_client.total_assets();
    let total_supply = vault_client.total_supply();
    let raffle_shares = get_i128(env, DataKey::TotalShares);

    if total_supply == 0 {
        return 0;
    }

    raffle_shares * total_assets / total_supply
}

fn preview_shares(env: &Env, assets: i128) -> i128 {
    let vault_addr = env
        .storage()
        .persistent()
        .get::<_, Address>(&DataKey::Vault)
        .unwrap();

    let vault_client = DeFindexVaultClient::new(env, &vault_addr);
    let total_assets = vault_client.total_assets();
    let total_supply = vault_client.total_supply();

    if total_assets == 0 {
        return 0;
    }

    assets * total_supply / total_assets
}

fn next_nonce(env: &Env, caller: &Address) -> u64 {
    let key = DataKey::Nonce(caller.clone());
    let current = env
        .storage()
        .persistent()
        .get(&key)
        .unwrap_or(0u64);
    let next = current.wrapping_add(1);
    env.storage().persistent().set(&key, &next);
    next
}

fn append_u64(bytes: &mut Bytes, value: u64) {
    bytes.extend_from_slice(&value.to_be_bytes());
}

fn authorize_vault_deposit(
    env: &Env,
    vault: &Address,
    token: &Address,
    from: &Address,
    amounts: &Vec<i128>,
    min_amounts: &Vec<i128>,
    invest: bool,
    amount: i128,
    token_recipient: &Address,
) {
    let mut transfer_args = Vec::new(env);
    transfer_args.push_back(from.clone().into_val(env));
    transfer_args.push_back(token_recipient.clone().into_val(env));
    transfer_args.push_back(amount.into_val(env));

    let transfer_context = ContractContext {
        contract: token.clone(),
        fn_name: Symbol::new(env, "transfer"),
        args: transfer_args,
    };

    let mut transfer_invocations = Vec::new(env);
    transfer_invocations.push_back(InvokerContractAuthEntry::Contract(SubContractInvocation {
        context: transfer_context,
        sub_invocations: Vec::new(env),
    }));

    let mut deposit_args = Vec::new(env);
    deposit_args.push_back(amounts.clone().into_val(env));
    deposit_args.push_back(min_amounts.clone().into_val(env));
    deposit_args.push_back(from.clone().into_val(env));
    deposit_args.push_back(invest.into_val(env));

    let deposit_context = ContractContext {
        contract: vault.clone(),
        fn_name: Symbol::new(env, "deposit"),
        args: deposit_args,
    };

    let mut entries = Vec::new(env);
    entries.push_back(InvokerContractAuthEntry::Contract(SubContractInvocation {
        context: deposit_context,
        sub_invocations: transfer_invocations,
    }));

    env.authorize_as_current_contract(entries);
}

#[cfg(test)]
mod test;
