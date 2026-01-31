# Docker Setup Guide for ProImages

This guide explains how to run ProImages using Docker and Docker Compose.

## 📦 What's Included

The Docker setup includes:
- **Next.js Application** - The ProImages website
- **PostgreSQL Database** - Database for bookings, services, and portfolio
- **Automatic Migrations** - Prisma schema is automatically pushed on startup
- **Development Hot Reload** - Code changes are reflected immediately (dev mode)

## 🚀 Quick Start

### 1. Prerequisites

- Docker Desktop (or Docker Engine + Docker Compose)
- Your Plunk API key from https://useplunk.com

### 2. Setup Environment Variables

```bash
# Copy the example file
cp .env.example .env

# Edit .env and add your credentials
nano .env  # or use your favorite editor
```

Required variables:
```env
DATABASE_URL="postgresql://proimages:proimages_password@postgres:5432/proimages?schema=public"
PLUNK_API_KEY="your-plunk-api-key-here"
EMAIL_FROM="noreply@proimages.co.za"
BUSINESS_EMAIL="molavovic@gmail.com"
NEXTAUTH_SECRET="generate-a-random-secret-here"
```

### 3. Start Services

#### Option A: Using the Setup Script (Recommended)

```bash
./docker-setup.sh
```

This script will:
- Build Docker images
- Start PostgreSQL and the app
- Run database migrations
- Seed sample data

#### Option B: Manual Start

```bash
# Development mode (with hot reload)
docker-compose -f docker-compose.dev.yml up -d

# Production mode
docker-compose up -d
```

### 4. Access Your Application

- **Website**: http://localhost:3000
- **Admin Dashboard**: http://localhost:3000/admin
- **PostgreSQL**: localhost:5432

## 📋 Docker Compose Files

### docker-compose.dev.yml (Development)

- Mounts your local code as a volume
- Hot reload enabled - changes reflect immediately
- PostgreSQL data persists in `postgres_data_dev` volume
- Exposes ports 3000 (app) and 5432 (database)

### docker-compose.yml (Production)

- Builds optimized production image
- No code mounting - baked into the image
- Smaller image size
- Better performance
- Auto-runs migrations and seed on startup

## 🛠️ Common Commands

### Starting and Stopping

```bash
# Start (development)
docker-compose -f docker-compose.dev.yml up -d

# Stop (development)
docker-compose -f docker-compose.dev.yml down

# Restart a specific service
docker-compose -f docker-compose.dev.yml restart app

# Stop and remove volumes (⚠️ deletes database)
docker-compose -f docker-compose.dev.yml down -v
```

### Viewing Logs

```bash
# All services
docker-compose -f docker-compose.dev.yml logs -f

# Just the app
docker-compose -f docker-compose.dev.yml logs -f app

# Just the database
docker-compose -f docker-compose.dev.yml logs -f postgres

# Last 100 lines
docker-compose -f docker-compose.dev.yml logs --tail=100
```

### Database Operations

```bash
# Access PostgreSQL shell
docker exec -it proimages-db-dev psql -U proimages -d proimages

# Run Prisma commands
docker-compose -f docker-compose.dev.yml exec app npx prisma studio
docker-compose -f docker-compose.dev.yml exec app npx prisma db push
docker-compose -f docker-compose.dev.yml exec app npm run db:seed

# Backup database
docker exec proimages-db-dev pg_dump -U proimages proimages > backup.sql

# Restore database
docker exec -i proimages-db-dev psql -U proimages -d proimages < backup.sql
```

### Building and Updating

```bash
# Rebuild images after Dockerfile changes
docker-compose -f docker-compose.dev.yml build --no-cache

# Pull latest dependencies and rebuild
docker-compose -f docker-compose.dev.yml build --pull

# Update and restart
docker-compose -f docker-compose.dev.yml up -d --build
```

## 🐛 Troubleshooting

### Port Already in Use

If you get "port is already allocated" error:

```bash
# Check what's using the port
sudo lsof -i :3000  # or :5432

# Stop the conflicting service or change ports in docker-compose.yml
```

### Database Connection Issues

```bash
# Check if PostgreSQL is healthy
docker ps

# Should show:
# proimages-db-dev   Up X minutes (healthy)

# View database logs
docker logs proimages-db-dev

# Restart database
docker-compose -f docker-compose.dev.yml restart postgres
```

### App Won't Start

```bash
# View detailed logs
docker-compose -f docker-compose.dev.yml logs -f app

# Common issues:
# 1. Missing environment variables - check .env file
# 2. Database not ready - wait a few seconds and retry
# 3. Port conflicts - change port in docker-compose.yml
```

### Clear Everything and Start Fresh

```bash
# Stop all containers
docker-compose -f docker-compose.dev.yml down

# Remove volumes (deletes data!)
docker-compose -f docker-compose.dev.yml down -v

# Remove images
docker rmi proimages-app-dev

# Start fresh
./docker-setup.sh
```

## 🔧 Customization

### Change Ports

Edit `docker-compose.dev.yml`:

```yaml
services:
  app:
    ports:
      - "8080:3000"  # Change 8080 to your preferred port
  
  postgres:
    ports:
      - "5433:5432"  # Change 5433 to your preferred port
```

### Change Database Credentials

Edit `docker-compose.dev.yml` and `.env`:

```yaml
environment:
  POSTGRES_USER: mynewuser
  POSTGRES_PASSWORD: mynewpassword
  POSTGRES_DB: mynewdb
```

```env
DATABASE_URL="postgresql://mynewuser:mynewpassword@postgres:5432/mynewdb?schema=public"
```

### Add More Services

You can extend the docker-compose.yml to add:
- Redis for caching
- Nginx as a reverse proxy
- Adminer for database management

Example:

```yaml
services:
  adminer:
    image: adminer
    restart: unless-stopped
    ports:
      - "8080:8080"
```

## 📊 Production Deployment

### Build Production Image

```bash
docker-compose build
```

### Deploy to Cloud

The Docker setup works with:
- **Railway** - Easiest option, auto-detects Dockerfile
- **Fly.io** - Great for global deployment
- **DigitalOcean App Platform** - Managed container service
- **AWS ECS** - Enterprise-grade solution

### Environment Variables for Production

Make sure to set in your hosting platform:
- `DATABASE_URL` - Production PostgreSQL connection
- `PLUNK_API_KEY` - Production email API key
- `NEXTAUTH_SECRET` - Strong random secret
- `NEXTAUTH_URL` - Your production domain

## 🎯 Best Practices

1. **Never commit `.env`** - Keep it in `.gitignore`
2. **Use strong secrets** - Generate random strings for `NEXTAUTH_SECRET`
3. **Backup regularly** - Use `pg_dump` to backup your database
4. **Monitor logs** - Check logs regularly for errors
5. **Update dependencies** - Keep Docker images and npm packages updated

## 📚 Additional Resources

- [Docker Documentation](https://docs.docker.com)
- [Docker Compose Documentation](https://docs.docker.com/compose)
- [Next.js Docker Deployment](https://nextjs.org/docs/deployment#docker-image)
- [Prisma with Docker](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-aws-lambda)
