'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { BottomNav } from '@/components/ui/BottomNav'
import type { Shot } from '@/lib/types'

const feedbackConfig = {
  under:   { label: 'Under',   icon: '↓', variant: 'info'    as const, color: '#6B96AF' },
  perfect: { label: 'Perfect', icon: '✓', variant: 'success' as const, color: '#6BAF6B' },
  over:    { label: 'Over',    icon: '↑', variant: 'warning' as const, color: '#AF6B6B' },
}

function ShotCard({ shot }: { shot: Shot }) {
  const fb   = shot.feedback ? feedbackConfig[shot.feedback] : null
  const date = new Date(shot.created_at)
  const timeStr = date.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })
  const dateStr = date.toLocaleDateString('th-TH', { day: 'numeric', month: 'short' })

  return (
    <Card className="px-4 py-3">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-[9px] font-bold uppercase tracking-[2px] text-[#8B7355]">
              Grinder {shot.grinder_id}
            </span>
            <span className="text-[9px] text-[#E8DDD0]">·</span>
            <span className="text-[9px] text-[#8B7355]">{dateStr} {timeStr}</span>
          </div>
          <p className="font-serif font-bold text-[14px] text-[#1A1008] leading-tight truncate">
            {(shot.bean as any)?.name ?? 'Unknown bean'}
          </p>
          {shot.temp_at_shot !== null && (
            <p className="text-[10px] text-[#A07850] mt-1">
              {shot.temp_at_shot}°C · {shot.humidity_at_shot}%
            </p>
          )}
        </div>
        <div className="flex flex-col items-end gap-1 flex-shrink-0">
          <span
            className="font-serif font-black text-[28px] leading-none"
            style={{ color: '#C8922A' }}
          >
            {shot.grind_number % 1 === 0 ? shot.grind_number.toFixed(0) : shot.grind_number.toFixed(1)}
          </span>
          {fb && (
            <Badge variant={fb.variant}>
              {fb.icon} {fb.label}
            </Badge>
          )}
        </div>
      </div>
    </Card>
  )
}

export default function LogPage() {
  const [shots, setShots]   = useState<Shot[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/shots?limit=100')
      .then(r => r.json())
      .then(data => { setShots(data); setLoading(false) })
  }, [])

  const perfectCount = shots.filter(s => s.feedback === 'perfect').length
  const totalWithFeedback = shots.filter(s => s.feedback).length
  const perfectRate = totalWithFeedback > 0
    ? Math.round((perfectCount / totalWithFeedback) * 100)
    : null

  return (
    <div className="min-h-screen pb-28" style={{ background: '#F5F0E8' }}>
      <div className="px-5 pt-8 pb-4">
        <h1 className="text-[22px] font-bold text-[#3D2B1F] mb-1" style={{ fontFamily: 'Georgia, serif' }}>
          Shot Log
        </h1>
        <p className="text-[12px] text-[#8B7355]">{shots.length} shots recorded</p>
      </div>

      {/* Stats row */}
      {shots.length > 0 && (
        <div className="px-5 mb-4">
          <div className="bg-white rounded-[16px] border border-[#E8DDD0] px-4 py-3 grid grid-cols-3 gap-2 text-center">
            <div>
              <p className="text-[22px] font-black text-[#6BAF6B]">{perfectRate ?? '—'}%</p>
              <p className="text-[9px] text-[#8B7355] uppercase tracking-wider">Perfect</p>
            </div>
            <div>
              <p className="text-[22px] font-black text-[#1A1008]">{shots.length}</p>
              <p className="text-[9px] text-[#8B7355] uppercase tracking-wider">Total</p>
            </div>
            <div>
              <p className="text-[22px] font-black text-[#C8922A]">{perfectCount}</p>
              <p className="text-[9px] text-[#8B7355] uppercase tracking-wider">Perfect shots</p>
            </div>
          </div>
        </div>
      )}

      <div className="px-5 space-y-2">
        {loading && (
          <p className="text-[13px] text-[#8B7355] text-center py-8">Loading…</p>
        )}
        {!loading && shots.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[40px] mb-3">☕</p>
            <p className="text-[14px] text-[#8B7355]">No shots logged yet</p>
            <p className="text-[12px] text-[#A07850] mt-1">Pull your first shot and tap feedback</p>
          </div>
        )}
        {shots.map(shot => <ShotCard key={shot.id} shot={shot} />)}
      </div>

      <BottomNav />
    </div>
  )
}
