import { useScrollFadeIn } from '@/hooks/useScrollFadeIn'

export default function ScrollFadeIn({ children, delay = 0, className = '' }) {
  const { ref, isVisible } = useScrollFadeIn()

  return (
    <div
      ref={ref}
      className={`${isVisible ? 'fade-visible' : 'fade-hidden'} ${className}`}
      style={delay ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  )
}
