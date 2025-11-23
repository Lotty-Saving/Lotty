// Ejemplo de contrato de lotería para Soroban
// Copia este contenido a: contracts/lottery/contracts/hello-world/src/lib.rs

#![no_std]
use soroban_sdk::{
    contract, contractimpl, contracttype, token, Address, Env, Vec, 
    symbol_short, log, map, Map
};

// Estructura para almacenar información de un pool de lotería
#[contracttype]
#[derive(Clone)]
pub struct Pool {
    pub id: u32,
    pub prize_pool: i128,
    pub ticket_price: i128,
    pub end_time: u64,
    pub winner: Option<Address>,
    pub is_active: bool,
}

// Estructura para un ticket
#[contracttype]
#[derive(Clone)]
pub struct Ticket {
    pub pool_id: u32,
    pub owner: Address,
    pub ticket_number: u32,
}

// Errores del contrato
#[contracttype]
#[derive(Clone, Copy, Debug, Eq, PartialEq)]
#[repr(u32)]
pub enum Error {
    InsufficientFunds = 1,
    PoolNotActive = 2,
    PoolNotEnded = 3,
    NoTickets = 4,
    PoolNotFound = 5,
    Unauthorized = 6,
}

// Storage keys
#[contracttype]
pub enum DataKey {
    Admin,
    PoolCounter,
    Pool(u32),                    // Pool by ID
    UserBalance(Address),         // User balance
    PoolTickets(u32),            // Tickets for a pool
    UserTickets(Address, u32),   // User tickets for a pool
}

#[contract]
pub struct LotteryContract;

#[contractimpl]
impl LotteryContract {
    
    /// Inicializa el contrato con un admin
    pub fn initialize(env: Env, admin: Address) {
        admin.require_auth();
        env.storage().instance().set(&DataKey::Admin, &admin);
        env.storage().instance().set(&DataKey::PoolCounter, &0u32);
    }

    /// Crea un nuevo pool de lotería
    pub fn create_pool(
        env: Env,
        ticket_price: i128,
        duration: u64,
    ) -> u32 {
        // Verificar que el admin llama esta función
        let admin: Address = env.storage().instance().get(&DataKey::Admin).unwrap();
        admin.require_auth();

        // Incrementar contador de pools
        let mut pool_counter: u32 = env.storage()
            .instance()
            .get(&DataKey::PoolCounter)
            .unwrap_or(0);
        
        pool_counter += 1;

        // Crear nuevo pool
        let pool = Pool {
            id: pool_counter,
            prize_pool: 0,
            ticket_price,
            end_time: env.ledger().timestamp() + duration,
            winner: None,
            is_active: true,
        };

        // Guardar pool
        env.storage().instance().set(&DataKey::Pool(pool_counter), &pool);
        env.storage().instance().set(&DataKey::PoolCounter, &pool_counter);

        // Emitir evento
        env.events().publish(
            (symbol_short!("pool_new"), pool_counter),
            (ticket_price, duration)
        );

        pool_counter
    }

    /// Deposita fondos a la cuenta del usuario
    pub fn deposit(env: Env, user: Address, amount: i128) {
        user.require_auth();
        
        // Aquí normalmente transferirías tokens usando el token contract
        // Por ahora solo actualizamos el balance interno
        let current_balance = Self::get_balance(env.clone(), user.clone());
        let new_balance = current_balance + amount;
        
        env.storage()
            .instance()
            .set(&DataKey::UserBalance(user.clone()), &new_balance);

        env.events().publish((symbol_short!("deposit"), user), amount);
    }

    /// Compra tickets para un pool
    pub fn buy_tickets(
        env: Env,
        buyer: Address,
        pool_id: u32,
        num_tickets: u32,
    ) -> Result<Vec<u32>, Error> {
        buyer.require_auth();

        // Obtener pool
        let mut pool: Pool = env.storage()
            .instance()
            .get(&DataKey::Pool(pool_id))
            .ok_or(Error::PoolNotFound)?;

        // Verificar que el pool está activo
        if !pool.is_active || env.ledger().timestamp() > pool.end_time {
            return Err(Error::PoolNotActive);
        }

        // Calcular costo total
        let total_cost = pool.ticket_price * (num_tickets as i128);

        // Verificar fondos
        let balance = Self::get_balance(env.clone(), buyer.clone());
        if balance < total_cost {
            return Err(Error::InsufficientFunds);
        }

        // Deducir fondos
        env.storage()
            .instance()
            .set(&DataKey::UserBalance(buyer.clone()), &(balance - total_cost));

        // Agregar al prize pool
        pool.prize_pool += total_cost;
        env.storage().instance().set(&DataKey::Pool(pool_id), &pool);

        // Obtener tickets existentes del pool
        let mut all_tickets: Vec<Ticket> = env.storage()
            .instance()
            .get(&DataKey::PoolTickets(pool_id))
            .unwrap_or(Vec::new(&env));

        // Crear nuevos tickets
        let mut ticket_numbers = Vec::new(&env);
        let start_ticket = all_tickets.len();

        for i in 0..num_tickets {
            let ticket_num = start_ticket + i;
            let ticket = Ticket {
                pool_id,
                owner: buyer.clone(),
                ticket_number: ticket_num,
            };
            
            all_tickets.push_back(ticket);
            ticket_numbers.push_back(ticket_num);
        }

        // Guardar tickets actualizados
        env.storage()
            .instance()
            .set(&DataKey::PoolTickets(pool_id), &all_tickets);

        // Emitir evento
        env.events().publish(
            (symbol_short!("bought"), buyer.clone()),
            (pool_id, num_tickets)
        );

        Ok(ticket_numbers)
    }

