export default function BasicStat({ title, value }: any) {
  return (
    <div>
      <p className="text-xl font-bold">{value}</p>
      <p className="text-xs text-blue-100">{title}</p>
    </div>
  );
}