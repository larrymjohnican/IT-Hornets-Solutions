import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'

const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

export default function Footer() {
  return (
    <footer className="bg-navy-light border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {/* Brand */}
          <div>
            <div className="text-xl font-bold text-white mb-3">
              Hornets <span className="text-brand">IT</span> Solutions
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Connected Homes. Connected Businesses.<br />
              Professional cable installation and TV mounting across North Carolina.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-gray-400 hover:text-brand text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <Phone size={15} className="text-brand shrink-0" />
                <span>(555) 000-0000</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <Mail size={15} className="text-brand shrink-0" />
                <span>info@hornetsitsolutions.com</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <MapPin size={15} className="text-brand shrink-0" />
                <span>North Carolina</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <Clock size={15} className="text-brand shrink-0" />
                <span>Mon–Sat, 8am–6pm</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 mt-10 pt-6 text-center">
          <p className="text-gray-500 text-sm">
            © 2025 Hornets IT Solutions LLC. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
