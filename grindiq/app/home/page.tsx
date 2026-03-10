'use client'

import { useEffect, useState } from 'react'
import { useAppStore } from '@/store'
import { useSensor } from '@/hooks/useSensor'
import { calculateGrind } from '@/lib/grind-calculator'
import { GrinderSelector } from '@/components/grinder/GrinderSelector'
import { BeanCard } from '@/components/bean/BeanCard'
import { HeroNumber } from '@/components/dashboard/HeroNumber'
import { AdjustmentBreakdown } from '@/components/dashboard/AdjustmentBreakdown'
import { FeedbackButtons } from '@/components/dashboard/FeedbackButtons'
import { SensorBadge } from '@/components/sensor/SensorBadge'
import { BottomNav } from '@/components/ui/BottomNav'
import type { Bean, Grinder, GrindResult, ShotFeedback } from '@/lib/types'

export default function DashboardPage() {
  const {
    selectedGrinderId,
    setSelectedGrinderId,
    selectedBeanId,
    setSelectedBeanId,
  } = useAppStore()

  const sensor = useSensor()

  const [grinders, setGrinders]     = useState<Grinder[]>([])
  const [beans, setBeans]           = useState<Bean[]>([])
  const [grindResult, setGrindResult] = useState<GrindResult | null>(null)
  const [feedback, setFeedback]     = useState<ShotFeedback | null>(null)
  const [saving, setSaving]         = useState(false)
  const [saved, setSaved]           = useState(false)

  // Load grinders & beans from API
  useEffect(() => {
    fetch('/api/grinders').then(r => r.json()).then(setGrinders)
    fetch('/api/beans').then(r => r.json()).then(setBeans)
  }, [])

  // Recalculate when inputs change
  useEffect(() => {
    const grinder    = grinders.find(g => g.id === selectedGrinderId)
    const bean       = beans.find(b => b.id === selectedBeanId)
    const temp       = sensor.temperature
    const humidity   = sensor.humidity

    if (!grinder || !bean || temp === null || humidity === null) {
      setGrindResult(null)
      return
    }

    const result = calculateGrind({
      baselineGrind:    grinder.baseline_grind,
      baselineTemp:     grinder.baseline_temp,
      baselineHumidity: grinder.baseline_humidity,
      currentTemp:      temp,
      currentHumidity:  humidity,
      agtronScore:      bean.agtron_score,
      grinderType:      grinder.grinder_type,
    })
    setGrindResult(result)
    setFeedback(null)
    setSaved(false)
  }, [selectedGrinderId, selectedBeanId, sensor.temperature, sensor.humidity, grinders, beans])

  const selectedGrinder = grinders.find(g => g.id === selectedGrinderId)
  const selectedBean    = beans.find(b => b.id === selectedBeanId)

  const handleFeedback = async (value: ShotFeedback) => {
    setFeedback(value)

    if (!grindResult || !selectedGrinder || !selectedBean) return
    setSaving(true)

    await fetch('/api/shots', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        grinder_id:      selectedGrinderId,
        bean_id:         selectedBeanId,
        grind_number:    grindResult.finalGrind,
        temp_at_shot:    sensor.temperature,
        humidity_at_shot: sensor.humidity,
        d_temp:          grindResult.breakdown.dTemp,
        d_humidity:      grindResult.breakdown.dHumidity,
        d_agtron:        grindResult.breakdown.dAgtron,
        feedback:        value,
      }),
    })

    setSaving(false)
    setSaved(true)
  }

  return (
    <div className="min-h-screen pb-28" style={{ background: '#F5F0E8' }}>
      {/* Header */}
      <div className="px-5 pt-8 pb-4">
        <div className="flex items-center justify-between mb-1">
          <h1
            className="text-[22px] font-bold text-[#3D2B1F]"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            GrindIQ
          </h1>
          <SensorBadge
            temperature={sensor.temperature}
            humidity={sensor.humidity}
            online={sensor.online}
            isManual={sensor.isManual}
          />
        </div>
        <p className="text-[12px] text-[#8B7355]">Select grinder and bean to get your grind setting</p>
      </div>

      <div className="px-5 space-y-4">
        {/* Grinder selector */}
        {grinders.length > 0 && (
          <section>
            <p className="text-[9px] font-bold uppercase tracking-[3px] text-[#8B7355] mb-2">
              Grinder
            </p>
            <GrinderSelector
              grinders={grinders}
              selectedId={selectedGrinderId}
              onSelect={setSelectedGrinderId}
            />
          </section>
        )}

        {/* Bean selector */}
        <section>
          <p className="text-[9px] font-bold uppercase tracking-[3px] text-[#8B7355] mb-2">
            Bean
          </p>
          <div className="scroll-x flex gap-3 pb-2">
            {beans.map(bean => (
              <BeanCard
                key={bean.id}
                bean={bean}
                active={bean.id === selectedBeanId}
                grinder={selectedGrinder ?? grinders[0]}
                onSelect={setSelectedBeanId}
              />
            ))}
          </div>
        </section>

        {/* Hero number */}
        {sensor.temperature === null && !sensor.isManual && (
          <div className="bg-[#F5DFA0] rounded-[14px] px-4 py-3 text-center">
            <p className="text-[12px] text-[#8B7355]">
              ⚠ No sensor data — go to <strong>Settings</strong> to configure ESP32 or enable manual mode
            </p>
          </div>
        )}

        <HeroNumber
          grindNumber={grindResult?.displayGrind ?? null}
          label={`Grinder ${selectedGrinderId} · ${selectedGrinder?.roast_label ?? ''}`}
        />

        {/* Breakdown */}
        {grindResult && (
          <AdjustmentBreakdown
            breakdown={grindResult.breakdown}
            agtronScore={selectedBean?.agtron_score ?? 55}
          />
        )}

        {/* Feedback */}
        {grindResult && (
          <section>
            <p className="text-[9px] font-bold uppercase tracking-[3px] text-[#8B7355] mb-2">
              Shot Result
              {saved && <span className="ml-2 text-[#6BAF6B] normal-case tracking-normal">✓ Saved</span>}
            </p>
            <FeedbackButtons
              selected={feedback}
              onSelect={handleFeedback}
              disabled={saving}
            />
          </section>
        )}
      </div>

      <BottomNav />
    </div>
  )
}
