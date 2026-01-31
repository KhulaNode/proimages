import Link from "next/link";

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-proimages-dark">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-proimages-gray to-proimages-dark">
        <div className="section-container text-center">
          <h1 className="text-5xl font-bold mb-6">
            Our <span className="text-proimages-orange">Services</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Professional creative services tailored to your needs
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-container">
        <div className="space-y-16">
          {services.map((service, index) => (
            <div
              key={service.slug}
              className={`flex flex-col ${
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              } gap-8 items-center`}
            >
              <div className="lg:w-1/2">
                <div className="bg-proimages-gray h-96 rounded-lg flex items-center justify-center text-6xl">
                  {service.icon}
                </div>
              </div>
              <div className="lg:w-1/2">
                <h2 className="text-4xl font-bold mb-4">{service.name}</h2>
                <p className="text-gray-300 text-lg mb-6">{service.description}</p>
                <ul className="space-y-2 mb-8">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-proimages-orange mr-2">✓</span>
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/book?service=${service.slug}`}
                  className="btn-primary inline-block"
                >
                  Book {service.name}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-proimages-orange py-16 mt-16">
        <div className="text-center px-4">
          <h2 className="text-4xl font-bold mb-6">Not sure which service you need?</h2>
          <p className="text-xl mb-8">Get in touch and we'll help you choose</p>
          <Link
            href="/contact"
            className="bg-white text-proimages-orange hover:bg-gray-100 font-bold py-3 px-8 rounded-lg transition-colors duration-200 inline-block"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </main>
  );
}

const services = [
  {
    name: "Photography",
    slug: "photography",
    description: "Capture your moments with professional photography services for all occasions.",
    icon: "📸",
    features: [
      "Studio portrait sessions",
      "Product photography for businesses",
      "Headshots and professional profiles",
      "Family and individual portraits",
      "High-quality editing and retouching",
    ],
  },
  {
    name: "Graphic Design",
    slug: "design",
    description: "Stand out with custom graphic design that tells your brand's story.",
    icon: "🎨",
    features: [
      "Logo design and branding",
      "Business card and stationery design",
      "Social media graphics",
      "Flyers and promotional materials",
      "Custom illustrations",
    ],
  },
  {
    name: "Printing Services",
    slug: "print",
    description: "Bring your designs to life with our high-quality printing services.",
    icon: "🖨️",
    features: [
      "Business cards and stationery",
      "Posters and banners",
      "Promotional materials",
      "Canvas prints",
      "Custom merchandise",
    ],
  },
  {
    name: "Event Coverage",
    slug: "events",
    description: "Document your special moments with professional event photography and videography.",
    icon: "🎉",
    features: [
      "Weddings and engagements",
      "Corporate events and conferences",
      "Birthday parties and celebrations",
      "Live event photography",
      "Video highlights packages",
    ],
  },
];
