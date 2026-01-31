import prisma from "@/lib/prisma";

export default async function PortfolioPage() {
  const images = await prisma.portfolioImage.findMany({
    orderBy: [{ isFeatured: "desc" }, { sortOrder: "asc" }],
  });

  const categories = ["all", "photography", "design", "print", "events"];

  return (
    <main className="min-h-screen bg-proimages-dark">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-proimages-gray to-proimages-dark">
        <div className="section-container text-center">
          <h1 className="text-5xl font-bold mb-6">
            Our <span className="text-proimages-orange">Portfolio</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Explore our latest work and creative projects
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="section-container">
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          {categories.map((category) => (
            <button
              key={category}
              className="px-6 py-2 rounded-lg border-2 border-proimages-gray hover:border-proimages-orange transition-colors capitalize"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        {images.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((image) => (
              <div
                key={image.id}
                className="group relative aspect-square bg-proimages-gray rounded-lg overflow-hidden cursor-pointer"
              >
                {/* Placeholder for image */}
                <div className="w-full h-full flex items-center justify-center text-4xl">
                  {getCategoryIcon(image.category)}
                </div>
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-proimages-dark/90 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-6">
                  <div className="text-center">
                    <h3 className="text-xl font-bold mb-2">{image.title}</h3>
                    {image.description && (
                      <p className="text-gray-300 text-sm">{image.description}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">
              Our portfolio is being updated. Check back soon!
            </p>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="bg-proimages-orange py-16 mt-16">
        <div className="text-center px-4">
          <h2 className="text-4xl font-bold mb-6">Ready to work with us?</h2>
          <p className="text-xl mb-8">Let's create something amazing together</p>
          <a href="/book" className="btn-primary inline-block">
            Book Now
          </a>
        </div>
      </section>
    </main>
  );
}

function getCategoryIcon(category: string): string {
  const icons: Record<string, string> = {
    photography: "📸",
    design: "🎨",
    print: "🖨️",
    events: "🎉",
  };
  return icons[category] || "🖼️";
}
