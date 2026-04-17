import { useState, useEffect, useRef } from 'react'
import { Loader } from '@googlemaps/js-api-loader'
import { Loader2 } from 'lucide-react'

const apiKey = import.meta.env.VITE_GOOGLE_PLACES_KEY
const loader = apiKey
  ? new Loader({ apiKey, version: 'weekly', libraries: ['places'] })
  : null

/**
 * Structured address form: Street, Apt/Suite, ZIP → City + State auto-fill.
 *
 * Props:
 *   value    - { street, apt, zip, city, state }
 *   onChange - (field, value) => void
 *   errors   - { street?, zip?, city?, state? } — optional inline error messages
 *   dark     - pass true when rendered on a dark background (Schedule page)
 */
export default function AddressFields({ value, onChange, errors = {}, dark = false }) {
  const streetRef = useRef(null)
  const [zipLoading, setZipLoading] = useState(false)

  const label = dark
    ? 'block text-gray-300 text-sm font-medium mb-1.5'
    : 'block text-gray-700 dark:text-gray-300 text-sm font-medium mb-1.5'

  // Google Places Autocomplete on street field — fills all fields on selection
  useEffect(() => {
    if (!loader || !streetRef.current) return

    let listener
    loader.load().then((google) => {
      const ac = new google.maps.places.Autocomplete(streetRef.current, {
        componentRestrictions: { country: 'us' },
        types: ['address'],
        fields: ['address_components'],
      })

      listener = ac.addListener('place_changed', () => {
        const place = ac.getPlace()
        if (!place.address_components) return

        const get = (type, nameType = 'long_name') =>
          place.address_components.find((c) => c.types.includes(type))?.[nameType] ?? ''

        const streetNum = get('street_number')
        const route = get('route')
        const street = [streetNum, route].filter(Boolean).join(' ')
        const apt = get('subpremise')
        const zip = get('postal_code')
        const city = get('locality') || get('sublocality_level_1') || get('neighborhood')
        const state = get('administrative_area_level_1', 'short_name')

        // Set the input to just the street (Google sets it to full address by default)
        if (streetRef.current) streetRef.current.value = street

        onChange('street', street)
        if (apt) onChange('apt', apt)
        if (zip) onChange('zip', zip)
        if (city) onChange('city', city)
        if (state) onChange('state', state)
      })
    })

    return () => { listener?.remove() }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Sync external resets (e.g. after form submit) to the uncontrolled street input
  useEffect(() => {
    if (streetRef.current && streetRef.current.value !== value.street) {
      streetRef.current.value = value.street
    }
  }, [value.street])

  // ZIP → city/state lookup via Zippopotam.us (free, no key required)
  const lookupZip = async (zip) => {
    setZipLoading(true)
    try {
      const res = await fetch(`https://api.zippopotam.us/us/${zip}`)
      if (res.ok) {
        const data = await res.json()
        const place = data.places[0]
        onChange('city', place['place name'])
        onChange('state', place['state abbreviation'])
      }
    } catch {
      // silent — user can fill city/state manually
    } finally {
      setZipLoading(false)
    }
  }

  const handleZipChange = (e) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 5)
    onChange('zip', val)
    if (val.length === 5) lookupZip(val)
  }

  return (
    <div className="space-y-3">
      {/* Street Address */}
      <div>
        <label className={label}>Street Address *</label>
        <input
          ref={streetRef}
          type="text"
          defaultValue={value.street}
          onChange={(e) => onChange('street', e.target.value)}
          placeholder="123 Main St"
          className="input-field"
          autoComplete="off"
        />
        {errors.street && (
          <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.street}</p>
        )}
      </div>

      {/* Apt / Suite */}
      <div>
        <label className={label}>
          Apt / Suite{' '}
          <span className={dark ? 'text-gray-500 font-normal' : 'text-gray-400 dark:text-gray-500 font-normal'}>
            (optional)
          </span>
        </label>
        <input
          type="text"
          value={value.apt}
          onChange={(e) => onChange('apt', e.target.value)}
          placeholder="Apt 4B"
          className="input-field"
        />
      </div>

      {/* ZIP / City / State */}
      <div className="grid grid-cols-6 gap-3">
        <div className="col-span-2">
          <label className={label}>ZIP Code *</label>
          <div className="relative">
            <input
              type="text"
              inputMode="numeric"
              value={value.zip}
              onChange={handleZipChange}
              placeholder="28201"
              maxLength={5}
              className="input-field pr-8"
            />
            {zipLoading && (
              <Loader2
                size={14}
                className="animate-spin absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
            )}
          </div>
          {errors.zip && (
            <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.zip}</p>
          )}
        </div>

        <div className="col-span-3">
          <label className={label}>City *</label>
          <input
            type="text"
            value={value.city}
            onChange={(e) => onChange('city', e.target.value)}
            placeholder="Charlotte"
            className="input-field"
          />
          {errors.city && (
            <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.city}</p>
          )}
        </div>

        <div className="col-span-1">
          <label className={label}>State *</label>
          <input
            type="text"
            value={value.state}
            onChange={(e) => onChange('state', e.target.value.toUpperCase().slice(0, 2))}
            placeholder="NC"
            maxLength={2}
            className="input-field text-center uppercase"
          />
          {errors.state && (
            <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.state}</p>
          )}
        </div>
      </div>
    </div>
  )
}
