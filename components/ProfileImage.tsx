export default function ProfileImage({ src, name }: any) {
  return (
    <div className="w-12 h-12 rounded-full overflow-hidden border shadow-sm">
      {src ? (
        <img
          src={src}
          alt={name}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full bg-blue-500 text-white flex items-center justify-center font-bold">
          {name?.charAt(0)}
        </div>
      )}
    </div>
  );
}