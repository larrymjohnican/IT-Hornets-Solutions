export default function TeamMemberCard({ name, role, initials }) {
  return (
    <div className="flex flex-col items-center text-center p-6">
      {/* Avatar */}
      <div className="w-20 h-20 rounded-full bg-brand/20 border-2 border-brand/40 flex items-center justify-center mb-4 shadow-glow-sm">
        <span className="text-brand font-bold text-xl">{initials}</span>
      </div>
      <h4 className="text-white font-semibold text-base mb-1">{name}</h4>
      <p className="text-gray-400 text-sm">{role}</p>
    </div>
  )
}
