import { CheckCircle } from 'lucide-react'

export default function ServiceCard({ icon: Icon, title, description, badge, features }) {
  return (
    <div className="bg-navy-light rounded-2xl p-6 border border-white/5 hover:border-brand/40 hover:shadow-glow-sm transition-all duration-300 flex flex-col h-full">
      <div className="flex items-start justify-between mb-4">
        <div className="bg-brand/10 rounded-xl p-3 w-fit">
          <Icon size={24} className="text-brand" />
        </div>
        {badge && (
          <span className="bg-brand/20 text-brand text-xs font-semibold rounded-full px-3 py-1">
            {badge}
          </span>
        )}
      </div>

      <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-1">{description}</p>

      {features && features.length > 0 && (
        <ul className="space-y-2 mt-auto pt-4 border-t border-white/5">
          {features.map((feature) => (
            <li key={feature} className="flex items-center gap-2 text-sm text-gray-300">
              <CheckCircle size={14} className="text-brand shrink-0" />
              {feature}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
