#!/bin/bash

# Check for Prisma dependencies
if ! command -v npx &> /dev/null; then
    echo "Prisma CLI (npx) could not be found. Please install it: https://www.prisma.io/docs/getting-started"
    exit 1
fi

# Check for Docker and Docker Compose
if ! command -v docker &> /dev/null; then
    echo "Docker could not be found. Please install it: https://docs.docker.com/get-docker/"
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "Docker Compose could not be found. Please install it: https://docs.docker.com/compose/install/"
    exit 1
fi

# Build Docker images (assumes a docker-compose.yml in the project root)
docker-compose build

# Prisma setup (if it's the first run)
if [[ ! -f prisma/schema.prisma ]]; then
    echo "Initializing Prisma..."
    npx prisma init
fi

# Update Prisma model based on the database (may be needed initially)
npx prisma db push

# Generate the Prisma client
npx prisma generate

# Start the application and services
docker-compose up -d
echo "Setup complete! Your application should be accessible."
