import { clsx } from 'clsx'

interface CardProps {
  children: React.ReactNode
  className?: string
}

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={clsx(
        'bg-white rounded-[18px] border border-[#E8DDD0] shadow-[0_4px_14px_rgba(0,0,0,0.08)]',
        className
      )}
    >
      {children}
    </div>
  )
}
