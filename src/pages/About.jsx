import { Heart, Zap, Shield } from 'lucide-react'
import TeamMemberCard from '@/components/TeamMemberCard'
import ScrollFadeIn from '@/components/ScrollFadeIn'
import { team } from '@/data/team'

const stats = [
  { value: '100+', label: 'Installs Completed' },
  { value: '5★', label: 'Average Rating' },
  { value: 'Licensed', label: '& Insured' },
]

const values = [
  {
    icon: Heart,
    title: 'Customer First',
    description:
      "We treat every home and business like it's our own. Your satisfaction is our top priority on every job.",
  },
  {
    icon: Zap,
    title: 'Quality Work',
    description:
      'We use quality materials, follow best practices, and never cut corners — because your install needs to last.',
  },
  {
    icon: Shield,
    title: 'Honest Pricing',
    description:
      'No hidden fees, no surprises. We give you a clear, fair quote upfront so you know exactly what to expect.',
  },
]

export default function About() {
  return (
    <>
      {/* Mission Section */}
      <section className="bg-white dark:bg-navy pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden transition-colors duration-300">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(45,142,245,0.07) 0%, transparent 70%)',
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <div>
              <p className="text-brand text-sm font-semibold tracking-widest uppercase mb-3">
                Our Story
              </p>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
                Connecting Charlotte, NC, One Install at a Time
              </h1>
              <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed mb-4">
                Hornets IT Solutions LLC was founded with a simple mission: to bring
                professional-grade cable installation and TV mounting services to homes
                and businesses in Charlotte, NC and surrounding areas.
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed">
                We believe every home deserves a fast, reliable wired connection and every
                business deserves a network built to grow with them. We show up on time,
                do the job right, and take pride in every cable run and wall mount we
                complete.
              </p>
            </div>

            {/* Right: Stats */}
            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-gray-50 dark:bg-navy-light rounded-2xl p-6 border border-gray-200 dark:border-white/5 text-center"
                >
                  <div className="text-3xl font-extrabold text-brand mb-1">{stat.value}</div>
                  <div className="text-gray-500 dark:text-gray-400 text-xs font-medium leading-tight">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="bg-gray-50 dark:bg-navy-light py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
        <div className="max-w-4xl mx-auto">
          <ScrollFadeIn>
            <div className="text-center mb-12">
              <p className="text-brand text-sm font-semibold tracking-widest uppercase mb-3">
                The Team
              </p>
              <h2 className="section-heading">Meet the People Behind the Work</h2>
              <p className="section-subheading">
                A small, dedicated team committed to delivering quality installs and
                outstanding customer service every time.
              </p>
            </div>
          </ScrollFadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {team.map((member, i) => (
              <ScrollFadeIn key={member.id} delay={i * 100}>
                <div className="bg-white dark:bg-navy rounded-2xl border border-gray-200 dark:border-white/5 hover:border-brand/30 transition-all duration-300">
                  <TeamMemberCard
                    name={member.name}
                    role={member.role}
                    initials={member.initials}
                  />
                </div>
              </ScrollFadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white dark:bg-navy py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
        <div className="max-w-5xl mx-auto">
          <ScrollFadeIn>
            <div className="text-center mb-12">
              <p className="text-brand text-sm font-semibold tracking-widest uppercase mb-3">
                Our Values
              </p>
              <h2 className="section-heading">What Drives Us</h2>
            </div>
          </ScrollFadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((value, i) => (
              <ScrollFadeIn key={value.title} delay={i * 100}>
                <div className="bg-gray-50 dark:bg-navy-light rounded-2xl p-7 border border-gray-200 dark:border-white/5 hover:border-brand/30 transition-all duration-300 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="bg-brand/10 rounded-xl p-3">
                      <value.icon size={24} className="text-brand" />
                    </div>
                  </div>
                  <h3 className="text-gray-900 dark:text-white font-bold text-lg mb-2">{value.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{value.description}</p>
                </div>
              </ScrollFadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
