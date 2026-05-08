// "use client";

// import { useEffect, useState } from "react";
// import axios from "@/lib/axios";
// import { useRouter } from "next/navigation";
// import Sidebar from "@/components/Sidebar";
// import Navbar from "@/components/Navbar";
// import Loader from "@/components/Loader";

// export default function PatientLayout({ children }: any) {
//   const [user, setUser] = useState<any>(null);
//   const router = useRouter();

//   // useEffect(() => {
//   //   const checkUser = async () => {
//   //     try {
//   //       const res = await axios.get("/api/auth/me");

//   //       if (res.data.user.role !== "patient") {
//   //         router.push("/dashboard"); // ❌ block doctor
//   //       } else {
//   //         setUser(res.data.user);
//   //       }
//   //     } catch {
//   //       router.push("/login");
//   //     }
//   //   };

//   //   checkUser();
//   // }, []);

//   // if (!user) return <p className="p-6">Loading...</p>;
//   if (!user) return <Loader />;

//   return (
//     <div className="flex">
//       <Sidebar role="patient" />
//       <div className="flex-1">
//         {/* <Navbar user={user} /> */}
//         <Navbar />
//         <main className="p-6 min-h-screen">{children}</main>
//       </div>
//     </div>
//   );
// }

// import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/HomeFooter";
import NavbarSection from "@/components/Home/NavbarSection";

export default function PatientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#f5f9ff] min-h-screen">

      {/* <Navbar /> */}
      <NavbarSection />

      <main>
        {children}
      </main>

      <Footer />
    </div>
  );
}