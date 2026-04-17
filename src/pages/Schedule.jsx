import { useState, useMemo } from 'react'
import {
  CalendarCheck,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  CheckCircle,
  Phone,
  Loader2,
} from 'lucide-react'
import ScrollFadeIn from '@/components/ScrollFadeIn'
import AddressFields from '@/components/AddressFields'

const SERVICE_OPTIONS = [
  'Internet Cable Installation (Residential)',
  'Internet Cable Installation (Commercial)',
  'TV Mounting',
  'Device & Equipment Installs',
  'Other',
]

const TIME_SLOTS = [
  '8:00 AM',
  '9:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '1:00 PM',
  '2:00 PM',
  '3:00 PM',
  '4:00 PM',
  '5:00 PM',
]

const WEEKDAY_SLOTS = ['3:00 PM', '4:00 PM', '5:00 PM']

function getAvailableSlots(date) {
  if (!date) return TIME_SLOTS
  const day = date.getDay() // 0=Sun, 1=Mon … 6=Sat
  if (day >= 1 && day <= 5) return WEEKDAY_SLOTS // Mon–Fri: after 3 PM only
  if (day === 6) return TIME_SLOTS               // Saturday: all slots
  return []                                       // Sunday: blocked
}

const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

function formatDate(date) {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })
}

function isSameDay(a, b) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

function getToday() {
  const d = new Date()
  return new Date(d.getFullYear(), d.getMonth(), d.getDate())
}

