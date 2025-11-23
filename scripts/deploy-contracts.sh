#!/bin/bash

# Script para deployar smart contracts a testnet
# Uso: ./scripts/deploy-contracts.sh [contract-name] [identity]

set -e

CONTRACT_NAME=${1:-"hello_world"}
IDENTITY=${2:-"alice"}
NETWORK=${3:-"testnet"}

echo "🚀 Deploying contract: $CONTRACT_NAME"
echo "📍 Network: $NETWORK"
echo "👤 Identity: $IDENTITY"
echo ""

# Verificar que el identity existe
if ! soroban keys show $IDENTITY > /dev/null 2>&1; then
  echo "⚠️  Identity '$IDENTITY' no encontrada."
  echo "Creando nueva identity..."
  soroban keys generate $IDENTITY --network $NETWORK
  echo "✅ Identity creada. Por favor, fondea la cuenta en:"
  echo "   https://laboratory.stellar.org/#account-creator?network=$NETWORK"
  echo ""
  read -p "Presiona Enter cuando hayas fondeado la cuenta..."
fi

# Path al archivo WASM
WASM_PATH="contracts/lottery/target/wasm32-unknown-unknown/release/${CONTRACT_NAME}.wasm"

if [ ! -f "$WASM_PATH" ]; then
  echo "❌ Archivo WASM no encontrado: $WASM_PATH"
  echo "Por favor, ejecuta primero: npm run contract:build"
  exit 1
fi

echo "📤 Deploying contract..."
CONTRACT_ID=$(soroban contract deploy \
  --wasm $WASM_PATH \
  --source $IDENTITY \
  --network $NETWORK)

echo ""
echo "✅ Contract deployed successfully!"
echo ""
echo "📝 Contract ID: $CONTRACT_ID"
echo ""
echo "🔧 Agrega esto a tu .env.local:"
echo "NEXT_PUBLIC_CONTRACT_ID=$CONTRACT_ID"
echo ""
echo "📋 Para invocar el contrato:"
echo "soroban contract invoke --id $CONTRACT_ID --source $IDENTITY --network $NETWORK -- <function_name>"

