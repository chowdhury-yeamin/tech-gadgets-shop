import Image from "next/image";
import img1 from "../../public/only-logo.png";
import HeroBanner from "@/Components/Hero-banner";

export default function Home() {
  return (
    <div className="bg-gray-400 min-h-screen text-black ">
      <h1 className="text-4xl font-bold p-4 text-center">
        Welcome to QuantumGear
      </h1>
      <HeroBanner />
    </div>
  );
}
