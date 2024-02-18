#!/bin/bash

echo "[SYSTEM]: Building Docker images..."
docker-compose up -d --build

echo "[SYSTEM]: Connecting to Prisma and applying migrations..."
npx prisma migrate dev --name init 

echo "[SYSTEM]: Setup complete!✨🚀"