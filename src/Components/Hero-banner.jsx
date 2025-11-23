import Image from "next/image";
import img1 from "../../public/only-logo.png";

export default function HeroBanner() {
  return (
    <div className="hero bg-gray-500 w-7xl rounded-3xl mx-auto p-10 mb-10">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <Image
          src={img1}
          className="max-w-sm w-48"
          alt="QuantumGear Logo"
        />
        <div>
          <h1 className="text-5xl font-bold">QuantumGear</h1>
          <h3>Tech Gadgets Shop</h3>
          <p className="py-6">
            At QuantumGear, we believe that technology should empower, simplify,
            and elevate your daily experiences. Founded with a vision to bring
            the future closer to today, QuantumGear curates the most advanced
            tech products designed for performance, convenience, and style. From
            cutting-edge wearables and powerful laptops to immersive AR/VR
            devices and smart home essentials, our goal is to provide gadgets
            that seamlessly integrate into your lifestyle.
          </p>
          <button className="btn btn-primary">Get Started</button>
        </div>
      </div>
    </div>
  );
}
