import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-proimages-dark">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-proimages-gray to-proimages-dark">
        <div className="section-container text-center">
          <h1 className="text-5xl font-bold mb-6">
            Get in <span className="text-proimages-orange">Touch</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Have questions? We're here to help
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="section-container">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-3xl font-bold mb-8">
              ProImages Creative House
            </h2>
            
            <div className="space-y-6 mb-12">
              {/* Email */}
              <div className="flex items-start">
                <div className="bg-proimages-orange p-3 rounded-lg mr-4">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold mb-1">Email</h3>
                  <a
                    href="mailto:molavovic@gmail.com"
                    className="text-proimages-orange hover:underline"
                  >
                    molavovic@gmail.com
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start">
                <div className="bg-proimages-orange p-3 rounded-lg mr-4">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold mb-1">Phone</h3>
                  <a
                    href="tel:+27XXXXXXXXX"
                    className="text-proimages-orange hover:underline"
                  >
                    +27 XX XXX XXXX
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start">
                <div className="bg-proimages-orange p-3 rounded-lg mr-4">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold mb-1">Location</h3>
                  <p className="text-gray-300">South Africa</p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="text-2xl font-bold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a
                  href="https://www.tiktok.com/@proimages"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-proimages-gray hover:bg-proimages-orange p-3 rounded-lg transition-colors"
                >
                  TikTok
                </a>
                <a
                  href="https://www.instagram.com/proimages"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-proimages-gray hover:bg-proimages-orange p-3 rounded-lg transition-colors"
                >
                  Instagram
                </a>
                <a
                  href="https://www.facebook.com/Luckyshooot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-proimages-gray hover:bg-proimages-orange p-3 rounded-lg transition-colors"
                >
                  Facebook
                </a>
              </div>
            </div>

            {/* Facebook Page Embed */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold mb-4">Our Facebook</h3>
              <div className="bg-proimages-gray rounded-lg p-4 overflow-hidden">
                <iframe
                  src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FLuckyshooot&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
                  width="100%"
                  height="500"
                  style={{ border: "none", overflow: "hidden" }}
                  scrolling="no"
                  frameBorder="0"
                  allowFullScreen={true}
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Quick Booking CTA */}
          <div>
            <div className="bg-proimages-gray rounded-lg p-8">
              <h2 className="text-3xl font-bold mb-6">Ready to Book?</h2>
              <p className="text-gray-300 mb-8">
                Skip the back-and-forth. Book your session online in less than 2
                minutes.
              </p>
              <Link href="/book" className="btn-primary inline-block mb-8">
                Book Online Now
              </Link>

              <div className="border-t border-gray-700 pt-8">
                <h3 className="text-xl font-bold mb-4">Business Hours</h3>
                <div className="space-y-2 text-gray-300">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span>9:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span>10:00 AM - 2:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span>Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
