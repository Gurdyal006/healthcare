export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-2xl font-bold">MediCare+</h3>
          <p className="text-slate-400 mt-2">
            © 2026 All Rights Reserved.
          </p>
        </div>

        <div className="flex items-center gap-6 text-slate-400">
          <a href="#" className="hover:text-cyan-400 transition">Privacy Policy</a>
          <a href="#" className="hover:text-cyan-400 transition">Terms</a>
          <a href="#" className="hover:text-cyan-400 transition">Support</a>
        </div>
      </div>
    </footer>
  );
}