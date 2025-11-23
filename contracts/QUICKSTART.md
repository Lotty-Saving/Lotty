# 🚀 Quickstart - Desarrollo de Smart Contracts

## ✅ Configuración Completa

Tu proyecto ya está configurado con:

- ✅ Estructura de carpetas para contratos Soroban
- ✅ Scripts de compilación y deployment
- ✅ Contrato de ejemplo funcionando
- ✅ Tests funcionando

## 📁 Estructura Actual

```
Lotty/
├── contracts/
│   ├── lottery/                    # Workspace de Rust
│   │   ├── contracts/
│   │   │   └── hello-world/        # Contrato de ejemplo
│   │   │       ├── src/
│   │   │       │   ├── lib.rs      # Código del contrato
│   │   │       │   └── test.rs     # Tests
│   │   │       ├── Cargo.toml
│   │   │       └── Makefile
│   │   ├── target/                 # Archivos compilados (WASM)
│   │   └── Cargo.toml              # Workspace config
│   └── README.md                   # Documentación detallada
├── scripts/
│   ├── build-contracts.sh          # Script de compilación
│   ├── test-contracts.sh           # Script de tests
│   └── deploy-contracts.sh         # Script de deployment
└── src/
    └── soroban/                    # Integración frontend
        └── deposit.ts              # Ejemplo de llamada a contrato
```

## 🎯 Próximos Pasos

### 1. Renombrar el Contrato de Ejemplo

```bash
cd contracts/lottery/contracts
mv hello-world lottery-contract
```

Luego actualiza `contracts/lottery/Cargo.toml`:

```toml
[workspace]
members = [
  "contracts/lottery-contract",  # ← cambiar esto
]
```

### 2. Desarrollar tu Contrato de Lotería

Edita `contracts/lottery/contracts/lottery-contract/src/lib.rs` con tu lógica de negocio.

**Estructura básica recomendada:**

```rust
#![no_std]
use soroban_sdk::{contract, contractimpl, Env, Address, symbol_short};

#[contract]
pub struct LotteryContract;

#[contractimpl]
impl LotteryContract {
    // Comprar tickets
    pub fn buy_tickets(
        env: Env,
        buyer: Address,
        amount: i128
    ) -> Result<u32, Error> {
        // Tu lógica aquí
        Ok(1)
    }

    // Depositar fondos
    pub fn deposit(
        env: Env,
        user: Address,
        amount: i128
    ) -> Result<(), Error> {
        // Tu lógica aquí
        Ok(())
    }

    // Obtener balance
    pub fn get_balance(
        env: Env,
        user: Address
    ) -> i128 {
        // Tu lógica aquí
        0
    }

    // Ejecutar sorteo
    pub fn run_lottery(env: Env) -> Result<Address, Error> {
        // Tu lógica aquí
        todo!()
    }
}

#[derive(Debug, Clone)]
pub enum Error {
    InsufficientFunds = 1,
    NoTickets = 2,
    // ... más errores
}
```

### 3. Escribir Tests

Edita `contracts/lottery/contracts/lottery-contract/src/test.rs`:

```rust
#[test]
fn test_buy_tickets() {
    let env = Env::default();
    let contract_id = env.register_contract(None, Contract);
    let client = ContractClient::new(&env, &contract_id);

    let user = Address::generate(&env);

    // Test tu lógica
    let result = client.buy_tickets(&user, &1000);
    assert_eq!(result, 1);
}
```

### 4. Compilar

```bash
npm run contract:build
```

El archivo WASM se generará en:

```
contracts/lottery/target/wasm32-unknown-unknown/release/lottery_contract.wasm
```

### 5. Ejecutar Tests

```bash
npm run contract:test
```

### 6. Deploy a Testnet

```bash
# Primera vez: crear identity y fondear cuenta
soroban keys generate alice --network testnet

# Obtener fondos de testnet
# Visita: https://laboratory.stellar.org/#account-creator?network=testnet
# Y fondea la dirección que te da: soroban keys address alice

# Deploy
npm run contract:deploy lottery_contract alice testnet
```

Esto te dará un CONTRACT_ID que deberás agregar a `.env.local`:

```env
NEXT_PUBLIC_CONTRACT_ID=CXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

### 7. Integrar con el Frontend

Crea o modifica archivos en `src/soroban/` para interactuar con tu contrato.

**Ejemplo** (`src/soroban/lottery.ts`):

```typescript
import { Contract, Address, nativeToScVal } from "@stellar/stellar-sdk";

export async function buyTickets({
  userAddress,
  amount,
  signTransaction,
}: {
  userAddress: string;
  amount: string;
  signTransaction: (xdr: string) => Promise<{ signedTxXdr: string }>;
}) {
  const contract = new Contract(process.env.NEXT_PUBLIC_CONTRACT_ID!);

  // ... similar a deposit.ts
  const contractCallOp = contract.call(
    "buy_tickets",
    new Address(userAddress).toScVal(),
    nativeToScVal(amount, { type: "i128" }),
  );

  // ... resto del flujo
}
```

## 🔧 Comandos Útiles

```bash
# Desarrollo
npm run contract:build        # Compilar
npm run contract:test         # Tests
npm run contract:clean        # Limpiar

# Deploy
npm run contract:deploy       # Deploy con valores default
bash scripts/deploy-contracts.sh lottery_contract alice testnet

# Invocar funciones (después de deploy)
soroban contract invoke \
  --id <CONTRACT_ID> \
  --source alice \
  --network testnet \
  -- \
  buy_tickets \
  --buyer <ADDRESS> \
  --amount 1000
```

## 📚 Recursos de Aprendizaje

- [Documentación Soroban](https://soroban.stellar.org/docs)
- [Ejemplos de Soroban](https://github.com/stellar/soroban-examples)
- [SDK Reference](https://docs.rs/soroban-sdk/latest/soroban_sdk/)
- [Tutorial Completo](https://soroban.stellar.org/docs/getting-started)

## 💡 Tips

1. **Usa el contrato de ejemplo como referencia** hasta que entiendas la estructura
2. **Escribe tests primero** - más fácil debuggear en Rust que on-chain
3. **Mantén funciones pequeñas** - gas/resources son limitados
4. **Usa eventos** para logging y debugging:
   ```rust
   env.events().publish((symbol_short!("bought"), buyer), amount);
   ```
5. **Versiona tus contratos** - una vez deployed son inmutables

## 🐛 Troubleshooting

### Error: "failed to get soroban-sdk"

```bash
# Limpiar y reconstruir
npm run contract:clean
npm run contract:build
```

### Error: "account doesn't exist"

```bash
# Fondear cuenta en testnet
# Visita: https://laboratory.stellar.org/#account-creator?network=testnet
```

### Error de compilación

```bash
# Verificar Rust está actualizado
rustup update

# Verificar target wasm32
rustup target add wasm32-unknown-unknown
```

---

## 🎉 ¡Estás listo para empezar!

Comienza editando `contracts/lottery/contracts/hello-world/src/lib.rs` y construye tu lógica de lotería.