    /// Ejecuta el sorteo de un pool (simplificado - usa timestamp como "random")
    pub fn run_lottery(env: Env, pool_id: u32) -> Result<Address, Error> {
        let admin: Address = env.storage().instance().get(&DataKey::Admin).unwrap();
        admin.require_auth();

        // Obtener pool
        let mut pool: Pool = env.storage()
            .instance()
            .get(&DataKey::Pool(pool_id))
            .ok_or(Error::PoolNotFound)?;

        // Verificar que el tiempo terminó
        if env.ledger().timestamp() <= pool.end_time {
            return Err(Error::PoolNotEnded);
        }

        // Verificar que está activo
        if !pool.is_active {
            return Err(Error::PoolNotActive);
        }

        // Obtener todos los tickets
        let tickets: Vec<Ticket> = env.storage()
            .instance()
            .get(&DataKey::PoolTickets(pool_id))
            .ok_or(Error::NoTickets)?;

        if tickets.len() == 0 {
            return Err(Error::NoTickets);
        }

        // "Aleatorio" simple usando timestamp (NO USAR EN PRODUCCIÓN)
        // En producción usa un VRF (Verifiable Random Function)
        let random_index = (env.ledger().timestamp() as u32) % tickets.len();
        let winning_ticket = tickets.get(random_index).unwrap();

        let winner = winning_ticket.owner.clone();

        // Actualizar pool
        pool.winner = Some(winner.clone());
        pool.is_active = false;
        env.storage().instance().set(&DataKey::Pool(pool_id), &pool);

        // Transferir premio al ganador
        let current_winner_balance = Self::get_balance(env.clone(), winner.clone());
        env.storage()
            .instance()
            .set(
                &DataKey::UserBalance(winner.clone()), 
                &(current_winner_balance + pool.prize_pool)
            );

        // Emitir evento
        env.events().publish(
            (symbol_short!("winner"), pool_id),
            winner.clone()
        );

        Ok(winner)
    }

    /// Retira fondos
    pub fn withdraw(env: Env, user: Address, amount: i128) {
        user.require_auth();

        let balance = Self::get_balance(env.clone(), user.clone());
        if balance < amount {
            panic!("Insufficient funds");
        }

        // Aquí normalmente transferirías tokens reales
        env.storage()
            .instance()
            .set(&DataKey::UserBalance(user.clone()), &(balance - amount));

        env.events().publish((symbol_short!("withdraw"), user), amount);
    }

    // ============ VIEW FUNCTIONS ============

    /// Obtiene el balance de un usuario
    pub fn get_balance(env: Env, user: Address) -> i128 {
        env.storage()
            .instance()
            .get(&DataKey::UserBalance(user))
            .unwrap_or(0)
    }

    /// Obtiene información de un pool
    pub fn get_pool(env: Env, pool_id: u32) -> Option<Pool> {
        env.storage().instance().get(&DataKey::Pool(pool_id))
    }

    /// Obtiene el número de tickets de un pool
    pub fn get_pool_ticket_count(env: Env, pool_id: u32) -> u32 {
        let tickets: Vec<Ticket> = env.storage()
            .instance()
            .get(&DataKey::PoolTickets(pool_id))
            .unwrap_or(Vec::new(&env));
        
        tickets.len()
    }

    /// Obtiene el contador actual de pools
    pub fn get_pool_counter(env: Env) -> u32 {
        env.storage()
            .instance()
            .get(&DataKey::PoolCounter)
            .unwrap_or(0)
    }
}

// Tests
#[cfg(test)]
mod test {
    use super::*;
    use soroban_sdk::{testutils::Address as _, Env};

    #[test]
    fn test_full_lottery_flow() {
        let env = Env::default();
        let contract_id = env.register_contract(None, LotteryContract);
        let client = LotteryContractClient::new(&env, &contract_id);

        let admin = Address::generate(&env);
        let user1 = Address::generate(&env);
        let user2 = Address::generate(&env);

        // Inicializar
        client.initialize(&admin);

        // Crear pool
        let pool_id = client.create_pool(&1000i128, &3600u64);
        assert_eq!(pool_id, 1);

        // Depositar fondos
        client.deposit(&user1, &5000i128);
        client.deposit(&user2, &3000i128);

        assert_eq!(client.get_balance(&user1), 5000);
        assert_eq!(client.get_balance(&user2), 3000);

        // Comprar tickets
        let tickets1 = client.buy_tickets(&user1, &pool_id, &3u32);
        assert_eq!(tickets1.len(), 3);
        
        let tickets2 = client.buy_tickets(&user2, &pool_id, &2u32);
        assert_eq!(tickets2.len(), 2);

        // Verificar balances después de compra
        assert_eq!(client.get_balance(&user1), 2000); // 5000 - 3*1000
        assert_eq!(client.get_balance(&user2), 1000); // 3000 - 2*1000

        // Verificar pool
        let pool = client.get_pool(&pool_id).unwrap();
        assert_eq!(pool.prize_pool, 5000); // 3000 + 2000
        assert_eq!(client.get_pool_ticket_count(&pool_id), 5);
    }

    #[test]
    #[should_panic(expected = "InsufficientFunds")]
    fn test_insufficient_funds() {
        let env = Env::default();
        let contract_id = env.register_contract(None, LotteryContract);
        let client = LotteryContractClient::new(&env, &contract_id);

        let admin = Address::generate(&env);
        let user = Address::generate(&env);

        client.initialize(&admin);
        let pool_id = client.create_pool(&1000i128, &3600u64);
        
        client.deposit(&user, &500i128);
        
        // Intentar comprar más tickets de los que puede
        client.buy_tickets(&user, &pool_id, &2u32);
    }
}

