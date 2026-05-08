export default function Footer() {
  return (
       <footer className="relative z-10 border-t border-white/10 mt-20 bg-gradient-to-r from-darkgray to-darker text-white">
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold">MediCare+</h3>
            <p className="text-white/70 mt-2">
              © 2026 All Rights Reserved.
            </p>
          </div>

          <div className="flex items-center gap-6 text-white">
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <a href="#" className="hover:text-white transition">Terms</a>
            <a href="#" className="hover:text-white transition">Support</a>
          </div>
        </div>     
    </footer>
  );
}