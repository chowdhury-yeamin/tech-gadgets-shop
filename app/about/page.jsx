import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            About QuantumGear
          </h1>
          <p className="text-xl max-w-3xl mx-auto text-gray-100">
            Your premier destination for cutting-edge technology and premium
            gadgets
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                Our Mission
              </h2>
              <p className="text-gray-700 text-lg mb-4 leading-relaxed">
                At QuantumGear, we are committed to bringing the latest and
                greatest technology products to our customers. Our mission is to
                make premium tech gadgets accessible, affordable, and convenient
                for everyone.
              </p>
              <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                We carefully curate our product selection to ensure quality,
                innovation, and value, delivering an exceptional shopping
                experience.
              </p>
              <Link
                href="/products"
                className="btn btn-primary btn-lg text-white shadow-lg hover:shadow-xl transition-all gap-2"
              >
                Explore Products
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
            </div>
            <div className="text-9xl text-center animate-pulse">🎯</div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900">
            Our Values
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            The principles that guide everything we do
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {[
              {
                icon: "💎",
                title: "Quality",
                desc: "We only stock authentic, high-quality products",
                color: "from-blue-500 to-blue-600",
              },
              {
                icon: "🤝",
                title: "Trust",
                desc: "Customer satisfaction is our top priority",
                color: "from-green-500 to-green-600",
              },
              {
                icon: "⚡",
                title: "Innovation",
                desc: "We stay ahead with the latest tech trends",
                color: "from-yellow-500 to-yellow-600",
              },
              {
                icon: "💚",
                title: "Sustainability",
                desc: "Committed to eco-friendly practices",
                color: "from-emerald-500 to-emerald-600",
              },
            ].map((value, idx) => (
              <div
                key={idx}
                className="card bg-white shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-primary group"
              >
                <div className="card-body text-center">
                  <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">
                    {value.icon}
                  </div>
                  <h3 className="card-title justify-center text-gray-900 text-xl mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{value.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900">
            Meet Our Team
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            The passionate people behind QuantumGear
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Alice Johnson",
                role: "Founder & CEO",
                emoji: "🧑‍💼",
                bg: "from-purple-100 to-purple-50",
              },
              {
                name: "Bob Smith",
                role: "Product Manager",
                emoji: "🧑‍💼",
                bg: "from-blue-100 to-blue-50",
              },
              {
                name: "Carol Williams",
                role: "Customer Success Lead",
                emoji: "👩‍💼",
                bg: "from-pink-100 to-pink-50",
              },
            ].map((member, idx) => (
              <div
                key={idx}
                className="card bg-white shadow-lg hover:shadow-2xl transition-all duration-300 text-center border border-gray-200 hover:border-primary group"
              >
                <div className="card-body">
                  <div
                    className={`text-8xl mb-4 p-6 rounded-full bg-gradient-to-br ${member.bg} mx-auto w-fit group-hover:scale-110 transition-transform`}
                  >
                    {member.emoji}
                  </div>
                  <h3 className="card-title justify-center text-gray-900 text-xl">
                    {member.name}
                  </h3>
                  <p className="text-primary font-semibold">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900">
            Get in Touch
          </h2>
          <p className="text-center text-gray-600 mb-12">
            We would love to hear from you
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card bg-gradient-to-br from-primary/5 to-secondary/5 shadow-lg hover:shadow-xl transition-all border border-gray-200">
              <div className="card-body text-center">
                <div className="text-5xl mb-4">📧</div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">Email</h3>
                <a
                  href="mailto:chowdhuryyeamin07@gmail.com"
                  className="text-primary hover:text-secondary transition-colors break-all"
                >
                  chowdhuryyeamin07@gmail.com
                </a>
              </div>
            </div>
            <div className="card bg-gradient-to-br from-primary/5 to-secondary/5 shadow-lg hover:shadow-xl transition-all border border-gray-200">
              <div className="card-body text-center">
                <div className="text-5xl mb-4">📞</div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">Phone</h3>
                <a
                  href="tel:+8801701101422"
                  className="text-primary hover:text-secondary transition-colors"
                >
                  +8801701101422
                </a>
              </div>
            </div>
            <div className="card bg-gradient-to-br from-primary/5 to-secondary/5 shadow-lg hover:shadow-xl transition-all border border-gray-200">
              <div className="card-body text-center">
                <div className="text-5xl mb-4">📍</div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">
                  Address
                </h3>
                <p className="text-gray-700">
                  Boteswar,Sylhet
                  <br />
                  Bangladesh
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Upgrade Your Tech?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-100">
            Browse our latest products and find the perfect gadget for you
          </p>
          <Link
            href="/products"
            className="btn btn-lg btn-accent text-white shadow-xl hover:shadow-2xl transition-all gap-2"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            Shop Now
          </Link>
        </div>
      </section>
    </div>
  );
}
