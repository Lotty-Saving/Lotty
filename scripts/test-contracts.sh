#!/bin/bash

# Script para ejecutar los tests de los smart contracts

set -e

echo "🧪 Ejecutando tests de smart contracts..."

cd contracts/lottery

# Ejecutar tests de todos los contratos
cargo test

echo "✅ Todos los tests pasaron!"

