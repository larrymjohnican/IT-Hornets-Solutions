import { useState } from 'react'
import { Mail, Clock, MapPin, CheckCircle, Loader2 } from 'lucide-react'
import ScrollFadeIn from '@/components/ScrollFadeIn'

// TODO: Replace with your Formspree form ID after signing up at formspree.io
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xreoykgp'

const serviceOptions = [
  'Tech Consultation',
  'Other',
]

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setSubmitted(true)
      } else {
        setError('Something went wrong. Please try again or email us directly.')
      }
    } catch {
      setError('Network error. Please check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Page Header */}
      <section className="bg-gray-50 dark:bg-navy-light pt-32 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden transition-colors duration-300">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(45,142,245,0.07) 0%, transparent 70%)',
          }}
        />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <p className="text-brand text-sm font-semibold tracking-widest uppercase mb-3">
            Let's Talk
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mb-5">
            Get a Free Quote
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed">
            Fill out the form below and we'll get back to you promptly to discuss your
            project and provide a no-obligation quote.
          </p>
        </div>
      </section>

      {/* Form + Info */}
      <section className="bg-white dark:bg-navy py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

            {/* Form (3/5) */}
            <div className="lg:col-span-3">
              <ScrollFadeIn>
                <div className="bg-gray-50 dark:bg-navy-light rounded-2xl p-8 border border-gray-200 dark:border-white/5">
                  {submitted ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <div className="bg-brand/15 rounded-full p-5 mb-5">
                        <CheckCircle size={40} className="text-brand" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                        Message Sent!
                      </h2>
                      <p className="text-gray-500 dark:text-gray-400 max-w-sm">
                        Thank you for reaching out. We'll review your request and get
                        back to you shortly.
                      </p>
                      <button
                        onClick={() => { setSubmitted(false); setForm({ name: '', phone: '', email: '', service: '', address: '', message: '' }) }}
                        className="mt-8 btn-outline text-sm"
                      >
                        Send Another Request
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                        Quote Request Form
                      </h2>
                      <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
                        All fields marked * are required.
                      </p>

                      {error && (
                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg px-4 py-3 text-red-600 dark:text-red-400 text-sm">
                          {error}
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-1.5">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            name="name"
                            required
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Jane Smith"
                            className="input-field"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-1.5">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            placeholder="(555) 123-4567"
                            className="input-field"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-1.5">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={form.email}
                          onChange={handleChange}
                          placeholder="jane@example.com"
                          className="input-field"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-1.5">
                          Service Type *
                        </label>
                        <select
                          name="service"
                          required
                          value={form.service}
                          onChange={handleChange}
                          className="input-field"
                        >
                          <option value="" disabled>Select a service...</option>
                          {serviceOptions.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-1.5">
                          Tell Us About Your Needs *
                        </label>
                        <textarea
                          name="message"
                          rows={4}
                          required
                          value={form.message}
                          onChange={handleChange}
                          placeholder="Describe what you're looking for — we'll get back to you within 1 business day."
                          className="input-field resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary w-full text-center text-base py-4 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {loading && <Loader2 size={18} className="animate-spin" />}
                        {loading ? 'Sending…' : 'Send Quote Request'}
                      </button>
                    </form>
                  )}
                </div>
              </ScrollFadeIn>
            </div>

            {/* Contact Info (2/5) */}
            <div className="lg:col-span-2">
              <ScrollFadeIn delay={150}>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-gray-900 dark:text-white font-bold text-lg mb-5">Contact Information</h3>
                    <ul className="space-y-5">
                      <li className="flex items-start gap-4">
                        <div className="bg-brand/10 rounded-lg p-2.5 shrink-0 mt-0.5">
                          <Mail size={18} className="text-brand" />
                        </div>
                        <div>
                          <p className="text-gray-900 dark:text-white font-medium text-sm mb-0.5">Email</p>
                          <p className="text-gray-500 dark:text-gray-400 text-sm">itsolutionshornet@gmail.com</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-4">
                        <div className="bg-brand/10 rounded-lg p-2.5 shrink-0 mt-0.5">
                          <MapPin size={18} className="text-brand" />
                        </div>
                        <div>
                          <p className="text-gray-900 dark:text-white font-medium text-sm mb-0.5">Service Area</p>
                          <p className="text-gray-500 dark:text-gray-400 text-sm">Charlotte, NC and surrounding areas</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-4">
                        <div className="bg-brand/10 rounded-lg p-2.5 shrink-0 mt-0.5">
                          <Clock size={18} className="text-brand" />
                        </div>
                        <div>
                          <p className="text-gray-900 dark:text-white font-medium text-sm mb-0.5">Hours</p>
                          <p className="text-gray-500 dark:text-gray-400 text-sm">Monday – Saturday</p>
                          <p className="text-gray-500 dark:text-gray-400 text-sm">8:00 AM – 6:00 PM</p>
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 dark:bg-navy-light rounded-2xl p-6 border border-gray-200 dark:border-white/5 mt-6">
                    <h4 className="text-gray-900 dark:text-white font-semibold text-sm mb-2">What to Expect</h4>
                    <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                      <li className="flex items-center gap-2">
                        <CheckCircle size={13} className="text-brand shrink-0" />
                        We'll respond within 1 business day
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle size={13} className="text-brand shrink-0" />
                        Free, no-obligation quote
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle size={13} className="text-brand shrink-0" />
                        Flexible scheduling to fit your needs
                      </li>
                    </ul>
                  </div>
                </div>
              </ScrollFadeIn>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}
