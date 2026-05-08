export default function ServicesSection() {
  return (
     <section className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <p className="text-cyan-400 uppercase tracking-[6px] text-sm font-semibold">
            Our Services
          </p>
          <h2 className="text-5xl font-black mt-4">
            Healthcare Solutions
          </h2>
          <p className="text-slate-400 mt-5 max-w-2xl mx-auto text-lg">
            Comprehensive medical services designed to provide patients with exceptional care and digital convenience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              title: 'Online Consultation',
              desc: 'Connect with doctors remotely using secure video consultation.',
              icon: '🩺',
            },
            {
              title: 'Appointment Booking',
              desc: 'Easy and fast scheduling system for patient appointments.',
              icon: '📅',
            },
            {
              title: 'Medical Records',
              desc: 'Secure cloud-based patient records and health history.',
              icon: '📋',
            },
            {
              title: 'Emergency Support',
              desc: '24/7 emergency assistance and instant medical support.',
              icon: '🚑',
            },
          ].map((service, index) => (
            <div
              key={index}
              className="group bg-white/5 border border-white/10 backdrop-blur-xl rounded-[30px] p-8 hover:-translate-y-3 transition-all duration-500 hover:border-cyan-400/30"
            >
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center text-4xl border border-white/10 group-hover:scale-110 transition-all duration-500">
                {service.icon}
              </div>

              <h3 className="text-2xl font-bold mt-8">{service.title}</h3>
              <p className="text-slate-400 mt-4 leading-relaxed">
                {service.desc}
              </p>

              <button className="mt-8 text-cyan-400 font-semibold hover:translate-x-2 transition-all duration-300">
                Learn More →
              </button>
            </div>
          ))}
        </div>
      </section>
  );
}