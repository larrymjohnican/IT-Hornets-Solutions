import { useEffect, useRef } from 'react'
import { Loader } from '@googlemaps/js-api-loader'

const apiKey = import.meta.env.VITE_GOOGLE_PLACES_KEY

// Singleton loader — created once, reused across both forms
const loader = apiKey
  ? new Loader({ apiKey, version: 'weekly', libraries: ['places'] })
  : null

// Bias (not restrict) results toward the Charlotte, NC metro area
const CHARLOTTE_BOUNDS = {
  south: 34.9, north: 35.5,
  west: -81.1, east: -80.4,
}

/**
 * Address input with Google Places Autocomplete.
 * Falls back to a plain text input when no API key is present.
 *
 * Props:
 *   value          - current address string (for controlled parent state)
 *   onChange(str)  - called on every keystroke AND on place selection
 *   onStateSelect(abbr) - called only when user picks from dropdown; receives
 *                         the 2-letter state abbreviation (e.g. "NC")
 *   placeholder, className - passed through to the <input>
 */
export default function AddressAutocomplete({
  value,
  onChange,
  onStateSelect,
  placeholder,
  className,
}) {
  const inputRef = useRef(null)

  // Sync external value resets (e.g., after form submission is cleared)
  useEffect(() => {
    if (inputRef.current && inputRef.current.value !== value) {
      inputRef.current.value = value
    }
  }, [value])

  useEffect(() => {
    if (!loader) return

    let listener

    loader.load().then((google) => {
      const bounds = new google.maps.LatLngBounds(
        { lat: CHARLOTTE_BOUNDS.south, lng: CHARLOTTE_BOUNDS.west },
        { lat: CHARLOTTE_BOUNDS.north, lng: CHARLOTTE_BOUNDS.east }
      )

      const autocomplete = new google.maps.places.Autocomplete(inputRef.current, {
        componentRestrictions: { country: 'us' },
        types: ['address'],
        bounds,
        strictBounds: false,
        fields: ['formatted_address', 'address_components'],
      })

      listener = autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace()
        if (!place.address_components) return

        const stateComp = place.address_components.find((c) =>
          c.types.includes('administrative_area_level_1')
        )
        const state = stateComp?.short_name ?? ''

        onChange(place.formatted_address)
        onStateSelect?.(state)
      })
    })

    return () => {
      listener?.remove()
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <input
      ref={inputRef}
      type="text"
      defaultValue={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={className}
      autoComplete="off"
    />
  )
}