export default function Schedule() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    street: '',
    apt: '',
    zip: '',
    city: '',
    state: '',
    notes: '',
  })
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedSlot, setSelectedSlot] = useState(null)
  const [calendarMonth, setCalendarMonth] = useState(
    () => new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  )
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const today = useMemo(() => getToday(), [])

  // Build the calendar day grid for the current month view
  const calendarDays = useMemo(() => {
    const year = calendarMonth.getFullYear()
    const month = calendarMonth.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    // Monday-first offset: JS getDay() returns 0=Sun, convert to 0=Mon
    const leadingNulls = (firstDay.getDay() + 6) % 7
    const days = []
    for (let i = 0; i < leadingNulls; i++) days.push(null)
    for (let d = 1; d <= lastDay.getDate(); d++) {
      days.push(new Date(year, month, d))
    }
    // Pad to complete the last row
    while (days.length % 7 !== 0) days.push(null)
    return days
  }, [calendarMonth])

  const isCurrentMonth =
    calendarMonth.getFullYear() === today.getFullYear() &&
    calendarMonth.getMonth() === today.getMonth()

  const prevMonth = () => {
    if (isCurrentMonth) return
    setCalendarMonth(
      new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() - 1, 1)
    )
  }

  const nextMonth = () => {
    setCalendarMonth(
      new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1, 1)
    )
  }

  const isDayDisabled = (date) => {
    if (!date) return true
    if (date < today) return true        // past
    if (date.getDay() === 0) return true // Sunday
    return false
  }

  const handleDayClick = (date) => {
    if (isDayDisabled(date)) return
    setSelectedDate(date)
    setSelectedSlot(null) // reset slot when date changes
    setErrors((e) => ({ ...e, date: undefined }))
  }

  const handleSlotClick = (slot) => {
    setSelectedSlot(slot)
    setErrors((e) => ({ ...e, slot: undefined }))
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((e) => ({ ...e, [name]: undefined }))
  }

  const handleAddressField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    setErrors((e) => ({ ...e, [field]: undefined }))
  }

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.phone.trim()) e.phone = 'Phone is required'
    if (!form.email.trim()) e.email = 'Email is required'
    if (!form.service) e.service = 'Please select a service'
    if (!form.street.trim()) e.street = 'Street address is required'
    if (!form.zip || !/^\d{5}$/.test(form.zip)) e.zip = 'Valid ZIP code required'
    if (!form.city.trim()) e.city = 'City is required'
    if (!form.state.trim()) e.state = 'State is required'
    else if (form.state !== 'NC') e.state = 'We only serve the Charlotte, NC area'
    if (!selectedDate) e.date = 'Please select a date'
    if (!selectedSlot) e.slot = 'Please select a time slot'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name, phone: form.phone, email: form.email, service: form.service,
          street: form.street, apt: form.apt, zip: form.zip, city: form.city, state: form.state,
          notes: form.notes, date: formatDate(selectedDate), slot: selectedSlot,
        }),
      })
      if (res.ok) {
        setSubmitted(true)
      } else {
        setErrors((prev) => ({ ...prev, submit: 'Something went wrong. Please try again or email us directly.' }))
      }
    } catch {
      setErrors((prev) => ({ ...prev, submit: 'Network error. Please check your connection and try again.' }))
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setForm({ name: '', phone: '', email: '', service: '', street: '', apt: '', zip: '', city: '', state: '', notes: '' })
    setSelectedDate(null)
    setSelectedSlot(null)
    setErrors({})
    setLoading(false)
    setSubmitted(false)
  }

  return (
    <>
      {/* Page Header */}
      <section className="bg-navy pt-32 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(45,142,245,0.08) 0%, transparent 70%)',
          }}
        />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <p className="text-brand text-sm font-semibold tracking-widest uppercase mb-3">
            Book an Appointment
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-5">
            Schedule a Walkthrough
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed">
            Not sure what you need? We'll come to you. Pick a date and time below
            and we'll do a free on-site assessment — no obligation.
          </p>
        </div>
      </section>

      {/* Booking Form + Info */}
      <section className="bg-navy-light py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

            {/* Left: Booking Card (3/5) */}
            <div className="lg:col-span-3">
              <ScrollFadeIn>
                <div className="bg-navy rounded-2xl p-8 border border-white/5">
                  {submitted ? (
                    /* Success State */
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <div className="bg-brand/15 rounded-full p-5 mb-5">
                        <CalendarCheck size={40} className="text-brand" />
                      </div>
                      <h2 className="text-2xl font-bold text-white mb-3">
                        Walkthrough Requested!
                      </h2>
                      <p className="text-gray-400 max-w-sm mb-2">
                        We'll confirm your appointment for{' '}
                        <span className="text-white font-semibold">
                          {formatDate(selectedDate)}
                        </span>{' '}
                        at{' '}
                        <span className="text-white font-semibold">{selectedSlot}</span>.
                      </p>
                      <p className="text-gray-500 text-sm mb-8">
                        Expect a call or email within 1 business day to confirm.
                      </p>
                      <button onClick={resetForm} className="btn-outline text-sm">
                        Schedule Another
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-8" noValidate>

                      {/* Step 1: Select a Date */}
                      <div>
                        <h2 className="text-white font-bold text-base mb-1">
                          Step 1 — Select a Date
                        </h2>
                        <p className="text-gray-500 text-xs mb-4">
                          Mon – Fri: after 3:00 PM. Saturdays: all day. Sundays unavailable.
                        </p>

                        {/* Calendar header */}
                        <div className="flex items-center justify-between mb-3">
                          <button
                            type="button"
                            onClick={prevMonth}
                            disabled={isCurrentMonth}
                            className={`p-1.5 rounded-lg transition-colors ${
                              isCurrentMonth
                                ? 'opacity-25 cursor-not-allowed'
                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                            }`}
                            aria-label="Previous month"
                          >
                            <ChevronLeft size={18} />
                          </button>
                          <span className="text-white font-semibold text-sm">
                            {MONTH_NAMES[calendarMonth.getMonth()]}{' '}
                            {calendarMonth.getFullYear()}
                          </span>
                          <button
                            type="button"
                            onClick={nextMonth}
                            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                            aria-label="Next month"
                          >
                            <ChevronRight size={18} />
                          </button>
                        </div>

                        {/* Day-of-week headers */}
                        <div className="grid grid-cols-7 mb-1">
                          {DAY_LABELS.map((label) => (
                            <div
                              key={label}
                              className={`text-center text-xs font-medium py-1 ${
                                label === 'Sun' ? 'text-gray-600' : 'text-gray-500'
                              }`}
                            >
                              {label}
                            </div>
                          ))}
                        </div>

                        {/* Calendar day grid */}
                        <div className="grid grid-cols-7 gap-1">
                          {calendarDays.map((date, idx) => {
                            if (!date) {
                              return <div key={`null-${idx}`} />
                            }
                            const disabled = isDayDisabled(date)
                            const isSelected = selectedDate && isSameDay(date, selectedDate)
                            const isToday = isSameDay(date, today)

                            return (
                              <button
                                key={date.toISOString()}
                                type="button"
                                onClick={() => handleDayClick(date)}
                                disabled={disabled}
                                className={`
                                  relative flex flex-col items-center justify-center
                                  w-full aspect-square rounded-lg text-sm font-medium
                                  transition-all duration-150
                                  ${disabled
                                    ? 'opacity-25 cursor-not-allowed text-gray-600'
                                    : isSelected
                                    ? 'bg-brand text-white shadow-glow-sm'
                                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                                  }
                                `}
                              >
                                {date.getDate()}
                                {isToday && !isSelected && (
                                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-brand" />
                                )}
                              </button>
                            )
                          })}
                        </div>

                        {errors.date && (
                          <p className="text-red-400 text-xs mt-2">{errors.date}</p>
                        )}
                      </div>

                      {/* Step 2: Select a Time */}
                      <div>
                        <h2 className="text-white font-bold text-base mb-1">
                          Step 2 — Select a Time
                        </h2>
                        <p className="text-gray-500 text-xs mb-4">
                          {selectedDate && selectedDate.getDay() >= 1 && selectedDate.getDay() <= 5
                            ? 'Weekday appointments available after 3:00 PM ET.'
                            : 'All times are Eastern Time (ET).'}
                        </p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
                          {getAvailableSlots(selectedDate).map((slot) => {
                            const [startH] = slot.split(':')
                            const endHour = parseInt(startH, 10) + 1
                            const endPeriod = endHour >= 12 ? 'PM' : 'AM'
                            const endLabel = `${endHour > 12 ? endHour - 12 : endHour}:00 ${endPeriod}`
                            const isSelected = selectedSlot === slot
                            return (
                              <button
                                key={slot}
                                type="button"
                                onClick={() => handleSlotClick(slot)}
                                className={`
                                  rounded-lg px-2 py-2.5 text-xs font-medium
                                  border transition-all duration-150 leading-tight
                                  ${isSelected
                                    ? 'border-brand bg-brand/15 text-brand'
                                    : 'border-white/10 text-gray-400 hover:border-brand/50 hover:text-white'
                                  }
                                `}
                              >
                                {slot}
                                <span className="block text-gray-500 text-[10px] font-normal">
                                  – {endLabel}
                                </span>
                              </button>
                            )
                          })}
                        </div>
                        {errors.slot && (
                          <p className="text-red-400 text-xs mt-2">{errors.slot}</p>
                        )}
                      </div>

                      {/* Step 3: Your Details */}
                      <div>
                        <h2 className="text-white font-bold text-base mb-4">
                          Step 3 — Your Details
                        </h2>
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-gray-300 text-sm font-medium mb-1.5">
                                Full Name *
                              </label>
                              <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Jane Smith"
                                className="input-field"
                              />
                              {errors.name && (
                                <p className="text-red-400 text-xs mt-1">{errors.name}</p>
                              )}
                            </div>
                            <div>
                              <label className="block text-gray-300 text-sm font-medium mb-1.5">
                                Phone Number *
                              </label>
                              <input
                                type="tel"
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                placeholder="(555) 123-4567"
                                className="input-field"
                              />
                              {errors.phone && (
                                <p className="text-red-400 text-xs mt-1">{errors.phone}</p>
                              )}
                            </div>
                          </div>

                          <div>
                            <label className="block text-gray-300 text-sm font-medium mb-1.5">
                              Email Address *
                            </label>
                            <input
                              type="email"
                              name="email"
                              value={form.email}
                              onChange={handleChange}
                              placeholder="jane@example.com"
                              className="input-field"
                            />
                            {errors.email && (
                              <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                            )}
                          </div>

                          <div>
                            <label className="block text-gray-300 text-sm font-medium mb-1.5">
                              Service Type *
                            </label>
                            <select
                              name="service"
                              value={form.service}
                              onChange={handleChange}
                              className="input-field"
                            >
                              <option value="" disabled>Select a service...</option>
                              {SERVICE_OPTIONS.map((opt) => (
                                <option key={opt} value={opt}>{opt}</option>
                              ))}
                            </select>
                            {errors.service && (
                              <p className="text-red-400 text-xs mt-1">{errors.service}</p>
                            )}
                          </div>

                          <div>
                            <p className="block text-gray-300 text-sm font-medium mb-3">
                              Service Address *
                            </p>
                            <AddressFields
                              value={{ street: form.street, apt: form.apt, zip: form.zip, city: form.city, state: form.state }}
                              onChange={handleAddressField}
                              errors={{ street: errors.street, zip: errors.zip, city: errors.city, state: errors.state }}
                              dark
                            />
                          </div>

                          <div>
                            <label className="block text-gray-300 text-sm font-medium mb-1.5">
                              Additional Notes
                            </label>
                            <textarea
                              name="notes"
                              rows={3}
                              value={form.notes}
                              onChange={handleChange}
                              placeholder="Anything we should know before the visit — building access, scope of work, etc."
                              className="input-field resize-none"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Selected summary before submit */}
                      {(selectedDate || selectedSlot) && (
                        <div className="bg-brand/5 border border-brand/20 rounded-xl p-4 text-sm">
                          <p className="text-brand font-semibold mb-1">Your selection</p>
                          <p className="text-gray-300">
                            {selectedDate ? formatDate(selectedDate) : '—'}{' '}
                            {selectedSlot ? `at ${selectedSlot}` : ''}
                          </p>
                        </div>
                      )}

                      {errors.submit && (
                        <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 text-red-400 text-sm">
                          {errors.submit}
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary w-full text-center text-base py-4 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {loading && <Loader2 size={18} className="animate-spin" />}
                        {loading ? 'Sending…' : 'Request Walkthrough Appointment'}
                      </button>
                    </form>
                  )}
                </div>
              </ScrollFadeIn>
            </div>

            {/* Right: Info Sidebar (2/5) */}
            <div className="lg:col-span-2">
              <ScrollFadeIn delay={150}>
                <div className="space-y-5">
                  <h3 className="text-white font-bold text-lg">What to Expect</h3>

                  <div className="bg-navy rounded-2xl p-6 border border-white/5 space-y-3">
                    {[
                      'A technician visits your home or business',
                      'We assess the space and discuss your needs',
                      'You receive a clear, itemized quote on the spot',
                      'No pressure — completely free of charge',
                    ].map((item) => (
                      <div key={item} className="flex items-start gap-3 text-sm text-gray-300">
                        <CheckCircle size={15} className="text-brand shrink-0 mt-0.5" />
                        {item}
                      </div>
                    ))}
                  </div>

                  <div className="bg-navy rounded-2xl p-6 border border-white/5 space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="bg-brand/10 rounded-lg p-2 shrink-0">
                        <Clock size={16} className="text-brand" />
                      </div>
                      <div>
                        <p className="text-white font-medium text-sm mb-0.5">Hours</p>
                        <p className="text-gray-400 text-sm">Mon – Fri: 3:00 PM – 6:00 PM ET</p>
                        <p className="text-gray-400 text-sm">Saturday: 8:00 AM – 6:00 PM ET</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-brand/10 rounded-lg p-2 shrink-0">
                        <MapPin size={16} className="text-brand" />
                      </div>
                      <div>
                        <p className="text-white font-medium text-sm mb-0.5">Service Area</p>
                        <p className="text-gray-400 text-sm">Charlotte, NC and surrounding areas</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-brand/10 rounded-lg p-2 shrink-0">
                        <Phone size={16} className="text-brand" />
                      </div>
                      <div>
                        <p className="text-white font-medium text-sm mb-0.5">Prefer to call?</p>
                        <p className="text-gray-400 text-sm">(555) 000-0000</p>
                      </div>
                    </div>
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
