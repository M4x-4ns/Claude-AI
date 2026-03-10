'use client'

interface HeroNumberProps {
  grindNumber: string | null
  label?: string
}

export function HeroNumber({ grindNumber, label = 'Grind Setting' }: HeroNumberProps) {
  return (
    <div className="relative bg-white rounded-[24px] border-[1.5px] border-[#F5DFA0] shadow-[0_6px_30px_rgba(200,146,42,0.15)] overflow-hidden px-6 py-8 flex flex-col items-center">
      {/* Decorative background circle */}
      <div
        className="absolute -top-8 -right-8 w-40 h-40 rounded-full opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #C8922A, transparent)' }}
      />
      {/* Ghost icon */}
      <span className="absolute bottom-3 right-5 text-[48px] opacity-[0.08] pointer-events-none select-none">
        ☕
      </span>

      <p className="text-[9px] font-sans font-semibold uppercase tracking-[3px] text-[#8B7355] mb-2">
        {label}
      </p>

      {grindNumber !== null ? (
        <p
          className="font-serif font-black text-[80px] leading-none text-[#C8922A] select-none"
          style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
        >
          {grindNumber}
        </p>
      ) : (
        <p className="text-[#E8DDD0] text-[32px] font-serif font-bold">
          — Select bean —
        </p>
      )}
    </div>
  )
}
