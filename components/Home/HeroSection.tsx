import Image from "next/image";

export default function HomeHeroSection() {
    return ( 
        <section className="relative z-10 max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 text-sm mb-6">
            Trusted by 50,000+ Patients Worldwide
          </div>

          <h2 className="text-5xl lg:text-7xl font-black leading-tight">
            Modern
            <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 text-transparent bg-clip-text">
              Healthcare
            </span>
            Experience
          </h2>

          <p className="mt-8 text-lg text-slate-300 leading-relaxed max-w-xl">
            Manage appointments, connect with specialist doctors, access digital medical records, and experience next-generation healthcare services in one secure platform.
          </p>

          <div className="flex flex-wrap gap-4 mt-10">
            <button className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 font-semibold text-lg hover:scale-105 transition-all duration-300 shadow-2xl shadow-cyan-500/30">
              Book Appointment
            </button>

            <button className="px-8 py-4 rounded-2xl border border-white/20 backdrop-blur-xl bg-white/5 font-semibold text-lg hover:bg-white/10 transition-all duration-300">
              Explore Services
            </button>
          </div>

          <div className="grid grid-cols-3 gap-6 mt-14">
            <div>
              <h3 className="text-4xl font-black text-cyan-400">500+</h3>
              <p className="text-slate-400 mt-2">Expert Doctors</p>
            </div>
            <div>
              <h3 className="text-4xl font-black text-cyan-400">98%</h3>
              <p className="text-slate-400 mt-2">Patient Satisfaction</p>
            </div>
            <div>
              <h3 className="text-4xl font-black text-cyan-400">24/7</h3>
              <p className="text-slate-400 mt-2">Emergency Support</p>
            </div>
          </div>
        </div>

        {/* Hero Card */}
        <div className="relative">
          <div className="absolute -top-8 -left-8 w-40 h-40 bg-cyan-500/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl"></div>

          <div className="relative bg-white/10 border border-white/10 backdrop-blur-2xl rounded-[40px] p-8 shadow-2xl shadow-cyan-500/10">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-bold">Live Appointment</h3>
                <p className="text-slate-400 mt-1">Doctor Consultation</p>
              </div>
              <div className="w-4 h-4 rounded-full bg-green-400 animate-pulse"></div>
            </div>

            <div className="bg-slate-900/70 rounded-3xl p-6 border border-white/10">
              <div className="flex items-center gap-4">
                <Image
                  src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=400&auto=format&fit=crop"
                  alt="Doctor"
                  width={80}
                  height={80}
                  className="w-20 h-20 rounded-2xl object-cover"
                />

                <div>
                  <h4 className="text-xl font-bold">Dr. Sarah Johnson</h4>
                  <p className="text-cyan-400">Cardiologist Specialist</p>
                  <div className="flex items-center gap-2 mt-2 text-sm text-slate-400">
                    ⭐ 4.9 Rating
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                  <p className="text-slate-400 text-sm">Experience</p>
                  <h5 className="text-2xl font-bold mt-2">12 Years</h5>
                </div>

                <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                  <p className="text-slate-400 text-sm">Patients</p>
                  <h5 className="text-2xl font-bold mt-2">10k+</h5>
                </div>
              </div>

              <button className="w-full mt-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 font-semibold text-lg hover:opacity-90 transition">
                Start Consultation
              </button>
            </div>
          </div>
        </div>
      </section>
    )}