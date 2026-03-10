import { clsx } from 'clsx'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'gold' | 'neutral' | 'success' | 'info' | 'warning'
  className?: string
}

const variants = {
  gold:    'bg-[#F5DFA0] text-[#C8922A]',
  neutral: 'bg-[#F5F0E8] text-[#8B7355]',
  success: 'bg-[#e8f5e8] text-[#6BAF6B]',
  info:    'bg-[#e8f0f5] text-[#6B96AF]',
  warning: 'bg-[#f5e8e8] text-[#AF6B6B]',
}

export function Badge({ children, variant = 'gold', className }: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-block px-2 py-0.5 rounded-[8px] text-[9px] font-bold uppercase tracking-wider',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
