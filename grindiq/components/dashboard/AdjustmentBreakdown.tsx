'use client'

import type { GrindBreakdown } from '@/lib/types'
import { agtronLabel } from '@/lib/grind-calculator'

interface AdjustmentBreakdownProps {
  breakdown: GrindBreakdown
  agtronScore: number
}

function AdjRow({
  label,
  value,
  hint,
}: {
  label: string
  value: number
  hint?: string
}) {
  const isZero     = value === 0
  const isPositive = value > 0

  return (
    <div className="flex items-center justify-between py-2 border-b border-[#F5F0E8] last:border-0">
      <div>
        <p className="text-[12px] font-semibold text-[#3D2B1F]">{label}</p>
        {hint && <p className="text-[10px] text-[#8B7355] mt-0.5">{hint}</p>}
      </div>
      <span
        className="text-[15px] font-bold"
        style={{
          color: isZero
            ? '#8B7355'
            : isPositive
              ? '#AF6B6B'
              : '#6BAF6B',
        }}
      >
        {isZero ? '±0' : isPositive ? `+${value}` : value}
      </span>
    </div>
  )
}

export function AdjustmentBreakdown({ breakdown, agtronScore }: AdjustmentBreakdownProps) {
  return (
    <div className="bg-white rounded-[18px] border border-[#E8DDD0] px-4 py-2">
      <p className="text-[9px] font-bold uppercase tracking-[2px] text-[#8B7355] mb-1 pt-1">
        Adjustment Breakdown
      </p>
      <AdjRow label="Baseline" value={0} hint={`Starting at ${breakdown.baseline}`} />
      <AdjRow
        label="Temperature"
        value={breakdown.dTemp}
        hint={breakdown.dTemp !== 0 ? (breakdown.dTemp > 0 ? 'Warmer → coarser' : 'Cooler → finer') : 'At baseline temp'}
      />
      <AdjRow
        label="Humidity"
        value={breakdown.dHumidity}
        hint={breakdown.dHumidity !== 0 ? (breakdown.dHumidity > 0 ? 'More humid → coarser' : 'Drier → finer') : 'At baseline humidity'}
      />
      <AdjRow
        label="Roast (Agtron)"
        value={breakdown.dAgtron}
        hint={agtronLabel(agtronScore)}
      />
    </div>
  )
}
