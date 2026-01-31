import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Create services
  const services = [
    {
      name: "Studio Photography",
      slug: "studio-photography",
      category: "photography",
      description: "Professional studio portrait and product photography sessions",
      basePrice: 1500,
      duration: 120,
      isActive: true,
      sortOrder: 1,
    },
    {
      name: "Event Coverage",
      slug: "event-coverage",
      category: "events",
      description: "Complete event photography and videography coverage",
      basePrice: 3500,
      duration: 240,
      isActive: true,
      sortOrder: 2,
    },
    {
      name: "Brand Design Package",
      slug: "brand-design",
      category: "design",
      description: "Logo design, business cards, and complete brand identity",
      basePrice: 2500,
      duration: 60,
      isActive: true,
      sortOrder: 3,
    },
    {
      name: "Print Services",
      slug: "print-services",
      category: "print",
      description: "High-quality printing for business cards, posters, and more",
      basePrice: 500,
      duration: 30,
      isActive: true,
      sortOrder: 4,
    },
  ];

  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: {},
      create: service,
    });
  }

  console.log("✅ Services created");

  // Create add-ons
  const addOns = [
    {
      name: "Extra Hour",
      description: "Additional hour of service",
      price: 500,
      isActive: true,
    },
    {
      name: "Rush Delivery (24h)",
      description: "Expedited processing and delivery",
      price: 1000,
      isActive: true,
    },
    {
      name: "10 Printed Photos",
      description: "High-quality printed photos (6x8 inch)",
      price: 300,
      isActive: true,
    },
    {
      name: "Digital Download Package",
      description: "All photos in high resolution",
      price: 800,
      isActive: true,
    },
  ];

  for (const addOn of addOns) {
    await prisma.addOn.upsert({
      where: { name: addOn.name },
      update: {},
      create: addOn,
    });
  }

  console.log("✅ Add-ons created");

  // Create sample portfolio images
  const portfolioImages = [
    {
      title: "Corporate Event Coverage",
      description: "Professional event photography for corporate conference",
      imageUrl: "/placeholder-event-1.jpg",
      category: "events",
      isFeatured: true,
      sortOrder: 1,
    },
    {
      title: "Studio Portrait Session",
      description: "Professional headshots and portraits",
      imageUrl: "/placeholder-photo-1.jpg",
      category: "photography",
      isFeatured: true,
      sortOrder: 2,
    },
    {
      title: "Brand Identity Design",
      description: "Complete brand package with logo and stationery",
      imageUrl: "/placeholder-design-1.jpg",
      category: "design",
      isFeatured: true,
      sortOrder: 3,
    },
    {
      title: "Wedding Photography",
      description: "Beautiful moments captured on your special day",
      imageUrl: "/placeholder-event-2.jpg",
      category: "events",
      isFeatured: false,
      sortOrder: 4,
    },
  ];

  for (const image of portfolioImages) {
    await prisma.portfolioImage.create({
      data: image,
    });
  }

  console.log("✅ Portfolio images created");

  console.log("🎉 Seeding complete!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
