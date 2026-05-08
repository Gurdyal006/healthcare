"use client"

import { useRouter } from "next/navigation";
import Footer from "@/components/shared/HomeFooter";
import NavbarSection from "@/components/Home/NavbarSection";
import HomeHeroSection from "@/components/Home/HeroSection";
import ServicesSection from "@/components/Home/ServicesSection";
import CTASection from "@/components/Home/CTASection";

export default function HomePage() {
const router = useRouter();  
const handleLoginClick = () => {
  // Implement your login logic here, e.g., redirect to login page
  router.push("/login");
}
  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#0f766e_0%,transparent_30%)] opacity-30"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,#2563eb_0%,transparent_30%)] opacity-20"></div>

      {/* Navbar */}
      <NavbarSection />

      {/* Hero Section */}
      <HomeHeroSection />

      {/* Services */}
     <ServicesSection />

      {/* CTA Section */}
      <CTASection />

      {/* Footer */}
     <Footer />
    </div>
  );
}

