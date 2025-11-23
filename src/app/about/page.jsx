import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-linear-to-r from-primary to-secondary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">About QuantumGear</h1>
          <p className="text-lg max-w-2xl mx-auto">
            Your premier destination for cutting-edge technology and premium
            gadgets
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
              <p className="text-gray-600 text-lg mb-4">
                At QuantumGear, we are committed to bringing the latest and
                greatest technology products to our customers. Our mission is to
                make premium tech gadgets accessible, affordable, and convenient
                for everyone.
              </p>
              <p className="text-gray-600 text-lg mb-6">
                We carefully curate our product selection to ensure quality,
                innovation, and value, delivering an exceptional shopping
                experience.
              </p>
              <Link href="/products" className="btn btn-primary">
                Explore Products
              </Link>
            </div>
            <div className="text-8xl text-center">🎯</div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "💎",
                title: "Quality",
                desc: "We only stock authentic, high-quality products",
              },
              {
                icon: "🤝",
                title: "Trust",
                desc: "Customer satisfaction is our top priority",
              },
              {
                icon: "⚡",
                title: "Innovation",
                desc: "We stay ahead with the latest tech trends",
              },
              {
                icon: "💚",
                title: "Sustainability",
                desc: "Committed to eco-friendly practices",
              },
            ].map((value, idx) => (
              <div
                key={idx}
                className="card bg-base-100 shadow hover:shadow-lg transition"
              >
                <div className="card-body text-center">
                  <div className="text-5xl mb-4">{value.icon}</div>
                  <h3 className="card-title justify-center">{value.title}</h3>
                  <p className="text-gray-600">{value.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Alice Johnson",
                role: "Founder & CEO",
                emoji: "👩‍💼",
              },
              {
                name: "Bob Smith",
                role: "Product Manager",
                emoji: "👨‍💼",
              },
              {
                name: "Carol Williams",
                role: "Customer Success Lead",
                emoji: "👩‍💼",
              },
            ].map((member, idx) => (
              <div
                key={idx}
                className="card bg-white shadow hover:shadow-lg transition text-center"
              >
                <div className="card-body">
                  <div className="text-6xl mb-4">{member.emoji}</div>
                  <h3 className="card-title justify-center">{member.name}</h3>
                  <p className="text-gray-600">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="text-4xl font-bold text-center mb-12">Get in Touch</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="card bg-base-100 shadow">
              <div className="card-body">
                <div className="text-4xl mb-4">📧</div>
                <h3 className="font-bold">Email</h3>
                <p className="text-gray-600">chowdhuryyeamin07@gmail.com</p>
              </div>
            </div>
            <div className="card bg-base-100 shadow">
              <div className="card-body">
                <div className="text-4xl mb-4">📞</div>
                <h3 className="font-bold">Phone</h3>
                <p className="text-gray-600">+1 (555) 123-4567</p>
              </div>
            </div>
            <div className="card bg-base-100 shadow">
              <div className="card-body">
                <div className="text-4xl mb-4">📍</div>
                <h3 className="font-bold">Address</h3>
                <p className="text-gray-600">
                  123 Tech Street, Silicon Valley, CA
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-linear-to-r from-primary to-secondary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Upgrade Your Tech?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Browse our latest products and find the perfect gadget for you
          </p>
          <Link href="/products" className="btn btn-lg btn-accent">
            Shop Now
          </Link>
        </div>
      </section>
    </div>
  );
}
