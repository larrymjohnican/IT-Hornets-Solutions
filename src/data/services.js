import { Cable, Building2, Tv } from 'lucide-react'

export const services = [
  {
    id: 'residential-cable',
    icon: Cable,
    title: 'Internet Cable Installation',
    badge: 'Residential',
    description:
      'Professional in-home ethernet and coax cable runs for fast, reliable internet throughout your entire home. No more dead zones or slow Wi-Fi — get a wired connection where you need it most.',
    features: ['Cat6 / Cat6A wiring', 'Clean wall-plate terminations', 'Full home coverage'],
  },
  {
    id: 'commercial-cable',
    icon: Building2,
    title: 'Internet Cable Installation',
    badge: 'Commercial',
    description:
      'Structured cabling solutions for offices, retail stores, warehouses, and more. We design and install networks built for reliability, scalability, and the demands of a busy workplace.',
    features: ['Network rack & patch panel setup', 'POE device support', 'Scalable infrastructure'],
  },
  {
    id: 'tv-mounting',
    icon: Tv,
    title: 'TV Mounting',
    badge: null,
    description:
      'Clean, safe, and professional TV wall mounting for any screen size on any wall type. We handle everything — from finding studs to concealing cables — leaving you with a sleek, clutter-free setup.',
    features: ['Any wall type (drywall, brick, concrete)', 'Cable concealment & management', 'Tilt & full-motion mounts'],
  },
]
