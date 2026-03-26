import { Link } from 'react-router-dom'
import { ShieldCheck, Clock, Star, MapPin, ArrowRight } from 'lucide-react'
import Hero from '@/components/Hero'
import ServiceCard from '@/components/ServiceCard'
import ScrollFadeIn from '@/components/ScrollFadeIn'
import { services } from '@/data/services'

const whyChooseUs = [
  {
    icon: ShieldCheck,
    title: 'Licensed & Insured',
    description: 'Fully licensed and insured so you can have peace of mind on every job.',
  },
  {
    icon: Clock,
    title: 'Fast Turnaround',
    description: 'We respect your time. Most installs are completed in a single visit.',
  },
  {
    icon: Star,
    title: '5-Star Service',
    description: 'Our work speaks for itself. We pride ourselves on quality and customer satisfaction.',
  },
  {
    icon: MapPin,
    title: 'Local & Trusted',
    description: 'We\'re based right here in North Carolina — a local team you can count on.',
  },
]

export default function Home() {
  return (
    <>
      <Hero />

      {/* Services Overview */}
      <section className="bg-navy-light py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <ScrollFadeIn>
            <div className="text-center mb-12">
              <p className="text-brand text-sm font-semibold tracking-widest uppercase mb-3">
                What We Do
              </p>
              <h2 className="section-heading">Our Services</h2>
              <p className="section-subheading">
                From home offices to commercial buildings, we deliver clean, professional
                cable installations and TV mounting services.
              </p>
            </div>
          </ScrollFadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <ScrollFadeIn key={service.id} delay={i * 120}>
                <ServiceCard
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
                  badge={service.badge}
                  features={service.features}
                />
              </ScrollFadeIn>
            ))}
          </div>

          <ScrollFadeIn>
            <div className="text-center mt-10">
              <Link to="/services" className="btn-outline inline-flex items-center gap-2">
                View All Services <ArrowRight size={16} />
              </Link>
            </div>
          </ScrollFadeIn>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-navy py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <ScrollFadeIn>
            <div className="text-center mb-12">
              <p className="text-brand text-sm font-semibold tracking-widest uppercase mb-3">
                Why Hornets IT
              </p>
              <h2 className="section-heading">Built on Trust & Quality</h2>
              <p className="section-subheading">
                We show up on time, do the job right, and leave your space cleaner than we found it.
              </p>
            </div>
          </ScrollFadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((item, i) => (
              <ScrollFadeIn key={item.title} delay={i * 100}>
                <div className="bg-navy-light rounded-2xl p-6 border border-white/5 hover:border-brand/30 transition-all duration-300 h-full">
                  <div className="bg-brand/10 rounded-xl p-3 w-fit mb-4">
                    <item.icon size={22} className="text-brand" />
                  </div>
                  <h3 className="text-white font-semibold text-base mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
                </div>
              </ScrollFadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Service Area Callout */}
      <section className="bg-navy-light py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollFadeIn>
            <div className="flex justify-center mb-4">
              <div className="bg-brand/10 rounded-full p-4">
                <MapPin size={28} className="text-brand" />
              </div>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Proudly Serving North Carolina
            </h2>
            <p className="text-gray-400 text-base leading-relaxed">
              We serve residential and commercial clients across North Carolina and surrounding areas.
              Not sure if we cover your location?{' '}
              <Link to="/contact" className="text-brand hover:underline">
                Reach out — we'd love to help.
              </Link>
            </p>
          </ScrollFadeIn>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-brand py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Ready to Get Connected?
          </h2>
          <p className="text-white/80 text-lg mb-8">
            Request a free quote today. No obligation, no pressure — just honest service.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-white text-brand font-bold px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors duration-200 text-base shadow-glow-brand"
          >
            Request a Free Quote <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  )
}
