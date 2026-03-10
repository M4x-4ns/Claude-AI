'use client'

import { clsx } from 'clsx'
import type { ShotFeedback } from '@/lib/types'

interface FeedbackButtonsProps {
  selected: ShotFeedback | null
  onSelect: (feedback: ShotFeedback) => void
  disabled?: boolean
}

const options: { value: ShotFeedback; icon: string; label: string; color: string; bg: string }[] = [
  { value: 'under',   icon: '↓', label: 'Under',   color: '#6B96AF', bg: '#e8f0f5' },
  { value: 'perfect', icon: '✓', label: 'Perfect',  color: '#6BAF6B', bg: '#e8f5e8' },
  { value: 'over',    icon: '↑', label: 'Over',     color: '#AF6B6B', bg: '#f5e8e8' },
]

export function FeedbackButtons({ selected, onSelect, disabled }: FeedbackButtonsProps) {
  return (
    <div className="flex gap-2">
      {options.map((opt) => {
        const active = selected === opt.value
        return (
          <button
            key={opt.value}
            onClick={() => !disabled && onSelect(opt.value)}
            disabled={disabled}
            className={clsx(
              'flex-1 flex flex-col items-center gap-1 py-3 rounded-[16px] border transition-all duration-200 active:scale-[0.97] disabled:opacity-50',
              active
                ? 'border-transparent shadow-[0_4px_14px_rgba(0,0,0,0.15)]'
                : 'bg-white border-[#E8DDD0]'
            )}
            style={active ? { backgroundColor: opt.bg, borderColor: opt.color } : {}}
          >
            <span
              className="text-[20px] leading-none"
              style={{ color: active ? opt.color : '#8B7355' }}
            >
              {opt.icon}
            </span>
            <span
              className="text-[10px] font-semibold uppercase tracking-[0.5px]"
              style={{ color: active ? opt.color : '#8B7355' }}
            >
              {opt.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
