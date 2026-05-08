export default function CTASection() {
    return (
        <section className="relative z-10 max-w-7xl mx-auto px-6 py-20">
            <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-r from-cyan-600 to-blue-700 p-14 lg:p-20 shadow-2xl shadow-cyan-500/20">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>

                <div className="relative z-10 max-w-3xl">
                    <p className="uppercase tracking-[6px] text-cyan-100 text-sm font-semibold">
                        Healthcare Innovation
                    </p>

                    <h2 className="text-5xl lg:text-6xl font-black mt-6 leading-tight">
                        Your Health,
                        <span className="block">Our Priority</span>
                    </h2>

                    <p className="mt-8 text-cyan-100 text-lg leading-relaxed">
                        Experience the future of healthcare management with AI-powered appointment systems, secure patient records, and world-class medical professionals.
                    </p>

                    <div className="flex flex-wrap gap-5 mt-10">
                        <button className="px-8 py-4 rounded-2xl bg-white text-slate-900 font-bold text-lg hover:scale-105 transition-all duration-300">
                            Start Today
                        </button>

                        <button className="px-8 py-4 rounded-2xl border border-white/30 bg-white/10 backdrop-blur-xl font-semibold text-lg hover:bg-white/20 transition-all duration-300">
                            Contact Us
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}