import CountUp from "react-countup";

export default function BasicStat({ title, value, color = "blue", icon }: any) {
  return (
    <div className={`px-5 py-3 rounded-xl shadow-sm bg-${color}-500/20`}>
      
      <p className="text-sm text-white flex items-center gap-1">
        {icon} {title}
      </p>

      <h3 className="text-2xl font-bold text-white">
        <CountUp end={value} duration={1.5} />
      </h3>

    </div>
  );
}

// export default function BasicStat({ title, value }: any) {
//   return (
//     <div>
//       <p className="text-xl font-bold">{value}</p>
//       <p className="text-xs text-blue-100">{title}</p>
//     </div>
//   );
// }