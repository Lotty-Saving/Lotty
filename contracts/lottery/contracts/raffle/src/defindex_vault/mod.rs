pub const WASM: &[u8] = soroban_sdk::contractfile!(
    file = "contracts/defindex_vault.wasm", sha256 =
    "ae3409a4090bc087b86b4e9b444d2b8017ccd97b90b069d44d005ab9f8e1468b"
);
#[soroban_sdk::contractargs(name = "Args")]
#[soroban_sdk::contractclient(name = "Client")]
pub trait Contract {
    fn total_supply(env: soroban_sdk::Env) -> i128;
    fn allowance(
        env: soroban_sdk::Env,
        from: soroban_sdk::Address,
        spender: soroban_sdk::Address,
    ) -> i128;
    fn approve(
        env: soroban_sdk::Env,
        from: soroban_sdk::Address,
        spender: soroban_sdk::Address,
        amount: i128,
        expiration_ledger: u32,
    );
    fn balance(env: soroban_sdk::Env, id: soroban_sdk::Address) -> i128;
    fn transfer(
        env: soroban_sdk::Env,
        from: soroban_sdk::Address,
        to: soroban_sdk::Address,
        amount: i128,
    );
    fn transfer_from(
        env: soroban_sdk::Env,
        spender: soroban_sdk::Address,
        from: soroban_sdk::Address,
        to: soroban_sdk::Address,
        amount: i128,
    );
    fn burn(env: soroban_sdk::Env, from: soroban_sdk::Address, amount: i128);
    fn burn_from(
        env: soroban_sdk::Env,
        spender: soroban_sdk::Address,
        from: soroban_sdk::Address,
        amount: i128,
    );
    fn decimals(env: soroban_sdk::Env) -> u32;
    fn name(env: soroban_sdk::Env) -> soroban_sdk::String;
    fn symbol(env: soroban_sdk::Env) -> soroban_sdk::String;
    fn __constructor(
        env: soroban_sdk::Env,
        assets: soroban_sdk::Vec<AssetStrategySet>,
        roles: soroban_sdk::Map<u32, soroban_sdk::Address>,
        vault_fee: u32,
        defindex_protocol_receiver: soroban_sdk::Address,
        defindex_protocol_rate: u32,
        soroswap_router: soroban_sdk::Address,
        name_symbol: soroban_sdk::Map<soroban_sdk::String, soroban_sdk::String>,
        upgradable: bool,
    );
    fn deposit(
        env: soroban_sdk::Env,
        amounts_desired: soroban_sdk::Vec<i128>,
        amounts_min: soroban_sdk::Vec<i128>,
        from: soroban_sdk::Address,
        invest: bool,
    ) -> Result<
        (
            soroban_sdk::Vec<i128>,
            i128,
            Option<soroban_sdk::Vec<Option<AssetInvestmentAllocation>>>,
        ),
        ContractError,
    >;
    fn withdraw(
        env: soroban_sdk::Env,
        withdraw_shares: i128,
        min_amounts_out: soroban_sdk::Vec<i128>,
        from: soroban_sdk::Address,
    ) -> Result<soroban_sdk::Vec<i128>, ContractError>;
    fn rescue(
        env: soroban_sdk::Env,
        strategy_address: soroban_sdk::Address,
        caller: soroban_sdk::Address,
    ) -> Result<(), ContractError>;
    fn pause_strategy(
        env: soroban_sdk::Env,
        strategy_address: soroban_sdk::Address,
        caller: soroban_sdk::Address,
    ) -> Result<(), ContractError>;
    fn unpause_strategy(
        env: soroban_sdk::Env,
        strategy_address: soroban_sdk::Address,
        caller: soroban_sdk::Address,
    ) -> Result<(), ContractError>;
    fn get_assets(
        env: soroban_sdk::Env,
    ) -> Result<soroban_sdk::Vec<AssetStrategySet>, ContractError>;
    fn fetch_total_managed_funds(
        env: soroban_sdk::Env,
    ) -> Result<soroban_sdk::Vec<CurrentAssetInvestmentAllocation>, ContractError>;
    fn get_asset_amounts_per_shares(
        env: soroban_sdk::Env,
        vault_shares: i128,
    ) -> Result<soroban_sdk::Vec<i128>, ContractError>;
    fn get_fees(env: soroban_sdk::Env) -> (u32, u32);
    fn report(env: soroban_sdk::Env) -> Result<soroban_sdk::Vec<Report>, ContractError>;
    fn set_fee_receiver(
        env: soroban_sdk::Env,
        caller: soroban_sdk::Address,
        new_fee_receiver: soroban_sdk::Address,
    );
    fn get_fee_receiver(
        env: soroban_sdk::Env,
    ) -> Result<soroban_sdk::Address, ContractError>;
    fn set_manager(
        env: soroban_sdk::Env,
        new_manager: soroban_sdk::Address,
    ) -> Result<(), ContractError>;
    fn get_manager(env: soroban_sdk::Env) -> Result<soroban_sdk::Address, ContractError>;
    fn set_emergency_manager(
        env: soroban_sdk::Env,
        emergency_manager: soroban_sdk::Address,
    );
    fn get_emergency_manager(
        env: soroban_sdk::Env,
    ) -> Result<soroban_sdk::Address, ContractError>;
    fn set_rebalance_manager(
        env: soroban_sdk::Env,
        new_rebalance_manager: soroban_sdk::Address,
    );
    fn get_rebalance_manager(
        env: soroban_sdk::Env,
    ) -> Result<soroban_sdk::Address, ContractError>;
    fn upgrade(
        env: soroban_sdk::Env,
        new_wasm_hash: soroban_sdk::BytesN<32>,
    ) -> Result<(), ContractError>;
    fn rebalance(
        env: soroban_sdk::Env,
        caller: soroban_sdk::Address,
        instructions: soroban_sdk::Vec<Instruction>,
    ) -> Result<(), ContractError>;
    fn lock_fees(
        env: soroban_sdk::Env,
        new_fee_bps: Option<u32>,
    ) -> Result<soroban_sdk::Vec<Report>, ContractError>;
    fn release_fees(
        env: soroban_sdk::Env,
        strategy: soroban_sdk::Address,
        amount: i128,
    ) -> Result<Report, ContractError>;
    fn distribute_fees(
        env: soroban_sdk::Env,
        caller: soroban_sdk::Address,
    ) -> Result<soroban_sdk::Vec<(soroban_sdk::Address, i128)>, ContractError>;
    fn sort_tokens(
        env: soroban_sdk::Env,
        token_a: soroban_sdk::Address,
        token_b: soroban_sdk::Address,
    ) -> Result<(soroban_sdk::Address, soroban_sdk::Address), SoroswapLibraryError>;
    fn pair_for(
        env: soroban_sdk::Env,
        factory: soroban_sdk::Address,
        token_a: soroban_sdk::Address,
        token_b: soroban_sdk::Address,
    ) -> Result<soroban_sdk::Address, SoroswapLibraryError>;
    fn get_reserves_with_factory(
        env: soroban_sdk::Env,
        factory: soroban_sdk::Address,
        token_a: soroban_sdk::Address,
        token_b: soroban_sdk::Address,
    ) -> Result<(i128, i128), SoroswapLibraryError>;
    fn get_reserves_with_pair(
        env: soroban_sdk::Env,
        pair: soroban_sdk::Address,
        token_a: soroban_sdk::Address,
        token_b: soroban_sdk::Address,
    ) -> Result<(i128, i128), SoroswapLibraryError>;
    fn quote(
        env: soroban_sdk::Env,
        amount_a: i128,
        reserve_a: i128,
        reserve_b: i128,
    ) -> Result<i128, SoroswapLibraryError>;
    fn get_amount_out(
        env: soroban_sdk::Env,
        amount_in: i128,
        reserve_in: i128,
        reserve_out: i128,
    ) -> Result<i128, SoroswapLibraryError>;
    fn get_amount_in(
        env: soroban_sdk::Env,
        amount_out: i128,
        reserve_in: i128,
        reserve_out: i128,
    ) -> Result<i128, SoroswapLibraryError>;
    fn get_amounts_out(
        env: soroban_sdk::Env,
        factory: soroban_sdk::Address,
        amount_in: i128,
        path: soroban_sdk::Vec<soroban_sdk::Address>,
    ) -> Result<soroban_sdk::Vec<i128>, SoroswapLibraryError>;
    fn get_amounts_in(
        env: soroban_sdk::Env,
        factory: soroban_sdk::Address,
        amount_out: i128,
        path: soroban_sdk::Vec<soroban_sdk::Address>,
    ) -> Result<soroban_sdk::Vec<i128>, SoroswapLibraryError>;
}
#[soroban_sdk::contracttype(export = false)]
#[derive(Debug, Clone, Eq, PartialEq, Ord, PartialOrd)]
pub struct VaultDepositEvent {
    pub amounts: soroban_sdk::Vec<i128>,
    pub depositor: soroban_sdk::Address,
    pub df_tokens_minted: i128,
    pub total_managed_funds_before: soroban_sdk::Vec<CurrentAssetInvestmentAllocation>,
    pub total_supply_before: i128,
}
#[soroban_sdk::contracttype(export = false)]
#[derive(Debug, Clone, Eq, PartialEq, Ord, PartialOrd)]
pub struct VaultWithdrawEvent {
    pub amounts_withdrawn: soroban_sdk::Vec<i128>,
    pub df_tokens_burned: i128,
    pub total_managed_funds_before: soroban_sdk::Vec<CurrentAssetInvestmentAllocation>,
    pub total_supply_before: i128,
    pub withdrawer: soroban_sdk::Address,
}
#[soroban_sdk::contracttype(export = false)]
#[derive(Debug, Clone, Eq, PartialEq, Ord, PartialOrd)]
pub struct EmergencyWithdrawEvent {
    pub amount_withdrawn: i128,
    pub caller: soroban_sdk::Address,
    pub strategy_address: soroban_sdk::Address,
}
#[soroban_sdk::contracttype(export = false)]
#[derive(Debug, Clone, Eq, PartialEq, Ord, PartialOrd)]
pub struct StrategyPausedEvent {
    pub caller: soroban_sdk::Address,
    pub strategy_address: soroban_sdk::Address,
}
#[soroban_sdk::contracttype(export = false)]
#[derive(Debug, Clone, Eq, PartialEq, Ord, PartialOrd)]
pub struct StrategyUnpausedEvent {
    pub caller: soroban_sdk::Address,
    pub strategy_address: soroban_sdk::Address,
}
#[soroban_sdk::contracttype(export = false)]
#[derive(Debug, Clone, Eq, PartialEq, Ord, PartialOrd)]
pub struct FeeReceiverChangedEvent {
    pub caller: soroban_sdk::Address,
    pub new_fee_receiver: soroban_sdk::Address,
}
#[soroban_sdk::contracttype(export = false)]
#[derive(Debug, Clone, Eq, PartialEq, Ord, PartialOrd)]
pub struct ManagerChangedEvent {
    pub new_manager: soroban_sdk::Address,
}
#[soroban_sdk::contracttype(export = false)]
#[derive(Debug, Clone, Eq, PartialEq, Ord, PartialOrd)]
pub struct EmergencyManagerChangedEvent {
    pub new_emergency_manager: soroban_sdk::Address,
}
#[soroban_sdk::contracttype(export = false)]
#[derive(Debug, Clone, Eq, PartialEq, Ord, PartialOrd)]
pub struct RebalanceManagerChangedEvent {
    pub new_rebalance_manager: soroban_sdk::Address,
}
#[soroban_sdk::contracttype(export = false)]
#[derive(Debug, Clone, Eq, PartialEq, Ord, PartialOrd)]
pub struct FeesDistributedEvent {
    pub distributed_fees: soroban_sdk::Vec<(soroban_sdk::Address, i128)>,
}
#[soroban_sdk::contracttype(export = false)]
#[derive(Debug, Clone, Eq, PartialEq, Ord, PartialOrd)]
pub struct UnwindEvent {
    pub call_params: soroban_sdk::Vec<
        (soroban_sdk::Address, i128, soroban_sdk::Address),
    >,
    pub rebalance_method: soroban_sdk::Symbol,
    pub report: Report,
}
#[soroban_sdk::contracttype(export = false)]
#[derive(Debug, Clone, Eq, PartialEq, Ord, PartialOrd)]
pub struct InvestEvent {
    pub asset_investments: soroban_sdk::Vec<AssetInvestmentAllocation>,
    pub rebalance_method: soroban_sdk::Symbol,
    pub report: Report,
}
#[soroban_sdk::contracttype(export = false)]
#[derive(Debug, Clone, Eq, PartialEq, Ord, PartialOrd)]
pub struct SwapExactInEvent {
    pub rebalance_method: soroban_sdk::Symbol,
    pub swap_args: soroban_sdk::Vec<soroban_sdk::Val>,
}
#[soroban_sdk::contracttype(export = false)]
#[derive(Debug, Clone, Eq, PartialEq, Ord, PartialOrd)]
pub struct SwapExactOutEvent {
    pub rebalance_method: soroban_sdk::Symbol,
    pub swap_args: soroban_sdk::Vec<soroban_sdk::Val>,
}
#[soroban_sdk::contracttype(export = false)]
#[derive(Debug, Clone, Eq, PartialEq, Ord, PartialOrd)]
pub struct StrategyAllocation {
    pub amount: i128,
    pub paused: bool,
    pub strategy_address: soroban_sdk::Address,
}
#[soroban_sdk::contracttype(export = false)]
#[derive(Debug, Clone, Eq, PartialEq, Ord, PartialOrd)]
pub struct CurrentAssetInvestmentAllocation {
    pub asset: soroban_sdk::Address,
    pub idle_amount: i128,
    pub invested_amount: i128,
    pub strategy_allocations: soroban_sdk::Vec<StrategyAllocation>,
    pub total_amount: i128,
}
#[soroban_sdk::contracttype(export = false)]
#[derive(Debug, Clone, Eq, PartialEq, Ord, PartialOrd)]
pub struct AssetInvestmentAllocation {
    pub asset: soroban_sdk::Address,
    pub strategy_allocations: soroban_sdk::Vec<Option<StrategyAllocation>>,
}
#[soroban_sdk::contracttype(export = false)]
#[derive(Debug, Clone, Eq, PartialEq, Ord, PartialOrd)]
pub struct Report {
    pub gains_or_losses: i128,
    pub locked_fee: i128,
    pub prev_balance: i128,
}
#[soroban_sdk::contracttype(export = false)]
#[derive(Debug, Clone, Eq, PartialEq, Ord, PartialOrd)]
pub struct AllowanceDataKey {
    pub from: soroban_sdk::Address,
    pub spender: soroban_sdk::Address,
}
#[soroban_sdk::contracttype(export = false)]
#[derive(Debug, Clone, Eq, PartialEq, Ord, PartialOrd)]
pub struct AllowanceValue {
    pub amount: i128,
    pub expiration_ledger: u32,
}
#[soroban_sdk::contracttype(export = false)]
#[derive(Debug, Clone, Eq, PartialEq, Ord, PartialOrd)]
pub struct Strategy {
    pub address: soroban_sdk::Address,
    pub name: soroban_sdk::String,
    pub paused: bool,
}
#[soroban_sdk::contracttype(export = false)]
#[derive(Debug, Clone, Eq, PartialEq, Ord, PartialOrd)]
pub struct AssetStrategySet {
    pub address: soroban_sdk::Address,
    pub strategies: soroban_sdk::Vec<Strategy>,
}
#[soroban_sdk::contracttype(export = false)]
#[derive(Debug, Clone, Eq, PartialEq, Ord, PartialOrd)]
pub struct DepositEvent {
    pub amount: i128,
    pub from: soroban_sdk::Address,
}
#[soroban_sdk::contracttype(export = false)]
#[derive(Debug, Clone, Eq, PartialEq, Ord, PartialOrd)]
pub struct HarvestEvent {
    pub amount: i128,
    pub from: soroban_sdk::Address,
    pub price_per_share: i128,
}
#[soroban_sdk::contracttype(export = false)]
#[derive(Debug, Clone, Eq, PartialEq, Ord, PartialOrd)]
pub struct WithdrawEvent {
    pub amount: i128,
    pub from: soroban_sdk::Address,
}
#[soroban_sdk::contracttype(export = false)]
#[derive(Debug, Clone, Eq, PartialEq, Ord, PartialOrd)]
pub struct TokenMetadata {
    pub decimal: u32,
    pub name: soroban_sdk::String,
    pub symbol: soroban_sdk::String,
}
#[soroban_sdk::contracttype(export = false)]
#[derive(Debug, Clone, Eq, PartialEq, Ord, PartialOrd)]
pub enum RolesDataKey {
    EmergencyManager,
    VaultFeeReceiver,
    Manager,
    RebalanceManager,
}
#[soroban_sdk::contracttype(export = false)]
#[derive(Debug, Clone, Eq, PartialEq, Ord, PartialOrd)]
pub enum Instruction {
    Unwind(soroban_sdk::Address, i128),
    Invest(soroban_sdk::Address, i128),
    SwapExactIn(soroban_sdk::Address, soroban_sdk::Address, i128, i128, u64),
    SwapExactOut(soroban_sdk::Address, soroban_sdk::Address, i128, i128, u64),
}
#[soroban_sdk::contracttype(export = false)]
#[derive(Debug, Clone, Eq, PartialEq, Ord, PartialOrd)]
pub enum DataKey {
    Allowance(AllowanceDataKey),
    Balance(soroban_sdk::Address),
    TotalSupply,
}
#[soroban_sdk::contracterror(export = false)]
#[derive(Debug, Copy, Clone, Eq, PartialEq, Ord, PartialOrd)]
pub enum ContractError {
    NotInitialized = 100,
    InvalidRatio = 101,
    StrategyDoesNotSupportAsset = 102,
    NoAssetAllocation = 103,
    RolesIncomplete = 104,
    MetadataIncomplete = 105,
    MaximumFeeExceeded = 106,
    DuplicatedAsset = 107,
    DuplicatedStrategy = 108,
    AmountNotAllowed = 110,
    InsufficientBalance = 111,
    WrongAmountsLength = 112,
    WrongLockedFees = 113,
    InsufficientManagedFunds = 114,
    MissingInstructionData = 115,
    UnsupportedAsset = 116,
    InsufficientAmount = 117,
    NoOptimalAmounts = 118,
    WrongInvestmentLength = 119,
    WrongAssetAddress = 122,
    WrongStrategiesLength = 123,
    AmountOverTotalSupply = 124,
    NoInstructions = 125,
    NotUpgradable = 126,
    UnwindMoreThanAvailable = 128,
    InsufficientFeesToRelease = 129,
    ArithmeticError = 120,
    Overflow = 121,
    Underflow = 127,
    Unauthorized = 130,
    RoleNotFound = 131,
    ManagerNotInQueue = 132,
    SetManagerBeforeTime = 133,
    QueueEmpty = 134,
    StrategyNotFound = 140,
    StrategyPausedOrNotFound = 141,
    StrategyWithdrawError = 142,
    StrategyInvestError = 143,
    StrategyPaused = 144,
    AssetNotFound = 150,
    NoAssetsProvided = 151,
    InsufficientOutputAmount = 160,
    ExcessiveInputAmount = 161,
    InvalidFeeBps = 162,
    LibrarySortIdenticalTokens = 190,
    SoroswapRouterError = 200,
    SwapExactInError = 201,
    SwapExactOutError = 202,
}
#[soroban_sdk::contracterror(export = false)]
#[derive(Debug, Copy, Clone, Eq, PartialEq, Ord, PartialOrd)]
pub enum StrategyError {
    NotInitialized = 401,
    NegativeNotAllowed = 410,
    InvalidArgument = 411,
    InsufficientBalance = 412,
    UnderflowOverflow = 413,
    ArithmeticError = 414,
    DivisionByZero = 415,
    InvalidSharesMinted = 416,
    OnlyPositiveAmountAllowed = 417,
    NotAuthorized = 418,
    ProtocolAddressNotFound = 420,
    DeadlineExpired = 421,
    ExternalError = 422,
    SoroswapPairError = 423,
    AmountBelowMinDust = 451,
    UnderlyingAmountBelowMin = 452,
    BTokensAmountBelowMin = 453,
    InternalSwapError = 454,
    SupplyNotFound = 455,
}
#[soroban_sdk::contracterror(export = false)]
#[derive(Debug, Copy, Clone, Eq, PartialEq, Ord, PartialOrd)]
pub enum SoroswapLibraryError {
    InsufficientAmount = 301,
    InsufficientLiquidity = 302,
    InsufficientInputAmount = 303,
    InsufficientOutputAmount = 304,
    InvalidPath = 305,
    SortIdenticalTokens = 306,
}

