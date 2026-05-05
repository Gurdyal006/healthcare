"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

type Props = {
  role: "admin" | "doctor" | "patient";
};

export default function Sidebar({ role }: Props) {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);


  // ✅ ROLE-BASED MENU
  const adminMenu = [
    { name: "Dashboard", path: "/admin-dashboard" },
    { name: "Profile", path: "/admin-profile" },
    { name: "Doctors", path: "/doctors/create" },
  ];

  const doctorMenu = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Appointments", path: "/doctor-profile" },
    //{ name: "Appointments", path: "/doctor-appointments" },
  ];

  const patientMenu = [
    { name: "My Appointments", path: "/profile" },
    //{ name: "Appointments", path: "/appointments" },
    //{ name: "Create Appointment", path: "/create-appointment" },
  ];

  const menu = role === "admin" ? adminMenu : role === "doctor" ? doctorMenu : patientMenu;

  // ✅ AUTO-OPEN ACTIVE MENU
  useEffect(() => {
    const active = menu.find((item) =>
      pathname.startsWith(item.path)
    );
    if (active) setOpenMenu(active.name);
  }, [pathname]);

  return (
    <div className="w-64  bg-gray-900 text-white p-5">
      <h2 className="text-xl font-bold mb-6">HealthCare</h2>

      <ul className="space-y-2">
        {menu.map((item) => {
          const isActive = pathname.startsWith(item.path);

          return (
            <li key={item.name}>
              <Link
                href={item.path}
                className={`block p-2 rounded transition ${
                  isActive
                    ? "bg-blue-600"
                    : "hover:bg-gray-800"
                }`}
              >
                {item.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}