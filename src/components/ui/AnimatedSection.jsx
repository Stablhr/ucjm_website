import useScrollReveal from '../../hooks/useScrollReveal'

const variants = {
  'fade-up': 'opacity-0 translate-y-8',
  'fade-down': 'opacity-0 -translate-y-8',
  'fade-in': 'opacity-0',
  'scale-in': 'opacity-0 scale-95',
  'blur-in': 'opacity-0 blur-sm',
  'slide-left': 'opacity-0 translate-x-10',
  'slide-right': 'opacity-0 -translate-x-10',
}

const activeClasses = {
  'fade-up': 'animate-fade-up',
  'fade-down': 'animate-fade-down',
  'fade-in': 'animate-fade-in',
  'scale-in': 'animate-scale-in',
  'blur-in': 'animate-blur-in',
  'slide-left': 'animate-slide-left',
  'slide-right': 'animate-slide-right',
}

export default function AnimatedSection({
  children,
  animation = 'fade-up',
  delay = 0,
  className = '',
  threshold,
  rootMargin,
  once = true,
  as: Tag = 'div',
}) {
  const [ref, isVisible] = useScrollReveal({ threshold, rootMargin, once })

  return (
    <Tag
      ref={ref}
      className={`transition-all duration-700 ease-apple will-change-transform ${
        isVisible
          ? activeClasses[animation] || 'animate-fade-up'
          : variants[animation] || variants['fade-up']
      } ${className}`}
      style={{ transitionDelay: delay ? `${delay}ms` : undefined }}
    >
      {children}
    </Tag>
  )
}
