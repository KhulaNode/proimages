#!/bin/bash

# ProImages Docker Quick Commands
# Usage: source docker-commands.sh

alias pi-dev-up="docker-compose -f docker-compose.dev.yml up -d"
alias pi-dev-down="docker-compose -f docker-compose.dev.yml down"
alias pi-dev-logs="docker-compose -f docker-compose.dev.yml logs -f"
alias pi-dev-restart="docker-compose -f docker-compose.dev.yml restart"
alias pi-dev-rebuild="docker-compose -f docker-compose.dev.yml up -d --build"

alias pi-prod-up="docker-compose up -d"
alias pi-prod-down="docker-compose down"
alias pi-prod-logs="docker-compose logs -f"
alias pi-prod-restart="docker-compose restart"

alias pi-db="docker exec -it proimages-db-dev psql -U proimages -d proimages"
alias pi-db-backup="docker exec proimages-db-dev pg_dump -U proimages proimages > backup_\$(date +%Y%m%d_%H%M%S).sql"
alias pi-prisma-studio="docker-compose -f docker-compose.dev.yml exec app npx prisma studio"
alias pi-prisma-push="docker-compose -f docker-compose.dev.yml exec app npx prisma db push"
alias pi-seed="docker-compose -f docker-compose.dev.yml exec app npm run db:seed"

echo "✅ ProImages Docker aliases loaded!"
echo ""
echo "Development commands:"
echo "  pi-dev-up       - Start dev environment"
echo "  pi-dev-down     - Stop dev environment"
echo "  pi-dev-logs     - View logs"
echo "  pi-dev-restart  - Restart services"
echo "  pi-dev-rebuild  - Rebuild and restart"
echo ""
echo "Database commands:"
echo "  pi-db           - Access PostgreSQL shell"
echo "  pi-db-backup    - Backup database"
echo "  pi-prisma-studio - Open Prisma Studio"
echo "  pi-seed         - Seed database"
