import { Link } from 'react-router-dom'
import { CheckCircle, ArrowRight, CalendarCheck } from 'lucide-react'
import ScrollFadeIn from '@/components/ScrollFadeIn'
import { services } from '@/data/services'

export default function Services() {
  return (
    <>
      {/* Page Hero */}
      <section className="bg-white dark:bg-navy pt-32 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden transition-colors duration-300">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(45,142,245,0.08) 0%, transparent 70%)',
          }}
        />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <p className="text-brand text-sm font-semibold tracking-widest uppercase mb-3">
            What We Offer
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mb-5">
            Our Services
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed">
            Professional, reliable, and clean installs for homes and businesses in
            Charlotte, NC and surrounding areas. Every job is done right — the first time.
          </p>
        </div>
      </section>

      {/* Service Cards */}
      <section className="bg-gray-50 dark:bg-navy-light py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
        <div className="max-w-5xl mx-auto space-y-8">
          {services.map((service, i) => (
            <ScrollFadeIn key={service.id} delay={i * 100}>
              <div className="bg-white dark:bg-navy rounded-2xl border border-gray-200 dark:border-white/5 hover:border-brand/40 hover:shadow-glow-sm transition-all duration-300 overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  {/* Icon column */}
                  <div className="md:w-48 bg-brand/5 flex items-center justify-center p-10 shrink-0">
                    <div className="bg-brand/15 rounded-2xl p-5">
                      <service.icon size={40} className="text-brand" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-8">
                    <div className="flex items-center gap-3 mb-3">
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white">{service.title}</h2>
                      {service.badge && (
                        <span className="bg-brand/20 text-brand text-xs font-semibold rounded-full px-3 py-1">
                          {service.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-6">{service.description}</p>

                    {service.features && (
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {service.features.map((feature) => (
                          <li
                            key={feature}
                            className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300"
                          >
                            <CheckCircle size={15} className="text-brand shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </ScrollFadeIn>
          ))}
        </div>
      </section>

      {/* CTA Strip */}
      <section className="bg-white dark:bg-navy py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
        <div className="max-w-2xl mx-auto text-center">
          <ScrollFadeIn>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Need Something Custom?
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-8">
              Every job is different. If your needs don't fit neatly into the above,
              reach out and we'll figure out the right solution together.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/schedule" className="btn-primary inline-flex items-center gap-2">
                <CalendarCheck size={16} /> Schedule a Walkthrough
              </Link>
              <Link to="/contact" className="btn-outline inline-flex items-center gap-2">
                Get a Quote <ArrowRight size={16} />
              </Link>
            </div>
          </ScrollFadeIn>
        </div>
      </section>
    </>
  )
}
