import { Link } from 'react-router-dom'
import { ArrowRight, ChevronDown, CalendarCheck } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-white dark:bg-navy overflow-hidden transition-colors duration-300">
      {/* Background radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(45,142,245,0.10) 0%, transparent 70%)',
        }}
      />

      {/* Subtle dot grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10 dark:opacity-20"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(45,142,245,0.3) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 bg-brand/10 border border-brand/20 rounded-full px-4 py-1.5 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
          <span className="text-brand text-xs font-semibold tracking-widest uppercase">
            Professional IT Services — Charlotte, NC
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-tight mb-6 text-gray-900 dark:text-white">
          <span className="text-brand">Connected</span> Homes.
          <br />
          <span className="text-brand">Connected</span> Businesses.
        </h1>

        {/* Subheading */}
        <p className="text-gray-500 dark:text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Hornets IT Solutions provides expert internet cable installation and TV
          mounting for homes and businesses in Charlotte, NC and surrounding areas.
          Fast, clean, and done right the first time.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/contact" className="btn-primary flex items-center gap-2 text-base px-8 py-4">
            Get a Free Quote
            <ArrowRight size={18} />
          </Link>
          <Link to="/schedule" className="btn-outline text-base px-8 py-4 inline-flex items-center gap-2">
            <CalendarCheck size={18} />
            Schedule a Walkthrough
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className="mt-20 flex justify-center animate-bounce">
          <ChevronDown size={24} className="text-gray-400 dark:text-gray-600" />
        </div>
      </div>
    </section>
  )
}
