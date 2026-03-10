'use client'

import { clsx } from 'clsx'
import { Badge } from '@/components/ui/Badge'
import type { Bean, Grinder } from '@/lib/types'

interface BeanCardProps {
  bean: Bean
  active: boolean
  grinder: Grinder
  onSelect: (id: string) => void
}

export function BeanCard({ bean, active, grinder, onSelect }: BeanCardProps) {
  const agtronBadge =
    bean.agtron_score >= 65 ? 'Light' :
    bean.agtron_score <= 45 ? 'Dark'  : 'Medium'

  return (
    <button
      onClick={() => onSelect(bean.id)}
      className={clsx(
        'flex-shrink-0 w-[120px] rounded-[20px] overflow-hidden border transition-all duration-200 active:scale-[0.97] text-left',
        active
          ? 'shadow-[0_4px_18px_rgba(0,0,0,0.25)]'
          : 'border-[#E8DDD0] bg-white'
      )}
      style={active ? { borderColor: grinder.color, borderWidth: '1.5px' } : {}}
    >
      {/* Image area */}
      <div
        className="h-[90px] flex items-center justify-center"
        style={{ background: `linear-gradient(135deg, ${grinder.color}33, ${grinder.color}11)` }}
      >
        <span className="text-[40px] opacity-80">☕</span>
      </div>

      {/* Content */}
      <div className="p-2 bg-white">
        <p className="font-serif font-bold text-[11px] text-[#1A1008] leading-tight line-clamp-2 mb-1">
          {bean.name}
        </p>
        {bean.origin && (
          <p className="text-[9px] text-[#8B7355] mb-1 truncate">{bean.origin}</p>
        )}
        <Badge variant="gold">{agtronBadge} · {bean.agtron_score}</Badge>
      </div>
    </button>
  )
}
