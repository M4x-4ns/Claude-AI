'use client'

import { clsx } from 'clsx'

interface SensorBadgeProps {
  temperature: number | null
  humidity: number | null
  online: boolean
  isManual?: boolean
}

export function SensorBadge({ temperature, humidity, online, isManual }: SensorBadgeProps) {
  const hasData = temperature !== null && humidity !== null

  return (
    <div className="flex items-center gap-2 bg-[#F5DFA0] px-3 py-2 rounded-[14px]">
      {/* Status dot */}
      <span
        className={clsx(
          'w-[6px] h-[6px] rounded-full flex-shrink-0',
          online
            ? 'bg-[#6BAF6B] shadow-[0_0_6px_#6BAF6B]'
            : isManual
              ? 'bg-[#C8922A]'
              : 'bg-[#AF6B6B]'
        )}
      />

      <span className="text-[9px] font-bold text-[#8B7355] uppercase tracking-wider">
        {isManual ? 'Manual' : 'ESP32'}
      </span>

      {hasData ? (
        <>
          <span className="text-[12px] font-bold text-[#1A1008]">
            {temperature!.toFixed(1)}°C
          </span>
          <span className="text-[9px] text-[#8B7355]">·</span>
          <span className="text-[12px] font-bold text-[#1A1008]">
            {humidity!.toFixed(0)}%
          </span>
        </>
      ) : (
        <span className="text-[11px] text-[#8B7355]">
          {online ? 'Reading…' : 'Offline'}
        </span>
      )}
    </div>
  )
}
