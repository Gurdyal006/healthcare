// import Navbar from "@/components/shared/Navbar";
import NavbarSection from "@/components/Home/NavbarSection";
import Footer from "@/components/shared/HomeFooter";

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#f5f9ff] min-h-screen">
      {/* <Navbar /> */}
      <NavbarSection />

      <main>{children}</main>

      <Footer />
    </div>
  );
}