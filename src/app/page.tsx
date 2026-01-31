import Link from "next/link";

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-b from-proimages-dark via-proimages-gray to-proimages-dark">
        <div className="text-center px-4 z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            ProImages <span className="text-proimages-orange">Creative House</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Professional Photography • Graphic Design • Printing • Events
          </p>
          <Link href="/book" className="btn-primary inline-block text-lg">
            Book a Shoot
          </Link>
        </div>
      </section>

      {/* Services Overview */}
      <section className="section-container">
        <h2 className="text-4xl font-bold text-center mb-12">Our Services</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group bg-proimages-gray rounded-lg p-6 hover:bg-proimages-orange transition-colors duration-200"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-2xl font-bold mb-2">{service.name}</h3>
              <p className="text-gray-300 group-hover:text-white">{service.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-proimages-orange py-16">
        <div className="text-center px-4">
          <h2 className="text-4xl font-bold mb-6">Ready to Create Something Amazing?</h2>
          <p className="text-xl mb-8">Book your session in less than 2 minutes</p>
          <Link href="/book" className="bg-white text-proimages-orange hover:bg-gray-100 font-bold py-3 px-8 rounded-lg transition-colors duration-200 inline-block">
            Start Booking
          </Link>
        </div>
      </section>

      {/* Facebook Feed Section */}
      <section className="section-container">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Follow Our Journey</h2>
          <p className="text-gray-300 text-lg">
            See our latest work and behind-the-scenes on Facebook
          </p>
        </div>
        <div className="max-w-4xl mx-auto">
          <div className="bg-proimages-gray rounded-lg p-4 overflow-hidden">
            <iframe
              src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FLuckyshooot&tabs=timeline&width=500&height=600&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
              width="100%"
              height="600"
              style={{ border: "none", overflow: "hidden" }}
              scrolling="no"
              frameBorder="0"
              allowFullScreen={true}
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            ></iframe>
          </div>
        </div>
      </section>
    </main>
  );
}

const services = [
  {
    name: "Photography",
    slug: "photography",
    description: "Studio, portrait, and product photography",
    icon: "📸",
  },
  {
    name: "Graphic Design",
    slug: "design",
    description: "Branding, logos, and visual identity",
    icon: "🎨",
  },
  {
    name: "Printing",
    slug: "print",
    description: "Business cards, posters, and more",
    icon: "🖨️",
  },
  {
    name: "Event Coverage",
    slug: "events",
    description: "Weddings, corporate events, and parties",
    icon: "🎉",
  },
];
