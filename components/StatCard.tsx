"use client";

import { Calendar, Activity, Users, UserCheck } from "lucide-react";
import CountUp from "react-countup";

type Props = {
  title: string;
  value: number;
};

const iconMap: any = {
  Appointments: <Calendar size={20} />,
  Today: <Activity size={20} />,
  Pending: <UserCheck size={20} />,
  Doctors: <Users size={20} />,
  Patients: <Users size={20} />,
};

const colorMap: any = {
  Appointments: "from-blue-500 to-indigo-600",
  Today: "from-green-500 to-emerald-600",
  Pending: "from-yellow-400 to-orange-500",
  Doctors: "from-purple-500 to-pink-500",
  Patients: "from-cyan-500 to-blue-500",
};

export default function StatCard({ title, value }: Props) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl p-5 text-white shadow-lg bg-gradient-to-r ${
        colorMap[title] || "from-gray-500 to-gray-700"
      } hover:scale-105 transition duration-200`}
    >
      {/* Glow */}
      <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>

      {/* Top */}
      <div className="flex justify-between items-center">
        <p className="text-sm opacity-90">{title}</p>

        <div className="bg-white/20 p-2 rounded-lg">
          {iconMap[title]}
        </div>
      </div>

      {/* Value */}
      <h2 className="text-3xl font-bold mt-3">
      <CountUp end={value} duration={1.5} />
      </h2>       
    </div>
  );
}


