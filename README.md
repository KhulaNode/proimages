# ProImages Creative House

A modern, conversion-focused booking and portfolio website for ProImages Creative House, a South African creative business offering photography, graphic design, printing, and event coverage services.

## 🚀 Tech Stack

- **Frontend**: Next.js 14+ (App Router), React, TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL with Prisma ORM
- **Auth**: NextAuth.js (for admin dashboard)
- **Email**: Plunk (with migration path to Resend)
- **Deployment**: Docker + Docker Compose

## 📋 Features

### Public Features
- ✅ Professional homepage with hero section
- ✅ Service pages (Photography, Design, Print, Events)
- ✅ Portfolio/Gallery showcase
- ✅ Contact page with business information
- ✅ **Custom booking system** (< 2 minutes to complete)
  - Service selection
  - Date & time picker with availability checking
  - Client details form with validation
  - Booking confirmation

### Admin Features
- ✅ Dashboard with booking statistics
- ✅ Booking management (approve/reject/complete)
- ✅ Service management
- ✅ Calendar view with blocked dates
- ✅ Portfolio image management

## 🛠️ Setup Instructions

### Quick Start with Docker (Recommended)

The easiest way to get started is using Docker:

```bash
# 1. Update .env with your Plunk API key
cp .env.example .env
# Edit .env and add your PLUNK_API_KEY

# 2. Run the setup script
./docker-setup.sh

# Your app will be running at http://localhost:3000
```

### Manual Setup

### Prerequisites
- Node.js 18+ and npm
- PostgreSQL database

### 1. Clone and Install Dependencies

```bash
cd /home/moloko/KhulaNode/proimages
npm install
```

### 2. Database Setup

Update the `.env` file with your PostgreSQL connection string:

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/proimages?schema=public"
PLUNK_API_KEY="your-plunk-api-key"
```

Push the Prisma schema to your database:

```bash
npm run db:push
```

### 3. Seed Sample Data

\`\`\`bash
npm run db:seed
\`\`\`

This creates:
- 4 service offerings (Studio Photography, Event Coverage, Brand Design, Print Services)
- 4 add-ons (Extra Hour, Rush Delivery, Printed Photos, Digital Download)
- 4 sample portfolio images

### 4. Run Development Server

\`\`\`bash
npm run dev
\`\`\`

Visit [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

\`\`\`
proimages/
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── seed.ts            # Seed data
├── src/
│   ├── app/
│   │   ├── admin/         # Admin dashboard pages
│   │   ├── api/           # API routes
│   │   ├── book/          # Booking flow
│   │   ├── booking/       # Confirmation pages
│   │   ├── contact/       # Contact page
│   │   ├── portfolio/     # Portfolio gallery
│   │   ├── services/      # Service pages
│   │   ├── layout.tsx     # Root layout
│   │   ├── page.tsx       # Homepage
│   │   └── globals.css    # Global styles
│   ├── components/
│   │   └── booking/       # Booking flow components
│   └── lib/
│       ├── prisma.ts      # Prisma client
│       ├── utils.ts       # Utility functions
│       └── email.ts       # Email service
├── .env                   # Environment variables
└── package.json
\`\`\`

## 🎨 Design System

### Colors
- **Primary**: Orange (#FF6B35) - Brand accent color
- **Dark**: #1A1A1A - Main background
- **Gray**: #2D2D2D - Card/component backgrounds

### Typography
- Font: Inter (Google Fonts)
- Headings: Bold, large sizes
- Body: Regular weight, optimized for readability

## 📱 Key Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Hero section + services overview + CTA |
| Services | `/services` | All services with detailed descriptions |
| Portfolio | `/portfolio` | Image gallery by category |
| Contact | `/contact` | Contact info + social links + quick booking |
| Booking | `/book` | 4-step booking flow |
| Confirmation | `/booking/confirmation/[id]` | Booking success page |
| Admin Dashboard | `/admin` | Booking stats + recent bookings |
| Admin Bookings | `/admin/bookings` | Manage all bookings |

## 🔒 Admin Access

The admin dashboard is at `/admin`. 

> **Note**: NextAuth is configured but not fully implemented. To secure the admin routes, complete the NextAuth setup with credentials provider.

## 📧 Email Notifications

Email service is configured with **Plunk** ([useplunk.com](https://useplunk.com)).

**Setup:**

1. Sign up for a free Plunk account at https://useplunk.com
2. Get your API key from the dashboard
3. Add to `.env`:
   ```env
   PLUNK_API_KEY="your-api-key-here"
   EMAIL_FROM="noreply@proimages.co.za"
   ```

**Migrating to Resend (Future):**

When ready to switch to Resend:

```bash
npm install resend
```

Update `src/lib/email.ts`:
```typescript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({ to, subject, html }: EmailOptions) {
  await resend.emails.send({
    from: process.env.EMAIL_FROM!,
    to,
    subject,
    html,
  });
  return true;
}
```

## 🐳 Docker Commands

### Development Environment

```bash
# Start all services (dev mode with hot reload)
docker-compose -f docker-compose.dev.yml up -d

# View logs
docker-compose -f docker-compose.dev.yml logs -f

# Stop services
docker-compose -f docker-compose.dev.yml down

# Rebuild after code changes
docker-compose -f docker-compose.dev.yml up -d --build

# Access database
docker exec -it proimages-db-dev psql -U proimages -d proimages
```

### Production Environment

```bash
# Build and start production containers
docker-compose up -d --build

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Database backup
docker exec proimages-db pg_dump -U proimages proimages > backup.sql
```

## 💳 Payment Integration (Future)

The booking system is structured to add payments later:

- **Recommended**: PayFast (South African) or Paystack (African)
- Add payment gateway in `/api/bookings` route
- Update booking confirmation flow
- Store payment status in `Booking` model

## 🚀 Deployment

### Vercel (Recommended for Next.js)

\`\`\`bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
\`\`\`

**Environment Variables** (add to Vercel):
- `DATABASE_URL`
- `NEXTAUTH_URL`
- `NEXTAUTH_SECRET`
- `BUSINESS_EMAIL`

### Database Hosting
- **Neon** (PostgreSQL): https://neon.tech
- **Supabase**: https://supabase.com
- **Railway**: https://railway.app

## 📝 Next Steps

1. **Add Logo**: Replace placeholder text with actual ProImages logo
2. **Add Images**: Upload real portfolio images and service photos
3. **Setup Email**: Configure email service for booking notifications
4. **Setup Auth**: Complete NextAuth configuration for admin login
5. **Add Payment**: Integrate PayFast or Paystack when ready
6. **SEO**: Add meta tags, Open Graph images, sitemap
7. **Analytics**: Add Google Analytics or Plausible

## 🐛 Troubleshooting

### Database Connection Issues
- Verify PostgreSQL is running
- Check DATABASE_URL in `.env`
- Run `npm run db:push` to sync schema

### Prisma Client Issues
- Run `npx prisma generate`
- Clear `.next` cache: `rm -rf .next`

### Build Errors
- Check all environment variables are set
- Run `npm run lint` to catch TypeScript errors

## 📞 Support

For questions or issues, contact the development team.

## 📄 License

MIT © ProImages Creative House
