# Smart Contracts Soroban

Este directorio contiene los smart contracts desarrollados en Rust usando el SDK de Soroban para Stellar.

## Estructura

```
contracts/
└── lottery/              # Workspace de Rust
    ├── contracts/        # Contratos individuales
    │   └── hello-world/  # Contrato de ejemplo (renombrar/reemplazar)
    └── Cargo.toml        # Workspace configuration
```

## Requisitos Previos

- [Rust](https://www.rust-lang.org/tools/install) instalado
- [Soroban CLI](https://soroban.stellar.org/docs/getting-started/setup#install-the-stellar-cli) instalado
- Target wasm32: `rustup target add wasm32-unknown-unknown`

## Comandos Disponibles

### Desde el directorio raíz del proyecto:

```bash
# Compilar todos los contratos
npm run contract:build

# Ejecutar tests
npm run contract:test

# Deploy a testnet
npm run contract:deploy

# Limpiar build artifacts
npm run contract:clean
```

### Desde el directorio del contrato (`contracts/lottery/contracts/hello-world/`):

```bash
# Compilar
make build

# Ejecutar tests
cargo test

# Generar bindings TypeScript (opcional)
soroban contract bindings typescript \
  --wasm target/wasm32-unknown-unknown/release/hello_world.wasm \
  --output-dir ../../../../src/contracts/bindings
```

## Desarrollo

### 1. Compilar el contrato

```bash
cd contracts/lottery/contracts/hello-world
make build
```

Esto generará el archivo WASM en: `target/wasm32-unknown-unknown/release/`

### 2. Ejecutar tests

```bash
cargo test
```

### 3. Deploy a Testnet

```bash
# Configurar identidad (solo primera vez)
soroban keys generate alice --network testnet

# Deploy
soroban contract deploy \
  --wasm target/wasm32-unknown-unknown/release/hello_world.wasm \
  --source alice \
  --network testnet
```

Esto te devolverá el Contract ID que deberás agregar a tu `.env.local`:

```env
NEXT_PUBLIC_CONTRACT_ID=CXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

### 4. Invocar funciones

```bash
# Ejemplo: invocar la función hello
soroban contract invoke \
  --id <CONTRACT_ID> \
  --source alice \
  --network testnet \
  -- \
  hello \
  --to "World"
```

## Crear un nuevo contrato

```bash
cd contracts/lottery/contracts
soroban contract init mi-nuevo-contrato
```

No olvides agregarlo al workspace en `contracts/lottery/Cargo.toml`:

```toml
[workspace]
members = [
  "contracts/hello-world",
  "contracts/mi-nuevo-contrato",  # ← agregar aquí
]
```

## Optimización para Producción

El perfil de release ya está optimizado en `Cargo.toml` para generar WASM pequeños:

- `opt-level = "z"` - Optimización para tamaño
- `lto = true` - Link Time Optimization
- `codegen-units = 1` - Mejor optimización

## Recursos

- [Documentación Soroban](https://soroban.stellar.org/docs)
- [Ejemplos de Soroban](https://github.com/stellar/soroban-examples)
- [SDK Reference](https://docs.rs/soroban-sdk/latest/soroban_sdk/)
- [Stellar Discord](https://discord.gg/stellardev)

## Integración con el Frontend

Los contratos compilados se invocan desde el frontend usando `@stellar/stellar-sdk`.
Ver ejemplo en: `src/soroban/deposit.ts`
