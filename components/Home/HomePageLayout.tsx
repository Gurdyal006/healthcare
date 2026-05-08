import HomeFooter from "../shared/HomeFooter";
import Footer from "../shared/HomeFooter";
import CTASection from "./CTASection";
import HomeHeroSection from "./HeroSection";
import NavbarSection from "./NavbarSection";
import ServicesSection from "./ServicesSection";

export default function HomePageLayout() {
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
        <HomeFooter />
       </div>
  );
}