'use client'

import { clsx } from 'clsx'
import type { Grinder, GrinderId } from '@/lib/types'

interface GrinderSelectorProps {
  grinders: Grinder[]
  selectedId: GrinderId
  onSelect: (id: GrinderId) => void
}

export function GrinderSelector({ grinders, selectedId, onSelect }: GrinderSelectorProps) {
  return (
    <div className="flex gap-2">
      {grinders.map((g) => {
        const active = g.id === selectedId
        return (
          <button
            key={g.id}
            onClick={() => onSelect(g.id as GrinderId)}
            className={clsx(
              'flex-1 flex flex-col items-center py-3 rounded-[50px] border transition-all duration-200 active:scale-[0.97]',
              active
                ? 'border-transparent text-white shadow-[0_4px_14px_rgba(212,168,67,0.4)]'
                : 'bg-white border-[#E8DDD0] text-[#8B7355]'
            )}
            style={active ? { backgroundColor: g.color } : {}}
          >
            <span className={clsx('font-serif font-bold text-[15px]', active ? 'text-white' : 'text-[#3D2B1F]')}>
              {g.id}
            </span>
            <span className={clsx('text-[9px] uppercase tracking-wider mt-0.5', active ? 'text-white/80' : 'text-[#8B7355]')}>
              {g.roast_label.split(' ')[0]}
            </span>
          </button>
        )
      })}
    </div>
  )
}
