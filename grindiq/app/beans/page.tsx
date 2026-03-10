'use client'

import { useEffect, useState } from 'react'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { BottomNav } from '@/components/ui/BottomNav'
import type { Bean } from '@/lib/types'

export default function BeansPage() {
  const [beans, setBeans]   = useState<Bean[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/beans')
      .then(r => r.json())
      .then(data => { setBeans(data); setLoading(false) })
  }, [])

  const agtronVariant = (score: number): 'info' | 'gold' | 'warning' =>
    score >= 65 ? 'info' : score <= 45 ? 'warning' : 'gold'

  return (
    <div className="min-h-screen pb-28" style={{ background: '#F5F0E8' }}>
      <div className="px-5 pt-8 pb-4">
        <h1 className="text-[22px] font-bold text-[#3D2B1F] mb-1" style={{ fontFamily: 'Georgia, serif' }}>
          Bean Profiles
        </h1>
        <p className="text-[12px] text-[#8B7355]">{beans.length} beans configured</p>
      </div>

      <div className="px-5 space-y-2">
        {loading && (
          <p className="text-[13px] text-[#8B7355] text-center py-8">Loading…</p>
        )}

        {beans.map(bean => (
          <Card key={bean.id} className="px-4 py-3">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <p className="font-serif font-bold text-[15px] text-[#1A1008] leading-tight">
                  {bean.name}
                </p>
                {bean.origin && (
                  <p className="text-[11px] text-[#8B7355] mt-0.5">{bean.origin}</p>
                )}
                {bean.notes && (
                  <p className="text-[11px] text-[#A07850] mt-1 line-clamp-2">{bean.notes}</p>
                )}
              </div>
              <div className="flex flex-col items-end gap-1 flex-shrink-0">
                <Badge variant={agtronVariant(bean.agtron_score)}>
                  Agtron {bean.agtron_score}
                </Badge>
                {bean.roast_label && (
                  <span className="text-[10px] text-[#8B7355]">{bean.roast_label}</span>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <BottomNav />
    </div>
  )
}
