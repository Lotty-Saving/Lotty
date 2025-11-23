#!/bin/bash

# Script para compilar todos los smart contracts de Soroban

set -e

echo "🔨 Compilando smart contracts de Soroban..."

cd contracts/lottery

# Compilar todos los contratos en el workspace
cargo build --release --target wasm32-unknown-unknown

echo "✅ Contratos compilados exitosamente!"
echo ""
echo "📦 Archivos WASM generados en:"
echo "   contracts/lottery/target/wasm32-unknown-unknown/release/"

