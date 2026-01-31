#!/bin/bash

# Docker Setup Script for ProImages

echo "🐳 Setting up ProImages with Docker..."

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file from .env.example..."
    cp .env.example .env
    echo "⚠️  Please update .env with your actual credentials (especially PLUNK_API_KEY)"
fi

# Build and start containers
echo "🏗️  Building Docker containers..."
docker-compose -f docker-compose.dev.yml build

echo "🚀 Starting services..."
docker-compose -f docker-compose.dev.yml up -d

echo "⏳ Waiting for database to be ready..."
sleep 5

echo "📦 Running database migrations and seed..."
docker-compose -f docker-compose.dev.yml exec app npx prisma db push --accept-data-loss
docker-compose -f docker-compose.dev.yml exec app npm run db:seed

echo "✅ Setup complete!"
echo ""
echo "🌐 Your app is running at: http://localhost:3000"
echo "📊 PostgreSQL is running at: localhost:5432"
echo ""
echo "📝 Useful commands:"
echo "  - View logs: docker-compose -f docker-compose.dev.yml logs -f"
echo "  - Stop: docker-compose -f docker-compose.dev.yml down"
echo "  - Restart: docker-compose -f docker-compose.dev.yml restart"
