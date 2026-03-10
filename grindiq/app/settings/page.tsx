'use client'

import { useState } from 'react'
import { useAppStore } from '@/store'
import { Card } from '@/components/ui/Card'
import { BottomNav } from '@/components/ui/BottomNav'

export default function SettingsPage() {
  const {
    esp32Url, setEsp32Url,
    pollInterval, setPollInterval,
    useManual, setUseManual,
    manualTemp, setManualTemp,
    manualHumidity, setManualHumidity,
  } = useAppStore()

  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="min-h-screen pb-28" style={{ background: '#F5F0E8' }}>
      <div className="px-5 pt-8 pb-4">
        <h1 className="text-[22px] font-bold text-[#3D2B1F] mb-1" style={{ fontFamily: 'Georgia, serif' }}>
          Settings
        </h1>
        <p className="text-[12px] text-[#8B7355]">Sensor and grinder configuration</p>
      </div>

      <div className="px-5 space-y-4">
        {/* Sensor section */}
        <section>
          <p className="text-[9px] font-bold uppercase tracking-[3px] text-[#8B7355] mb-2">
            ESP32 Sensor
          </p>
          <Card className="px-4 py-4 space-y-4">
            {/* Manual override toggle */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[14px] font-semibold text-[#1A1008]">Manual mode</p>
                <p className="text-[11px] text-[#8B7355]">Use manual values instead of sensor</p>
              </div>
              <button
                onClick={() => setUseManual(!useManual)}
                className="relative w-12 h-6 rounded-full transition-colors duration-200"
                style={{ backgroundColor: useManual ? '#C8922A' : '#E8DDD0' }}
              >
                <span
                  className="absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200"
                  style={{ transform: useManual ? 'translateX(26px)' : 'translateX(4px)' }}
                />
              </button>
            </div>

            {/* ESP32 URL */}
            {!useManual && (
              <>
                <div>
                  <label className="text-[11px] font-semibold text-[#8B7355] uppercase tracking-wider block mb-1">
                    ESP32 URL
                  </label>
                  <input
                    type="url"
                    value={esp32Url}
                    onChange={e => setEsp32Url(e.target.value)}
                    placeholder="http://192.168.1.42"
                    className="w-full border border-[#E8DDD0] rounded-[10px] px-3 py-2 text-[13px] text-[#1A1008] bg-[#F5F0E8] focus:outline-none focus:border-[#C8922A]"
                  />
                  <p className="text-[10px] text-[#A07850] mt-1">
                    Must be on the same WiFi network as this tablet
                  </p>
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-[#8B7355] uppercase tracking-wider block mb-1">
                    Poll interval: {pollInterval}s
                  </label>
                  <input
                    type="range"
                    min={10}
                    max={120}
                    step={10}
                    value={pollInterval}
                    onChange={e => setPollInterval(Number(e.target.value))}
                    className="w-full accent-[#C8922A]"
                  />
                </div>
              </>
            )}

            {/* Manual values */}
            {useManual && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-[#8B7355] uppercase tracking-wider block mb-1">
                    Temperature (°C)
                  </label>
                  <input
                    type="number"
                    value={manualTemp}
                    onChange={e => setManualTemp(Number(e.target.value))}
                    min={10}
                    max={45}
                    step={0.5}
                    className="w-full border border-[#E8DDD0] rounded-[10px] px-3 py-2 text-[15px] font-bold text-[#1A1008] bg-[#F5F0E8] focus:outline-none focus:border-[#C8922A]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-[#8B7355] uppercase tracking-wider block mb-1">
                    Humidity (%)
                  </label>
                  <input
                    type="number"
                    value={manualHumidity}
                    onChange={e => setManualHumidity(Number(e.target.value))}
                    min={20}
                    max={100}
                    step={1}
                    className="w-full border border-[#E8DDD0] rounded-[10px] px-3 py-2 text-[15px] font-bold text-[#1A1008] bg-[#F5F0E8] focus:outline-none focus:border-[#C8922A]"
                  />
                </div>
              </div>
            )}
          </Card>
        </section>

        {/* About */}
        <section>
          <p className="text-[9px] font-bold uppercase tracking-[3px] text-[#8B7355] mb-2">
            About
          </p>
          <Card className="px-4 py-3">
            <p className="text-[13px] font-semibold text-[#1A1008]">GrindIQ</p>
            <p className="text-[11px] text-[#8B7355]">Smart grind calculator · v1.0</p>
            <p className="text-[10px] text-[#A07850] mt-2">
              Formula: Baseline ± ΔTemp(×0.15) ± ΔHumidity(×0.05) ± ΔAgtron(±0.5)
            </p>
          </Card>
        </section>

        <button
          onClick={handleSave}
          className="w-full py-4 rounded-[50px] font-bold text-[15px] text-white transition-all active:scale-[0.97]"
          style={{ backgroundColor: '#C8922A' }}
        >
          {saved ? '✓ Saved' : 'Save Settings'}
        </button>
      </div>

      <BottomNav />
    </div>
  )
}
